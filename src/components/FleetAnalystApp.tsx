import { useState, useRef } from 'react'
import * as XLSX from 'xlsx'

interface Applicant {
  id: number
  name: string
  url: string
  note: string
}

interface SelectedApplicant extends Applicant {
  selectedAt: Date
  isAnalyzed: boolean
  advice: string
}

interface FormApplicant {
  name: string
  url: string
  note: string
}



interface FleetAnalystAppProps {
  onSwitchToAnalysisManager?: () => void
}

const FleetAnalystApp: React.FC<FleetAnalystAppProps> = ({ onSwitchToAnalysisManager }) => {
  const [applicants, setApplicants] = useState<Applicant[]>([])
  const [selectedApplicants, setSelectedApplicants] = useState<SelectedApplicant[]>([])
  const [isSelecting, setIsSelecting] = useState(false)
  const [fileName, setFileName] = useState<string>('')
  const [drawCount, setDrawCount] = useState(10)
  const [showForm, setShowForm] = useState(false)
  const [formApplicants, setFormApplicants] = useState<FormApplicant[]>([
    { name: '', url: '', note: '' }
  ])
  const fileInputRef = useRef<HTMLInputElement>(null)


  // XLSXファイルを読み込む（応募者リスト）
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setFileName(file.name)
    const reader = new FileReader()

    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target?.result as ArrayBuffer)
        const workbook = XLSX.read(data, { type: 'array' })
        const sheetName = workbook.SheetNames[0]
        const worksheet = workbook.Sheets[sheetName]
        const json: unknown[] = XLSX.utils.sheet_to_json(worksheet)

        const parsedApplicants: Applicant[] = json.map((row, index) => {
          const rowData = row as Record<string, unknown>
          return {
            id: index + 1,
            name: String(rowData['提督名'] || rowData['応募者名'] || '不明'),
            url: String(rowData['URL'] || ''),
            note: String(rowData['備考'] || '')
          }
        })
        
        setApplicants(parsedApplicants)
        setSelectedApplicants([])
      } catch (error) {
        console.error("XLSX parsing error:", error)
        alert("XLSXファイルの解析に失敗しました。ファイル形式を確認してください。")
      }
    }
    
    reader.readAsArrayBuffer(file)
  }

  // 選出結果XLSXファイルを読み込む（状態復元）
  const handleSelectedFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target?.result as ArrayBuffer)
        const workbook = XLSX.read(data, { type: 'array' })
        const sheetName = workbook.SheetNames[0]
        const worksheet = workbook.Sheets[sheetName]
        const json: unknown[] = XLSX.utils.sheet_to_json(worksheet)

        const restoredApplicants: SelectedApplicant[] = json.map((row, index) => {
          const rowData = row as Record<string, unknown>
          return {
            id: index + 1,
            name: String(rowData['提督名'] || rowData['応募者名'] || '不明'),
            url: String(rowData['URL'] || ''),
            note: String(rowData['備考'] || ''),
            selectedAt: new Date(String(rowData['選出時刻'] || Date.now())),
            isAnalyzed: String(rowData['分析完了']).toLowerCase() === 'true' || 
                        String(rowData['分析完了']) === '完了' ||
                        String(rowData['分析完了']) === '✓',
            advice: String(rowData['分析報告'] || rowData['アドバイス'] || '')
          }
        })
        
        setSelectedApplicants(restoredApplicants)
        alert(`${restoredApplicants.length}件の選出結果を復元しました！`)
      } catch (error) {
        console.error("Selected XLSX parsing error:", error)
        alert("選出結果ファイルの解析に失敗しました。ファイル形式を確認してください。")
      }
    }
    
    reader.readAsArrayBuffer(file)
  }

  // ランダム選出機能
  const selectRandomApplicants = () => {
    if (applicants.length < drawCount) {
      alert(`選出する人数（${drawCount}人）が応募者数（${applicants.length}人）を上回っています。`)
      return
    }

    setIsSelecting(true)
    
    setTimeout(() => {
      const shuffled = [...applicants].sort(() => Math.random() - 0.5)
      const selected = shuffled.slice(0, drawCount).map((applicant) => ({
        ...applicant,
        selectedAt: new Date(),
        isAnalyzed: false,
        advice: ''
      }))
      
      setSelectedApplicants(selected)
      setIsSelecting(false)
    }, 1500)
  }

  // 分析完了状態切り替え
  const toggleAnalyzed = (index: number) => {
    setSelectedApplicants(prev => prev.map((applicant, i) => 
      i === index ? { ...applicant, isAnalyzed: !applicant.isAnalyzed } : applicant
    ))
  }

  // アドバイス更新
  const updateAdvice = (index: number, advice: string) => {
    setSelectedApplicants(prev => prev.map((applicant, i) => 
      i === index ? { ...applicant, advice } : applicant
    ))
  }


  // XLSX形式でエクスポート
  const exportToXLSX = () => {
    if (selectedApplicants.length === 0) {
      alert('選出された提督がいません。')
      return
    }

    const exportData = selectedApplicants.map((applicant, index) => ({
      '順位': index + 1,
      '提督名': applicant.name,
      'URL': applicant.url,
      '備考': applicant.note,
      '選出時刻': applicant.selectedAt.toLocaleString(),
      '分析完了': applicant.isAnalyzed ? '完了' : '未完了',
      '分析報告': applicant.advice
    }))

    const worksheet = XLSX.utils.json_to_sheet(exportData)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, '選出結果')

    const fileName = `艦隊分析_選出結果_${new Date().toISOString().split('T')[0]}.xlsx`
    XLSX.writeFile(workbook, fileName)
  }

  // 分析報告のみエクスポート
  const exportAdviceToXLSX = () => {
    if (selectedApplicants.length === 0) {
      alert('選出された提督がいません。')
      return
    }

    const exportData = selectedApplicants
      .filter(applicant => applicant.advice.trim() && applicant.isAnalyzed)
      .map((applicant, index) => ({
        '順位': index + 1,
        '提督名': applicant.name,
        '分析報告': applicant.advice
      }))

    if (exportData.length === 0) {
      alert('分析完了済みの報告がありません。')
      return
    }

    const worksheet = XLSX.utils.json_to_sheet(exportData)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, '分析報告')

    const fileName = `艦隊分析_報告書_${new Date().toISOString().split('T')[0]}.xlsx`
    XLSX.writeFile(workbook, fileName)
  }

  // 個別エクスポート
  const exportIndividualReport = (applicant: SelectedApplicant) => {
    if (!applicant.advice.trim()) {
      alert('分析報告が入力されていません。')
      return
    }

    const reportContent = `
艦隊分析報告書

提督名: ${applicant.name}
URL: ${applicant.url}
備考: ${applicant.note}
選出時刻: ${applicant.selectedAt.toLocaleString()}
分析完了: ${applicant.isAnalyzed ? '完了' : '未完了'}

=== 分析報告 ===
${applicant.advice}

作成日時: ${new Date().toLocaleString()}
    `.trim()

    const blob = new Blob([reportContent], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.setAttribute('href', url)
    link.setAttribute('download', `${applicant.name}提督_分析報告書_${new Date().toISOString().split('T')[0]}.txt`)
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  // XLSXフォーマットテンプレートをダウンロード
  const downloadXLSXTemplate = () => {
    const templateData = [
      {
        '応募者名': '田中 太郎',
        'URL': 'https://example.com/tanaka',
        '備考': '艦隊運営経験5年\n戦略立案が得意'
      },
      {
        '応募者名': '佐藤 花子',
        'URL': 'https://example.com/sato',
        '備考': '新人\n熱意あり'
      },
      {
        '応募者名': '鈴木 次郎',
        'URL': 'https://example.com/suzuki',
        '備考': 'ベテラン提督\n複数艦隊運営経験'
      }
    ]

    const worksheet = XLSX.utils.json_to_sheet(templateData)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, '応募者リスト')

    XLSX.writeFile(workbook, '艦隊分析_応募者リストテンプレート.xlsx')
  }

  // フォーム関連の関数
  const addFormRow = () => {
    setFormApplicants([...formApplicants, { name: '', url: '', note: '' }])
  }

  const removeFormRow = (index: number) => {
    if (formApplicants.length > 1) {
      setFormApplicants(formApplicants.filter((_, i) => i !== index))
    }
  }

  const updateFormApplicant = (index: number, field: keyof FormApplicant, value: string) => {
    const updated = [...formApplicants]
    updated[index][field] = value
    setFormApplicants(updated)
  }

  const resetForm = () => {
    setFormApplicants([{ name: '', url: '', note: '' }])
  }

  const createXLSXFromForm = () => {
    const validApplicants = formApplicants.filter(app => app.name.trim())
    
    if (validApplicants.length === 0) {
      alert('有効な応募者データがありません。')
      return
    }

    const exportData = validApplicants.map(app => ({
      '応募者名': app.name,
      'URL': app.url,
      '備考': app.note
    }))

    const worksheet = XLSX.utils.json_to_sheet(exportData)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, '応募者リスト')

    const fileName = `応募者リスト_${new Date().toISOString().split('T')[0]}.xlsx`
    XLSX.writeFile(workbook, fileName)
    
    // フォームをリセット
    setFormApplicants([{ name: '', url: '', note: '' }]);
  }

  const totalApplicants = applicants.length
  const analyzedCount = selectedApplicants.filter(a => a.isAnalyzed).length

  return (
    <div className="fleet-analysis-app shipgirl">
      <div className="theme-toggle">
        {onSwitchToAnalysisManager && (
          <button onClick={onSwitchToAnalysisManager} className="theme-button">
            <span className="material-symbols-outlined">analytics</span> ダッシュボード
          </button>
        )}
      </div>

      <div className="app-logo animate-fadeInUp">
        <>
          <span className="logo-main">艦隊分析マネージャー</span>
          <span className="logo-sub">-Fleet Analyst Manager-</span>
        </>
      </div>

      
      <div className="file-upload-section">
        <h2><span className="material-icons">folder</span> ファイル管理</h2>
        <div className="file-upload-area">
          <div className="upload-group">
            <label>提督候補リストXLSX:</label>
            <input
              type="file"
              accept=".xlsx"
              onChange={handleFileUpload}
              ref={fileInputRef}
              className="file-input"
            />
            <p className="file-format">XLSX形式: 提督名,URL,備考 の列があること</p>
            <div className="template-buttons">
              <button onClick={downloadXLSXTemplate} className="template-button">
                📥 XLSXテンプレートダウンロード
              </button>
              <button onClick={() => setShowForm(!showForm)} className="template-button">
                {showForm ? '❌ フォームを閉じる' : '✏️ フォームで作成'}
              </button>
            </div>
          </div>
          
          <div className="upload-group">
            <label>分析結果XLSX（状態復元）:</label>
            <input
              type="file"
              accept=".xlsx"
              onChange={handleSelectedFileUpload}
              className="file-input"
            />
            <p className="file-format">選出結果ファイルを読み込み、前回の状態を復元</p>
          </div>
          
          {fileName && (
            <div className="file-info">
              <span>📄 読み込み済み: {fileName}</span>
              <button 
                onClick={() => {
                  setFileName('')
                  setApplicants([])
                  if (fileInputRef.current) fileInputRef.current.value = ''
                }} 
                className="reset-file-button"
              >
                リセット
              </button>
            </div>
          )}
        </div>
      </div>

      {/* フォーム入力セクション */}
      {showForm && (
        <div className="form-section">
          <h2>フォーム入力で応募者リスト作成</h2>
          <div className="form-container">
            {formApplicants.map((applicant, index) => (
              <div key={index} className="form-row">
                <div className="form-field">
                  <label>応募者名:</label>
                  <input
                    type="text"
                    value={applicant.name}
                    onChange={(e) => updateFormApplicant(index, 'name', e.target.value)}
                    placeholder="提督名を入力"
                  />
                </div>
                <div className="form-field">
                  <label>URL:</label>
                  <input
                    type="url"
                    value={applicant.url}
                    onChange={(e) => updateFormApplicant(index, 'url', e.target.value)}
                    placeholder="https://..."
                  />
                </div>
                <div className="form-field">
                  <label>備考:</label>
                  <textarea
                    value={applicant.note}
                    onChange={(e) => updateFormApplicant(index, 'note', e.target.value)}
                    placeholder="特記事項があれば記入"
                    rows={2}
                  />
                </div>
                <button
                  onClick={() => removeFormRow(index)}
                  disabled={formApplicants.length === 1}
                  className="remove-row-button"
                >
                  <span className="material-icons">delete</span>
                </button>
              </div>
            ))}
          </div>
          <div className="form-actions">
            <button onClick={addFormRow} className="add-row-button">
              ➕ 行を追加
            </button>
            <button onClick={resetForm} className="reset-form-button">
              🔄 フォームリセット
            </button>
            <button onClick={createXLSXFromForm} className="create-xlsx-button">
              <span className="material-icons">table_chart</span> XLSXファイル作成
            </button>
          </div>
        </div>
      )}

      <div className="controls">
        <div className="stats-info">
          <span>応募者総数: {totalApplicants}名</span>
          <div>
            <label htmlFor="draw-count">選出人数: </label>
            <select 
              id="draw-count"
              value={drawCount} 
              onChange={(e) => setDrawCount(Number(e.target.value))}
            >
              {[1,2,3,4,5,6,7,8,9,10,15,20,25,30].map(num => (
                <option key={num} value={num}>{num}人</option>
              ))}
            </select>
          </div>
          {totalApplicants < drawCount && (
            <span className="warning">⚠️ 応募者数が不足しています</span>
          )}
        </div>
        <div className="control-buttons">
          <button 
            onClick={selectRandomApplicants}
            disabled={isSelecting || totalApplicants < drawCount}
            className="select-button"
          >
            {isSelecting ? <><span className="material-icons">anchor</span> 選出中...</> : `🎯 提督を${drawCount}人選出！`}
          </button>
          <button 
            onClick={() => setSelectedApplicants([])}
            disabled={selectedApplicants.length === 0}
            className="reset-button"
          >
            🔄 選出リセット
          </button>
        </div>
      </div>

      {selectedApplicants.length > 0 && (
        <div className="selection-results">
          <div className="results-header">
            <h2><span className="material-icons">anchor</span> 選出された提督たち</h2>
            <div className="results-actions">
              <div className="analysis-progress">
                分析進捗: {analyzedCount}/{selectedApplicants.length}
              </div>
              <div className="export-buttons">
                <button onClick={exportToXLSX} className="export-button">
                  <span className="material-icons">table_chart</span> 完全エクスポート
                </button>
                <button onClick={exportAdviceToXLSX} className="export-button advice-export">
                  <span className="material-icons">description</span> 分析報告のみ
                </button>
              </div>
            </div>
          </div>

          <div className="selected-applicants">
            {selectedApplicants.map((applicant, index) => (
              <div key={applicant.id} className={`selected-applicant-card ${applicant.isAnalyzed ? 'analyzed' : ''}`}>
                <div className="selection-number">{index + 1}</div>
                <div className="applicant-details">
                  <div className="applicant-name">{applicant.name}</div>
                  {applicant.url && (
                    <div className="applicant-url">
                      <a href={applicant.url} target="_blank" rel="noopener noreferrer">
                        <span className="material-icons">link</span> {applicant.url}
                      </a>
                    </div>
                  )}
                  {applicant.note && (
                    <div className="applicant-note" style={{ whiteSpace: 'pre-wrap' }}>{applicant.note}</div>
                  )}
                  <div className="selection-time">
                    {applicant.selectedAt.toLocaleTimeString()}
                  </div>
                  
                  <div className="analysis-controls">
                    <label className="analyzed-checkbox">
                      <input
                        type="checkbox"
                        checked={applicant.isAnalyzed}
                        onChange={() => toggleAnalyzed(index)}
                      />
                      <span>分析完了</span>
                    </label>
                    
                    <div className="advice-section">
                      <label>分析報告:</label>
                      <textarea
                        value={applicant.advice}
                        onChange={(e) => updateAdvice(index, e.target.value)}
                        placeholder="提督の特徴、推奨配置、注意事項等を記入してください..."
                        className="advice-textarea"
                      />
                    </div>


                    <button 
                      onClick={() => exportIndividualReport(applicant)}
                      className="individual-export-button"
                    >
                      📄 個別エクスポート
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="selection-summary">
            <div className="summary-item">
              <span>選出総数</span>
              <span>{selectedApplicants.length}名</span>
            </div>
            <div className="summary-item">
              <span>分析完了</span>
              <span>{analyzedCount}名</span>
            </div>
            <div className="summary-item">
              <span>分析進捗</span>
              <span>{selectedApplicants.length > 0 ? Math.round((analyzedCount / selectedApplicants.length) * 100) : 0}%</span>
            </div>
          </div>
        </div>
      )}

      {applicants.length > 0 && (
        <div className="applicants-list">
          <h2>応募者一覧</h2>
          <div className="applicants-table">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>提督名</th>
                  <th>URL</th>
                  <th>備考</th>
                </tr>
              </thead>
              <tbody>
                {applicants.map((applicant) => (
                  <tr key={applicant.id}>
                    <td>{applicant.id}</td>
                    <td>{applicant.name}</td>
                    <td>
                      {applicant.url && (
                        <a href={applicant.url} target="_blank" rel="noopener noreferrer">
                          {applicant.url}
                        </a>
                      )}
                    </td>
                    <td style={{ whiteSpace: 'pre-wrap' }}>{applicant.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <div className="info-section">
        <h2>使用方法</h2>
        <div className="info-content">
          <ol>
            <li>提督候補リストXLSXファイルをアップロードしてください</li>
            <li>XLSXの形式: 提督名,URL,備考 の列があること</li>
            <li>指定した人数の提督候補がいれば選出可能です</li>
            <li>「提督を選出！」ボタンで分析対象を選出</li>
            <li>選出された提督が順番に表示されます</li>
            <li>分析完了チェックボックスで進捗管理</li>
            <li>分析報告欄に提督の特徴や推奨配置を記入</li>
            <li>「分析結果エクスポート」で結果を保存</li>
            <li>分析結果XLSXを読み込めば前回の状態から再開可能</li>
          </ol>
        </div>
      </div>
    </div>
  )
}

export default FleetAnalystApp
import { useState, useRef } from 'react'
import * as XLSX from 'xlsx'
import './App.css'

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
  aiSuggestion?: string
  isAiAnalyzing?: boolean
}

interface FormApplicant {
  name: string
  url: string
  note: string
}

type Theme = 'shipgirl' | 'abyssal'

// 深海モード用のカタカナ変換関数
const convertToKatakana = (text: string): string => {
  return text
    .replace(/あ/g, 'ア').replace(/い/g, 'イ').replace(/う/g, 'ウ').replace(/え/g, 'エ').replace(/お/g, 'オ')
    .replace(/か/g, 'カ').replace(/き/g, 'キ').replace(/く/g, 'ク').replace(/け/g, 'ケ').replace(/こ/g, 'コ')
    .replace(/が/g, 'ガ').replace(/ぎ/g, 'ギ').replace(/ぐ/g, 'グ').replace(/げ/g, 'ゲ').replace(/ご/g, 'ゴ')
    .replace(/さ/g, 'サ').replace(/し/g, 'シ').replace(/す/g, 'ス').replace(/せ/g, 'セ').replace(/そ/g, 'ソ')
    .replace(/ざ/g, 'ザ').replace(/じ/g, 'ジ').replace(/ず/g, 'ズ').replace(/ぜ/g, 'ゼ').replace(/ぞ/g, 'ゾ')
    .replace(/た/g, 'タ').replace(/ち/g, 'チ').replace(/つ/g, 'ツ').replace(/て/g, 'テ').replace(/と/g, 'ト')
    .replace(/だ/g, 'ダ').replace(/ぢ/g, 'ヂ').replace(/づ/g, 'ヅ').replace(/で/g, 'デ').replace(/ど/g, 'ド')
    .replace(/な/g, 'ナ').replace(/に/g, 'ニ').replace(/ぬ/g, 'ヌ').replace(/ね/g, 'ネ').replace(/の/g, 'ノ')
    .replace(/は/g, 'ハ').replace(/ひ/g, 'ヒ').replace(/ふ/g, 'フ').replace(/へ/g, 'ヘ').replace(/ほ/g, 'ホ')
    .replace(/ば/g, 'バ').replace(/び/g, 'ビ').replace(/ぶ/g, 'ブ').replace(/べ/g, 'ベ').replace(/ぼ/g, 'ボ')
    .replace(/ぱ/g, 'パ').replace(/ぴ/g, 'ピ').replace(/ぷ/g, 'プ').replace(/ぺ/g, 'ペ').replace(/ぽ/g, 'ポ')
    .replace(/ま/g, 'マ').replace(/み/g, 'ミ').replace(/む/g, 'ム').replace(/め/g, 'メ').replace(/も/g, 'モ')
    .replace(/や/g, 'ヤ').replace(/ゆ/g, 'ユ').replace(/よ/g, 'ヨ')
    .replace(/ら/g, 'ラ').replace(/り/g, 'リ').replace(/る/g, 'ル').replace(/れ/g, 'レ').replace(/ろ/g, 'ロ')
    .replace(/わ/g, 'ワ').replace(/ゐ/g, 'ヰ').replace(/ゑ/g, 'ヱ').replace(/を/g, 'ヲ').replace(/ん/g, 'ン')
    .replace(/ゃ/g, 'ャ').replace(/ゅ/g, 'ュ').replace(/ょ/g, 'ョ')
    .replace(/っ/g, 'ッ')
}

// 深海棲艦風文体変換関数
const convertTextToAbyssalStyle = (text: string): string => {
  // まずひらがなをカタカナに変換
  let converted = convertToKatakana(text)
  
  // 艦これ専門用語を深海棲艦風カタカナに変換
  converted = converted
    .replace(/艦|船/g, 'カン')
    .replace(/艦娘/g, 'カンムス')
    .replace(/提督/g, 'テイトク')
    .replace(/鎮守府/g, 'チンジュフ')
    .replace(/分析/g, 'ブンセキ')
    .replace(/報告/g, 'ホウコク')
    .replace(/戦略/g, 'センリャク')
    .replace(/戦術/g, 'センジュツ')
    .replace(/編成/g, 'ヘンセイ')
    .replace(/装備/g, 'ソウビ')
    .replace(/改修/g, 'カイシュウ')
    .replace(/海域/g, 'カイイキ')
    .replace(/作戦/g, 'サクセン')
    .replace(/出撃/g, 'シュツゲキ')
    .replace(/遠征/g, 'エンセイ')
    .replace(/演習/g, 'エンシュウ')
    .replace(/資源/g, 'シゲン')
    .replace(/燃料/g, 'ネンリョウ')
    .replace(/弾薬/g, 'ダンヤク')
    .replace(/鋼材/g, 'コウザイ')
    .replace(/ボーキサイト/g, 'ボーキサイト')
    .replace(/経験/g, 'ケイケン')
    .replace(/実力/g, 'ジツリョク')
    .replace(/指揮/g, 'シキ')
    .replace(/管理/g, 'カンリ')
    .replace(/運営/g, 'ウンエイ')
    .replace(/攻略/g, 'コウリャク')
    .replace(/勝利/g, 'ショウリ')
    .replace(/敗北/g, 'ハイボク')
    .replace(/です/g, 'ダ')
    .replace(/である/g, 'デアル')
    .replace(/ます/g, 'ル')
    .replace(/でしょう/g, 'ダロウ')
    .replace(/なので/g, 'ナノデ')
    .replace(/だから/g, 'ダカラ')
    .replace(/しかし/g, 'シカシ')
    .replace(/また/g, 'マタ')
    .replace(/さらに/g, 'サラニ')
    .replace(/特に/g, 'トクニ')
    .replace(/とても/g, 'トテモ')
    .replace(/非常に/g, 'ヒジョウニ')
    .replace(/重要/g, 'ジュウヨウ')
    .replace(/必要/g, 'ヒツヨウ')
    .replace(/困難/g, 'コンナン')
    .replace(/問題/g, 'モンダイ')
    .replace(/対応/g, 'タイオウ')
    .replace(/判断/g, 'ハンダン')
    .replace(/決定/g, 'ケッテイ')
    .replace(/効果/g, 'コウカ')
    .replace(/効率/g, 'コウリツ')
    .replace(/優秀/g, 'ユウシュウ')
    .replace(/能力/g, 'ノウリョク')
  
  // 語尾を深海棲艦風に調整
  converted = converted
    .replace(/ダ$|ダ。/g, 'ダロウ...')
    .replace(/デアル$|デアル。/g, 'デアル...')
    .replace(/ル$|ル。/g, 'ルダロウ...')
    .replace(/ダロウ$|ダロウ。/g, 'ダロウ...')
  
  return converted
}

function App() {
  const [applicants, setApplicants] = useState<Applicant[]>([])
  const [selectedApplicants, setSelectedApplicants] = useState<SelectedApplicant[]>([])
  const [isSelecting, setIsSelecting] = useState(false)
  const [fileName, setFileName] = useState<string>('')
  const [theme, setTheme] = useState<Theme>('shipgirl')
  const [drawCount, setDrawCount] = useState(10)
  const [showForm, setShowForm] = useState(false)
  const [formApplicants, setFormApplicants] = useState<FormApplicant[]>([
    { name: '', url: '', note: '' }
  ])
  const [showApiSettings, setShowApiSettings] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // API キーの状態を確認
  const getApiKeyStatus = () => {
    const apiKey = import.meta.env.VITE_ANTHROPIC_API_KEY
    if (!apiKey) return { status: 'missing', message: '未設定' }
    if (apiKey === 'your_claude_api_key_here') return { status: 'placeholder', message: 'サンプル値' }
    if (apiKey.length < 20) return { status: 'invalid', message: '無効' }
    return { status: 'valid', message: '設定済み', key: `${apiKey.substring(0, 8)}...${apiKey.substring(apiKey.length - 4)}` }
  }

  // APIキーをテスト
  const testApiKey = async () => {
    const apiKey = import.meta.env.VITE_ANTHROPIC_API_KEY
    if (!apiKey) {
      alert('APIキーが設定されていません')
      return
    }

    try {
      const response = await fetch('http://localhost:3001/api/claude', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey
        },
        body: JSON.stringify({
          model: 'claude-3-haiku-20240307',
          max_tokens: 10,
          messages: [{ role: 'user', content: 'Hello' }]
        })
      })

      if (response.ok) {
        alert('✅ APIキーは正常に動作しています！')
      } else {
        alert(`❌ APIエラー: ${response.status} ${response.statusText}`)
      }
    } catch (error) {
      alert(`❌ 接続エラー: ${error}`)
    }
  }

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

        const parsedSelected: SelectedApplicant[] = json.map((row, index) => {
          const rowData = row as Record<string, unknown>
          return {
            id: index + 1,
            name: String(rowData['提督名'] || rowData['応募者名'] || '不明'),
            url: String(rowData['URL'] || ''),
            note: String(rowData['備考'] || ''),
            selectedAt: new Date(String(rowData['選出時刻']) || Date.now()),
            isAnalyzed: rowData['分析完了'] === true || rowData['分析完了'] === 'true',
            advice: String(rowData['分析報告'] || rowData['アドバイス'] || '')
          }
        })
        
        setSelectedApplicants(parsedSelected)
      } catch (error) {
        console.error("XLSX parsing error:", error)
        alert("XLSXファイルの解析に失敗しました。ファイル形式を確認してください。")
      }
    }
    
    reader.readAsArrayBuffer(file)
  }

  // ランダムにN人を選出
  const selectRandomApplicants = () => {
    if (applicants.length < drawCount) return
    setIsSelecting(true)
    setTimeout(() => {
      const shuffled = [...applicants].sort(() => 0.5 - Math.random())
      const selected = shuffled.slice(0, drawCount).map(applicant => ({
        ...applicant,
        selectedAt: new Date(),
        isAnalyzed: false,
        advice: '',
        aiSuggestion: '',
        isAiAnalyzing: false
      }))
      setSelectedApplicants(selected)
      setIsSelecting(false)
    }, 1500)
  }

  // 結果をリセット
  const resetSelection = () => {
    setSelectedApplicants([])
  }

  // ファイル選択をリセット
  const resetFile = () => {
    setApplicants([])
    setSelectedApplicants([])
    setFileName('')
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  // 分析完了状態を切り替え
  const toggleAnalyzed = (index: number) => {
    setSelectedApplicants(prev => 
      prev.map((applicant, i) => 
        i === index 
          ? { ...applicant, isAnalyzed: !applicant.isAnalyzed }
          : applicant
      )
    )
  }

  // アドバイスを更新
  const updateAdvice = (index: number, advice: string) => {
    setSelectedApplicants(prev => 
      prev.map((applicant, i) => 
        i === index 
          ? { ...applicant, advice }
          : applicant
      )
    )
  }

  // Claude APIを使用したAI分析を実行
  const analyzeWithAI = async (index: number) => {
    const applicant = selectedApplicants[index]
    if (!applicant.advice.trim()) {
      alert('分析報告を入力してからAI添削を実行してください。')
      return
    }

    // API キーの確認
    const apiKey = import.meta.env.VITE_ANTHROPIC_API_KEY
    if (!apiKey) {
      // APIキーなしでもデモモードとして動作
      console.log('API キーが設定されていません。デモモードで動作します。')
    }

    // AI分析開始状態に設定
    setSelectedApplicants(prev => 
      prev.map((app, i) => 
        i === index 
          ? { ...app, isAiAnalyzing: true, aiSuggestion: '' }
          : app
      )
    )

    try {
      // APIキーがない場合はフォールバック
      if (!apiKey) {
        throw new Error('No API key - using fallback')
      }
      
      // プロキシサーバー経由でClaude APIを呼び出し
      const response = await fetch('http://localhost:3001/api/claude', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey
        },
        body: JSON.stringify({
          model: 'claude-3-haiku-20240307',
          max_tokens: 500,
          messages: [{
            role: 'user',
            content: theme === 'abyssal' ? 
              `あなたは艦隊これくしょんの深海棲艦です。敵である提督「${applicant.name}」の艦隊戦力分析報告書を、仕方なく添削してやります。深海棲艦の口調で、すべてカタカナで返答してください。

【艦隊戦力分析報告書】
${applicant.advice}

【添削方針（仕方なく）】
- 提督「${applicant.name}」への個別艦隊戦力分析であることを意識する
- 深海棲艦として、敵に対する複雑な感情を表現する
- 全ての文字をカタカナで表記する（ひらがな・漢字は一切使わない）
- 「...ダロウ」「...ナノダ」「...デアル」などの深海棲艦らしい語尾
- 本当はアドバイスしたくないが、仕方なく教えてやる口調
- 敵ながら認める部分と、批判的な部分の両方を含む
- 深海棲艦らしい威圧感のある表現
- 敵艦隊の強さを評価する
- 戦闘における脅威度や弱点を分析する
- 課題や改善点は箇条書きでわかりやすく整理する

添削した報告書のみを全てカタカナで出力してください。` :
              `以下は艦隊これくしょんの提督「${applicant.name}」の艦隊戦力分析報告書です。この報告書を添削してください。

【艦隊戦力分析報告書】
${applicant.advice}

【添削方針】
- 提督「${applicant.name}」に対する個別艦隊戦力分析であることを意識する
- 誤字脱字や文法の間違いを修正する
- 課題や改善点は箇条書きでわかりやすく整理する
- 書かれた内容だけを簡潔に整理してまとめる
- 丁寧になりすぎて長文にならないようにする

添削した報告書のみを出力してください。`
          }]
        })
      })

      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`)
      }

      const data = await response.json()
      const suggestion = data.content[0].text

      setSelectedApplicants(prev => 
        prev.map((app, i) => 
          i === index 
            ? { ...app, isAiAnalyzing: false, aiSuggestion: suggestion }
            : app
        )
      )
    } catch (error) {
      console.error('AI分析エラー:', error)
      
      // エラー時のフォールバック（テーマ別対応）
      const originalText = applicant.advice
      let fallbackSuggestion = ''
      
      if (theme === 'abyssal') {
        // 深海棲艦モード：カタカナで敵対的な添削
        fallbackSuggestion = `【${convertToKatakana(applicant.name)}テイトク ブンセキ】

フン...シカタガナイ...キサマノ ブンショウヲ テンサクシテヤロウ...

${convertTextToAbyssalStyle(originalText)}

...コレデ ヨイダロウ...フン...`
      } else {
        // 通常モード：鎮守府公式文書風に変換
        fallbackSuggestion = originalText
          .replace(/です。/g, 'であります。')
          .replace(/します。/g, 'いたします。')
          .replace(/ですが/g, 'でありますが')
          .replace(/思います/g, '判断いたします')
          .replace(/考えます/g, '分析しております')
          .replace(/いいと思います/g, '適切であると判断いたします')
          .replace(/良い/g, '優秀な')
          .replace(/悪い/g, '改善が必要な')
          .replace(/上手/g, '巧妙な')
          .replace(/下手/g, '練度向上が必要な')
          .replace(/強い/g, '戦力の高い')
          .replace(/弱い/g, '戦力強化が必要な')
          .replace(new RegExp(`(^|[^「])${applicant.name}([^」]|$)`, 'g'), `$1${applicant.name}提督$2`)
          .replace(/。 /g, '。\n')
          .trim()
        
        if (fallbackSuggestion === originalText) {
          fallbackSuggestion = `【${applicant.name}提督 艦隊運用分析報告書】\n\n${originalText}\n\n（添削：鎮守府公式文書として適切な表現に調整いたしました。）`
        }
      }
      
      setSelectedApplicants(prev => 
        prev.map((app, i) => 
          i === index 
            ? { ...app, isAiAnalyzing: false, aiSuggestion: `${!apiKey ? '[デモモード - 高品質フォールバック応答]' : '[API接続エラー - フォールバック応答]'}\n\n${fallbackSuggestion}` }
            : app
        )
      )
      
      if (!apiKey) {
        console.log('デモモードで動作中 - 実際のAPI機能を使用するにはAPIキーを設定してください。')
      } else {
        if (theme === 'abyssal') {
          alert('フン...通信エラーダ...フォールバック応答ヲ表示シテヤル...')
        } else {
          alert('Claude APIとの接続でエラーが発生しました。フォールバック応答を表示しています。API キーの設定を確認してください。')
        }
      }
    }
  }

  // AI提案を採用
  const adoptAISuggestion = (index: number) => {
    const applicant = selectedApplicants[index]
    if (!applicant.aiSuggestion) return

    setSelectedApplicants(prev => 
      prev.map((app, i) => 
        i === index 
          ? { ...app, advice: applicant.aiSuggestion!, aiSuggestion: '' }
          : app
      )
    )
  }

  // 選出結果をXLSXエクスポート
  const exportSelectedToXLSX = () => {
    if (selectedApplicants.length === 0) return

    const dataToExport = selectedApplicants.map(applicant => ({
      '提督名': applicant.name,
      'URL': applicant.url,
      '備考': applicant.note,
      '選出時刻': applicant.selectedAt.toISOString(),
      '分析完了': applicant.isAnalyzed,
      '分析報告': applicant.advice
    }));

    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "分析結果");
    
    // 列幅を自動調整
    const cols = (Object.keys(dataToExport[0]) as (keyof typeof dataToExport[0])[]).map(key => ({
        wch: Math.max(20, ...dataToExport.map(row => row[key] != null ? String(row[key]).length : 0), key.length)
    }));
    worksheet['!cols'] = cols;

    XLSX.writeFile(workbook, `艦隊分析結果_${new Date().toISOString().split('T')[0]}.xlsx`);
  }

  // アドバイス内容をテキストファイルでエクスポート
  const exportAdviceToText = () => {
    if (selectedApplicants.length === 0) return

    const analyzedApplicants = selectedApplicants.filter(applicant => applicant.isAnalyzed && applicant.advice.trim())
    
    if (analyzedApplicants.length === 0) {
      alert('分析完了かつアドバイスが入力されている提督がいません。')
      return
    }

    const currentDate = new Date().toLocaleDateString('ja-JP')
    const currentTime = new Date().toLocaleTimeString('ja-JP')
    
    let textContent = `艦隊分析者マネージャー - 提督分析報告書\n`
    textContent += `==========================================\n`
    textContent += `作成日時: ${currentDate} ${currentTime}\n`
    textContent += `分析完了提督数: ${analyzedApplicants.length}名\n`
    textContent += `\n`

    analyzedApplicants.forEach((applicant, index) => {
      textContent += `【${index + 1}】${applicant.name}提督 分析報告書\n`
      textContent += `------------------------------------------\n`
      if (applicant.url) {
        textContent += `URL: ${applicant.url}\n`
      }
      if (applicant.note) {
        textContent += `備考: ${applicant.note.replace(/\n/g, '\n    ')}\n`
      }
      textContent += `選出時刻: ${applicant.selectedAt.toLocaleString('ja-JP')}\n`
      textContent += `\n`
      textContent += `【分析報告】\n`
      textContent += `${applicant.advice}\n`
      textContent += `\n`
      textContent += `==========================================\n`
      textContent += `\n`
    })

    textContent += `\n`
    textContent += `※ この分析報告書は艦隊分析者マネージャーで生成されています。\n`
    textContent += `※ 各提督の個別状況に応じて適切に活用してください。\n`

    const blob = new Blob([textContent], { type: 'text/plain;charset=utf-8;' })
    const link = document.createElement('a')
    const url = URL.createObjectURL(blob)
    link.setAttribute('href', url)
    link.setAttribute('download', `提督分析報告書_${new Date().toISOString().split('T')[0]}.txt`)
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  // 個別アドバイスをテキストファイルでエクスポート
  const exportIndividualAdvice = (applicant: SelectedApplicant) => {
    if (!applicant.isAnalyzed || !applicant.advice.trim()) {
      alert('この提督は分析が完了していないか、アドバイスが入力されていません。')
      return
    }

    const currentDate = new Date().toLocaleDateString('ja-JP')
    const currentTime = new Date().toLocaleTimeString('ja-JP')
    
    let textContent = `艦隊分析者マネージャー - 個別分析報告書\n`
    textContent += `==========================================\n`
    textContent += `作成日時: ${currentDate} ${currentTime}\n`
    textContent += `\n`
    textContent += `【${applicant.name}提督 個別分析報告書】\n`
    textContent += `\n`
    textContent += `【基本情報】\n`
    if (applicant.url) {
      textContent += `URL: ${applicant.url}\n`
    }
    if (applicant.note) {
      textContent += `備考: ${applicant.note.replace(/\n/g, '\n    ')}\n`
    }
    textContent += `選出時刻: ${applicant.selectedAt.toLocaleString('ja-JP')}\n`
    textContent += `\n`
    textContent += `【分析報告】\n`
    textContent += `${applicant.advice}\n`
    textContent += `\n`
    textContent += `==========================================\n`
    textContent += `\n`
    textContent += `※ この分析報告書は艦隊分析者マネージャーで生成されています。\n`
    textContent += `※ ${applicant.name}提督の個別状況に応じて適切に活用してください。\n`

    const blob = new Blob([textContent], { type: 'text/plain;charset=utf-8;' })
    const link = document.createElement('a')
    const url = URL.createObjectURL(blob)
    link.setAttribute('href', url)
    link.setAttribute('download', `${applicant.name}提督_分析報告書_${new Date().toISOString().split('T')[0]}.txt`)
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  // テーマを切り替え
  const toggleTheme = () => {
    setTheme(prev => prev === 'shipgirl' ? 'abyssal' : 'shipgirl')
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
        '備考': '新米提督\n熱意は十分'
      },
      {
        '応募者名': '鈴木 一郎',
        'URL': 'https://example.com/suzuki',
        '備考': 'ベテラン提督\n艦隊編成の専門家'
      }
    ];

    const worksheet = XLSX.utils.json_to_sheet(templateData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "応募者リスト");
    
    // 列幅を自動調整
    const cols = (Object.keys(templateData[0]) as (keyof typeof templateData[0])[]).map(key => ({
      wch: Math.max(20, ...templateData.map(row => row[key] != null ? String(row[key]).length : 0), key.length)
    }));
    worksheet['!cols'] = cols;

    XLSX.writeFile(workbook, 'LDB_応募者リスト_テンプレート.xlsx');
  }

  // フォームからXLSXファイルを作成
  const createXLSXFromForm = () => {
    const validApplicants = formApplicants.filter(app => app.name.trim() !== '')
    
    if (validApplicants.length === 0) {
      alert('少なくとも1名の応募者名を入力してください。')
      return
    }

    const dataToExport = validApplicants.map(app => ({
      '応募者名': app.name.trim(),
      'URL': app.url.trim(),
      '備考': app.note.trim()
    }));

    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "応募者リスト");
    
    // 列幅を自動調整
    const cols = (Object.keys(dataToExport[0]) as (keyof typeof dataToExport[0])[]).map(key => ({
      wch: Math.max(20, ...dataToExport.map(row => row[key] != null ? String(row[key]).length : 0), key.length)
    }));
    worksheet['!cols'] = cols;

    XLSX.writeFile(workbook, `LDB_応募者リスト_${new Date().toISOString().split('T')[0]}.xlsx`);
    
    // 作成したデータをアプリケーションに読み込み
    const parsedApplicants: Applicant[] = validApplicants.map((app, index) => ({
      id: index + 1,
      name: app.name.trim(),
      url: app.url.trim(),
      note: app.note.trim()
    }));
    
    setApplicants(parsedApplicants);
    setSelectedApplicants([]);
    setFileName(`フォーム作成_${new Date().toLocaleString()}`);
    setShowForm(false);
  }

  // フォームに行を追加
  const addFormRow = () => {
    setFormApplicants([...formApplicants, { name: '', url: '', note: '' }]);
  }

  // フォームの行を削除
  const removeFormRow = (index: number) => {
    if (formApplicants.length > 1) {
      setFormApplicants(formApplicants.filter((_, i) => i !== index));
    }
  }

  // フォームの値を更新
  const updateFormApplicant = (index: number, field: keyof FormApplicant, value: string) => {
    setFormApplicants(prev => 
      prev.map((app, i) => 
        i === index ? { ...app, [field]: value } : app
      )
    );
  }

  // フォームをリセット
  const resetForm = () => {
    setFormApplicants([{ name: '', url: '', note: '' }]);
  }

  const totalApplicants = applicants.length
  const analyzedCount = selectedApplicants.filter(a => a.isAnalyzed).length

  return (
    <div className={`fleet-analysis-app ${theme}`}>
      <div className="theme-toggle">
        <button onClick={toggleTheme} className="theme-button">
          {theme === 'shipgirl' ? '🌊 海色ver' : '⚓ 深海ver'}
        </button>
      </div>

      <h1 className="app-logo">
        {theme === 'shipgirl' ? (
          <>
            <span className="logo-main">艦隊分析者マネージャー</span>
            <span className="logo-sub">-Fleet Analyst Manager-</span>
          </>
        ) : (
          <>
            <span className="logo-main">深海艦隊分析司令部</span>
            <span className="logo-sub">-Abyssal Fleet Analysis HQ-</span>
          </>
        )}
      </h1>
      
      <div className="file-upload-section">
        <h2>📁 ファイル管理</h2>
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
            <p className="file-format">XLSX形式: 提督名,URL,備考,選出時刻,分析完了,分析報告 の列があること</p>
          </div>
          
          {fileName && (
            <div className="file-info">
              <span>読み込み済み: {fileName}</span>
              <button onClick={resetFile} className="reset-file-button">リセット</button>
            </div>
          )}
        </div>
      </div>

      {showForm && (
        <div className="form-section">
          <h2>✏️ 応募者情報入力フォーム</h2>
          <div className="form-container">
            {formApplicants.map((applicant, index) => (
              <div key={index} className="form-row">
                <div className="form-field">
                  <label>応募者名 *</label>
                  <input
                    type="text"
                    value={applicant.name}
                    onChange={(e) => updateFormApplicant(index, 'name', e.target.value)}
                    placeholder="応募者名を入力"
                    required
                  />
                </div>
                <div className="form-field">
                  <label>URL</label>
                  <input
                    type="url"
                    value={applicant.url}
                    onChange={(e) => updateFormApplicant(index, 'url', e.target.value)}
                    placeholder="https://example.com"
                  />
                </div>
                <div className="form-field">
                  <label>備考</label>
                  <textarea
                    value={applicant.note}
                    onChange={(e) => updateFormApplicant(index, 'note', e.target.value)}
                    placeholder="備考を入力"
                    rows={3}
                  />
                </div>
                <button 
                  onClick={() => removeFormRow(index)}
                  className="remove-row-button"
                  disabled={formApplicants.length === 1}
                >
                  🗑️
                </button>
              </div>
            ))}
            <div className="form-actions">
              <button onClick={addFormRow} className="add-row-button">
                ➕ 行を追加
              </button>
              <button onClick={resetForm} className="reset-form-button">
                🔄 フォームをリセット
              </button>
              <button onClick={createXLSXFromForm} className="create-xlsx-button">
                📊 XLSXファイル作成
              </button>
            </div>
          </div>
        </div>
      )}

      {totalApplicants > 0 && (
        <div className="controls">
          <div className="stats-info">
            <span>総提督候補数: <strong>{totalApplicants}</strong>名</span>
            {totalApplicants < drawCount && (
              <span className="warning">※ {drawCount}名未満のため選出できません</span>
            )}
          </div>
          <div className="control-buttons">
            <label style={{ marginRight: '1em' }}>
              分析対象者数:
              <input
                type="number"
                min={1}
                max={50}
                value={drawCount}
                onChange={e => setDrawCount(Math.max(1, Math.min(50, Number(e.target.value))))}
                style={{ width: 60, marginLeft: 8 }}
              />
              <span style={{ marginLeft: 4 }}>名</span>
            </label>
            <button 
              onClick={selectRandomApplicants} 
              disabled={isSelecting || totalApplicants < drawCount}
              className="select-button"
            >
              {isSelecting ? `提督選出中...` : `${drawCount}名の提督を選出！`}
            </button>
            <button 
              onClick={resetSelection} 
              disabled={isSelecting}
              className="reset-button"
            >
              結果をリセット
            </button>
          </div>
        </div>
      )}

      {selectedApplicants.length > 0 && (
        <div className="selection-results">
          <div className="results-header">
            <h2>⚓ 分析対象提督</h2>
            <div className="results-actions">
              <span className="analysis-progress">
                分析進捗: {analyzedCount}/{selectedApplicants.length}
              </span>
              <div className="export-buttons">
                <button onClick={exportSelectedToXLSX} className="export-button">
                  📊 分析結果エクスポート
                </button>
                <button onClick={exportAdviceToText} className="export-button advice-export">
                  📝 分析報告書エクスポート
                </button>
              </div>
            </div>
          </div>
          
          <div className="selected-applicants">
            {selectedApplicants.map((applicant, index) => (
              <div 
                key={`${applicant.id}-${applicant.selectedAt.getTime()}`}
                className={`selected-applicant-card ${applicant.isAnalyzed ? 'analyzed' : ''}`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="selection-number">#{index + 1}</div>
                <div className="applicant-details">
                  <div className="applicant-name">{applicant.name}</div>
                  {applicant.url && (
                    <div className="applicant-url">
                      <a href={applicant.url} target="_blank" rel="noopener noreferrer">
                        {applicant.url}
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
                        placeholder="提督の特徴や推奨配置を記入..."
                        className="advice-textarea"
                      />
                      
                      <div className="ai-analysis-section">
                        <button 
                          onClick={() => analyzeWithAI(index)}
                          disabled={applicant.isAiAnalyzing || !applicant.advice.trim()}
                          className="ai-analyze-button"
                        >
                          {applicant.isAiAnalyzing ? 
                            (theme === 'abyssal' ? '👹 深海添削中...' : '📋 報告書添削中...') : 
                            (theme === 'abyssal' ? '👹 深海添削' : '📋 報告書添削')
                          }
                        </button>
                        
                        {applicant.aiSuggestion && (
                          <div className="ai-suggestion">
                            <label>{theme === 'abyssal' ? '深海添削結果:' : '添削結果:'}</label>
                            <div className="ai-suggestion-text">
                              {applicant.aiSuggestion}
                            </div>
                            <div className="ai-suggestion-actions">
                              <button 
                                onClick={() => adoptAISuggestion(index)}
                                className="adopt-suggestion-button"
                              >
                                ✅ 添削版を採用
                              </button>
                              <button 
                                onClick={() => setSelectedApplicants(prev => 
                                  prev.map((app, i) => 
                                    i === index ? { ...app, aiSuggestion: '' } : app
                                  )
                                )}
                                className="dismiss-suggestion-button"
                              >
                                ❌ 原案を維持
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                      
                      {applicant.isAnalyzed && applicant.advice.trim() && (
                        <button 
                          onClick={() => exportIndividualAdvice(applicant)}
                          className="individual-export-button"
                        >
                          📄 個別エクスポート
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="selection-summary">
            <div className="summary-item">
              <span>選出者数:</span>
              <span>{selectedApplicants.length}名</span>
            </div>
            <div className="summary-item">
              <span>分析完了:</span>
              <span>{analyzedCount}名</span>
            </div>
            <div className="summary-item">
              <span>選出時刻:</span>
              <span>{selectedApplicants[0]?.selectedAt.toLocaleString()}</span>
            </div>
          </div>
        </div>
      )}

      {totalApplicants > 0 && (
        <div className="applicants-list">
          <h2>📋 提督候補リスト ({totalApplicants}名)</h2>
          <div className="applicants-table">
            <table>
              <thead>
                <tr>
                  <th>No.</th>
                  <th>提督名</th>
                  <th>URL</th>
                  <th>備考</th>
                </tr>
              </thead>
              <tbody>
                {applicants.map((applicant, index) => (
                  <tr key={applicant.id}>
                    <td>{index + 1}</td>
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

      <div className="api-settings-section">
        <div className="api-settings-header">
          <h2>🤖 AI設定</h2>
          <button 
            onClick={() => setShowApiSettings(!showApiSettings)} 
            className="api-settings-toggle"
          >
            {showApiSettings ? '🔼 非表示' : '🔽 表示'}
          </button>
        </div>
        
        {showApiSettings && (
          <div className="api-settings-content">
            <div className="api-status">
              <div className="status-item">
                <span>Claude API状態:</span>
                <span className={`status-badge ${getApiKeyStatus().status}`}>
                  {getApiKeyStatus().message}
                </span>
              </div>
              {getApiKeyStatus().status === 'valid' && (
                <>
                  <div className="api-key-info">
                    <small>APIキー: {getApiKeyStatus().key}</small>
                  </div>
                  <div className="api-model-info">
                    <small>使用モデル: Claude 3 Haiku</small>
                  </div>
                  <button onClick={testApiKey} className="api-test-button">
                    🧪 APIキーテスト
                  </button>
                </>
              )}
            </div>
            
            <div className="api-instructions">
              <h4>🔑 API設定手順</h4>
              <ol>
                <li>
                  <a href="https://console.anthropic.com/" target="_blank" rel="noopener noreferrer">
                    Anthropic Console
                  </a> でAPIキーを取得
                </li>
                <li>プロジェクトルートに <code>.env</code> ファイルを作成</li>
                <li>以下の形式でAPIキーを設定:</li>
              </ol>
              <div className="code-block">
                <code>VITE_ANTHROPIC_API_KEY=your_actual_api_key_here</code>
              </div>
              <div className="api-warning">
                <strong>⚠️ 注意:</strong> APIキーは秘密情報です。他人と共有しないでください。
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="info-section">
        <h2>ℹ️ 使用方法</h2>
        <div className="info-content">
          <ol>
            <li>提督候補リストXLSXファイルをアップロードしてください</li>
            <li>XLSXの形式: 提督名,URL,備考 の列があること</li>
            <li>指定した人数の提督候補がいれば選出可能です</li>
            <li>「提督を選出！」ボタンで分析対象を選出</li>
            <li>選出された提督が順番に表示されます</li>
            <li>分析完了チェックボックスで進捗管理</li>
            <li>分析報告欄に提督の特徴や推奨配置を記入</li>
            <li>{theme === 'abyssal' ? '「👹 深海添削」ボタンで深海棲艦による敵対的な添削を実行' : '「📋 報告書添削」ボタンで分析報告の表現を改善'}</li>
            <li>「分析結果エクスポート」で結果を保存</li>
            <li>分析結果XLSXを読み込めば前回の状態から再開可能</li>
          </ol>
        </div>
      </div>
    </div>
  )
}

export default App

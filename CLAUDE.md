# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Development
- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production (runs TypeScript check then Vite build)
- `npm run lint` - Run ESLint on TypeScript/React files
- `npm run preview` - Preview production build locally

### File Operations
- The app creates test XLSX files using Node.js scripts:
  - `node create_sample_xlsx.cjs` - Creates sample XLSX files
  - `node create_empty_file.cjs` - Creates empty test files
  - `node create_test_files.cjs` - Creates test files

## Architecture

This is a React + TypeScript + Vite application for "艦隊分析者マネージャー" (Fleet Analyst Manager), a Kancolle-themed fleet analysis tool for admiral candidate selection and management.

### Core Functionality
- **XLSX Processing**: Uses `xlsx` library for reading/writing Excel files containing admiral candidate data
- **Admiral Management**: Handles admiral candidate lists with fields: 提督名 (admiral name), URL, 備考 (notes)
- **Random Selection**: Performs random selection of admiral candidates from uploaded lists
- **Analysis Tracking**: Tracks analysis completion status and reports for selected admirals
- **AI-Powered Report Enhancement**: Real Claude API integration for military-style report editing and improvement
- **Export System**: Exports results to XLSX and individual/bulk text files with Kancolle theming

### Key Interfaces
```typescript
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
```

### AI Features
- **Real AI Integration**: Uses Claude 3 Haiku via Anthropic API for military-style report editing and enhancement
- **Report Enhancement**: AI improves user-written analysis reports with proper naval/military terminology and formatting
- **Kancolle Context**: AI processes reports specifically for fleet analysis context in Kancolle universe
- **User Workflow**: Users write analysis reports → Click "📋 報告書添削" (normal) or "👹 深海添削" (abyssal) → Review enhanced version → Adopt or maintain original
- **Abyssal Mode**: In abyssal theme, AI responds as hostile deep-sea entities using only katakana with reluctant, enemy-like tone
- **Fallback System**: Graceful error handling with basic courtesy language enhancement when API is unavailable

### API Configuration
- **Environment Setup**: Requires `VITE_ANTHROPIC_API_KEY` in `.env` file
- **API Status Display**: Built-in status indicator showing API key configuration state
- **Error Handling**: Comprehensive error handling with user-friendly fallback messages
- **Model**: Uses Claude 3 Haiku for cost-effective, fast responses optimized for text enhancement

### File Structure
- Main application logic in `src/App.tsx` (900+ lines including AI functionality)
- Standard Vite + React entry point in `src/main.tsx`
- CSS styling with dual theme support ('shipgirl' vs 'abyssal' themes)

### XLSX File Formats
- **Input**: Columns must be: 提督名 (or 応募者名 for backwards compatibility), URL, 備考
- **Output**: Adds columns: 選出時刻, 分析完了, 分析報告 (or アドバイス for backwards compatibility)

### UI Theming
- **Shipgirl Theme**: Blue/gold color scheme with naval terminology
- **Abyssal Theme**: Dark red/black color scheme with ominous styling
- Toggle between themes preserves all functionality

### State Management
Uses React useState for all state management - no external state library. Key state includes:
- `applicants` - Full admiral candidate list from uploaded XLSX
- `selectedApplicants` - Currently selected admirals with analysis data and AI suggestions
- `theme` - UI theme toggle ('shipgirl' | 'abyssal')
- `drawCount` - Number of admirals to select for analysis
- `showApiSettings` - Controls API configuration panel visibility
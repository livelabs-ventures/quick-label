import { useState, useRef, useEffect } from 'react'
import Papa from 'papaparse'
import './App.css'

function App() {
  const [data, setData] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [labels, setLabels] = useState({})
  const fileInputRef = useRef(null)

  const handleFileUpload = (event) => {
    const file = event.target.files[0]
    if (!file) return

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const rows = results.data.map((row, index) => ({
          ...row,
          id: index,
        }))
        setData(rows)
        setCurrentIndex(0)
        setLabels({})
      },
      error: (error) => {
        console.error('Error parsing CSV:', error)
        alert('Error parsing CSV file. Please check the file format.')
      },
    })
  }

  const handleLabelChange = (rowId, labelType, value) => {
    setLabels((prev) => ({
      ...prev,
      [rowId]: {
        ...prev[rowId],
        [labelType]: value,
      },
    }))
  }

  const getLabelValue = (rowId, labelType) => {
    return labels[rowId]?.[labelType] || ''
  }

  const handleNext = () => {
    if (currentIndex < data.length - 1) {
      setCurrentIndex(currentIndex + 1)
    }
  }

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
    }
  }

  useEffect(() => {
    const handleKeyPress = (event) => {
      // Don't trigger shortcuts when typing in inputs
      if (event.target.tagName === 'INPUT' || event.target.tagName === 'TEXTAREA') {
        return
      }

      if (data.length === 0) return // No data loaded

      const currentRow = data[currentIndex]
      if (!currentRow) return

      const rowId = currentRow.id

      switch (event.key) {
        case 'ArrowLeft':
          if (currentIndex > 0) {
            event.preventDefault()
            setCurrentIndex((prev) => Math.max(0, prev - 1))
          }
          break
        case 'ArrowRight':
          if (currentIndex < data.length - 1) {
            event.preventDefault()
            setCurrentIndex((prev) => Math.min(data.length - 1, prev + 1))
          }
          break
        case '1':
          event.preventDefault()
          // Toggle complaint label
          {
            const currentValue = getLabelValue(rowId, 'complaint')
            const newValue = currentValue === 'complaint' ? 'not_complaint' : 'complaint'
            handleLabelChange(rowId, 'complaint', newValue)
          }
          break
        case '2':
          event.preventDefault()
          // Toggle test 1: cycle through unset -> pass -> fail -> unset
          {
            const currentValue = getLabelValue(rowId, 'test_1')
            const newValue = currentValue === '' ? 'pass' : currentValue === 'pass' ? 'fail' : ''
            handleLabelChange(rowId, 'test_1', newValue)
          }
          break
        case '3':
          event.preventDefault()
          {
            const currentValue = getLabelValue(rowId, 'test_2')
            const newValue = currentValue === '' ? 'pass' : currentValue === 'pass' ? 'fail' : ''
            handleLabelChange(rowId, 'test_2', newValue)
          }
          break
        case '4':
          event.preventDefault()
          {
            const currentValue = getLabelValue(rowId, 'test_3')
            const newValue = currentValue === '' ? 'pass' : currentValue === 'pass' ? 'fail' : ''
            handleLabelChange(rowId, 'test_3', newValue)
          }
          break
        case '5':
          event.preventDefault()
          {
            const currentValue = getLabelValue(rowId, 'test_4')
            const newValue = currentValue === '' ? 'pass' : currentValue === 'pass' ? 'fail' : ''
            handleLabelChange(rowId, 'test_4', newValue)
          }
          break
        case '6':
          event.preventDefault()
          {
            const currentValue = getLabelValue(rowId, 'test_5')
            const newValue = currentValue === '' ? 'pass' : currentValue === 'pass' ? 'fail' : ''
            handleLabelChange(rowId, 'test_5', newValue)
          }
          break
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [currentIndex, data, labels])

  const handleExport = () => {
    const exportData = data.map((row) => ({
      ...row,
      complaint_label: getLabelValue(row.id, 'complaint') || '',
      test_1: getLabelValue(row.id, 'test_1') || '',
      test_2: getLabelValue(row.id, 'test_2') || '',
      test_3: getLabelValue(row.id, 'test_3') || '',
      test_4: getLabelValue(row.id, 'test_4') || '',
      test_5: getLabelValue(row.id, 'test_5') || '',
    }))

    const csv = Papa.unparse(exportData)
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    const url = URL.createObjectURL(blob)
    link.setAttribute('href', url)
    link.setAttribute('download', `labeled_data_${new Date().toISOString().split('T')[0]}.csv`)
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const currentRow = data[currentIndex]
  const totalRows = data.length
  const labeledCount = Object.keys(labels).length

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-soft border-b border-gray-200/50 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="animate-fade-in">
              <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Data Labeler</h1>
              <p className="text-gray-600 mt-1 text-sm">Label your data with precision</p>
            </div>
            {data.length > 0 && (
              <div className="flex items-center gap-6 animate-slide-up">
                <div className="text-right">
                  <div className="text-sm text-gray-500 font-medium">Progress</div>
                  <div className="text-lg font-semibold text-gray-900">
                    {labeledCount} / {totalRows} labeled
                  </div>
                </div>
                <button
                  onClick={handleExport}
                  className="px-6 py-2.5 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 active:translate-y-0"
                >
                  Export CSV
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {data.length === 0 ? (
          /* Upload Section */
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-soft-lg p-12 text-center animate-fade-in border border-gray-100">
            <div className="max-w-md mx-auto">
              <div className="mb-6 flex justify-center">
                <div className="p-4 bg-primary-50 rounded-full">
                  <svg
                    className="h-12 w-12 text-primary-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    />
                  </svg>
                </div>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Import CSV File
              </h2>
              <p className="text-gray-600 mb-8">
                Upload your CSV file to start labeling data
              </p>
              <label className="cursor-pointer inline-block">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".csv"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <span className="inline-block px-8 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 active:translate-y-0">
                  Choose CSV File
                </span>
              </label>
            </div>
          </div>
        ) : (
          /* Labeling Interface */
          <div className="flex flex-col gap-6 animate-fade-in">
            {/* Progress Bar */}
            <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-soft p-5 border border-gray-100">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-semibold text-gray-700">
                  Row {currentIndex + 1} of {totalRows}
                </span>
                <span className="text-sm text-gray-500 font-medium">
                  {Math.round(((currentIndex + 1) / totalRows) * 100)}% complete
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-primary-500 to-primary-600 h-2.5 rounded-full transition-all duration-500 ease-out shadow-sm"
                  style={{ width: `${((currentIndex + 1) / totalRows) * 100}%` }}
                />
              </div>
            </div>

            {/* Main Content Area - Side by Side */}
            <div className="flex gap-6 items-start flex-wrap lg:flex-nowrap">
              {/* Data Display - Left Side */}
              <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-soft-lg overflow-hidden border border-gray-100 flex-1 min-w-[300px] max-w-full animate-slide-up">
                <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                    <span className="w-2 h-2 bg-primary-500 rounded-full"></span>
                    Data Record #{currentIndex + 1}
                  </h3>
                </div>
                <div className="p-6 max-h-[calc(100vh-300px)] overflow-y-auto">
                  <div className="space-y-4">
                    {Object.entries(currentRow || {}).map(([key, value]) => {
                      if (key === 'id') return null
                      return (
                        <div key={key} className="border-b border-gray-100 pb-4 last:border-0 hover:bg-gray-50/50 p-3 -m-3 rounded transition-colors">
                          <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                            {key}
                          </div>
                          <div className="text-sm text-gray-900 break-words break-all whitespace-pre-wrap leading-relaxed max-w-full overflow-wrap-anywhere">
                            {value || <span className="text-gray-400 italic">(empty)</span>}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>

              {/* Labeling Form - Right Side */}
              <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-soft-lg p-6 w-full lg:w-[400px] flex-shrink-0 max-h-[calc(100vh-300px)] overflow-y-auto border border-gray-100 animate-slide-up">
                <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
                  <span className="w-2 h-2 bg-primary-500 rounded-full"></span>
                  Labels
                </h3>
                <div className="space-y-6">
                {/* Complaint Label */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                    Complaint / Not Complaint
                    <span className="text-xs font-normal text-gray-500 bg-gray-100 px-2 py-0.5 rounded">1</span>
                  </label>
                  <div className="flex gap-3">
                    {['complaint', 'not_complaint'].map((option) => (
                      <button
                        key={option}
                        onClick={() =>
                          handleLabelChange(
                            currentRow.id,
                            'complaint',
                            option
                          )
                        }
                        className={`px-6 py-2.5 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 active:scale-95 ${
                          getLabelValue(currentRow.id, 'complaint') === option
                            ? 'bg-primary-600 text-white shadow-md'
                            : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                        }`}
                      >
                        {option === 'complaint' ? 'Complaint' : 'Not Complaint'}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Test Labels */}
                {[1, 2, 3, 4, 5].map((testNum) => (
                  <div key={testNum}>
                    <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                      Test {testNum}
                      <span className="text-xs font-normal text-gray-500 bg-gray-100 px-2 py-0.5 rounded">{testNum + 1}</span>
                    </label>
                    <div className="flex gap-3">
                      {['pass', 'fail'].map((option) => (
                        <button
                          key={option}
                          onClick={() =>
                            handleLabelChange(
                              currentRow.id,
                              `test_${testNum}`,
                              option
                            )
                          }
                          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 capitalize transform hover:scale-105 active:scale-95 ${
                            getLabelValue(currentRow.id, `test_${testNum}`) === option
                              ? option === 'pass'
                                ? 'bg-green-600 text-white shadow-md hover:bg-green-700'
                                : 'bg-red-600 text-white shadow-md hover:bg-red-700'
                              : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                          }`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between bg-white/90 backdrop-blur-sm rounded-xl shadow-soft p-5 border border-gray-100">
              <button
                onClick={handlePrevious}
                disabled={currentIndex === 0}
                className={`px-6 py-2.5 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 active:scale-95 ${
                  currentIndex === 0
                    ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                    : 'bg-gray-200 text-gray-900 hover:bg-gray-300'
                }`}
              >
                Previous
              </button>
              <div className="text-sm text-gray-600 font-medium hidden sm:block text-center">
                <div>Arrow keys to navigate</div>
                <div className="text-xs text-gray-500 mt-1">
                  1: Complaint | 2-6: Tests
                </div>
              </div>
              <button
                onClick={handleNext}
                disabled={currentIndex === data.length - 1}
                className={`px-6 py-2.5 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 active:scale-95 ${
                  currentIndex === data.length - 1
                    ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                    : 'bg-primary-600 text-white hover:bg-primary-700 shadow-md hover:shadow-lg'
                }`}
              >
                Next
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

export default App

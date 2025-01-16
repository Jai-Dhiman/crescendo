export function PieceComponent() {
  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      {/* Left Sidebar */}
      <div className="w-80 border-r border-gray-200 dark:border-gray-800 h-full flex flex-col p-4 bg-white dark:bg-gray-800">
        {/* Practice Controls */}
        <div className="space-y-4">
          <h2 className="text-xl font-recia-medium text-gray-800 dark:text-gray-200">Practice Tools</h2>
          
          {/* Timer */}
          <div className="card-basic mb-4">
            <div className="text-3xl font-recia-medium text-center text-primary-600">00:00:00</div>
            <button className="btn-gradient w-full mt-2">Start Practice</button>
          </div>
          
          {/* Tool Buttons */}
          <div className="grid grid-cols-2 gap-2">
            <button className="btn-soft flex items-center justify-center gap-2">
              <span>Record</span>
            </button>
            <button className="btn-soft flex items-center justify-center gap-2">
              <span>Metronome</span>
            </button>
            <button className="btn-soft flex items-center justify-center gap-2">
              <span>Tuner</span>
            </button>
            <button className="btn-soft flex items-center justify-center gap-2">
              <span>Notes</span>
            </button>
          </div>
        </div>

        {/* Practice History */}
        <div className="mt-6">
          <h3 className="text-lg font-recia-medium text-gray-800 dark:text-gray-200 mb-2">Recent Practice</h3>
          <div className="space-y-2">
            {/* Practice Session Cards */}
            <div className="card-hover cursor-pointer">
              <div className="text-sm text-gray-600 dark:text-gray-300">Today</div>
              <div className="font-medium">45 minutes</div>
            </div>
          </div>
        </div>

        {/* Recordings Section */}
        <div className="mt-6">
          <h3 className="text-lg font-recia-medium text-gray-800 dark:text-gray-200 mb-2">Recordings</h3>
          <div className="space-y-2">
            <button className="btn-outline w-full">Add Recording</button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Top Bar */}
        <div className="h-16 border-b border-gray-200 dark:border-gray-800 flex items-center px-6 bg-white dark:bg-gray-800">
          <div className="flex-1">
            <h1 className="text-2xl font-recia-medium text-gray-800 dark:text-gray-200">Piece Title</h1>
          </div>
          <div className="flex gap-2">
            <button className="btn-soft">
              <span>100%</span>
            </button>
            <button className="btn-soft">
              <span>Annotate</span>
            </button>
            <button className="btn-soft">
              <span>Bookmarks</span>
            </button>
          </div>
        </div>

        {/* PDF Viewer */}
        <div className="flex-1 bg-gray-100 dark:bg-gray-900 p-6 overflow-auto">
          <div className="card-basic h-full flex items-center justify-center">
            <span className="text-gray-500">PDF Viewer</span>
          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="h-12 border-t border-gray-200 dark:border-gray-800 flex items-center justify-between px-6 bg-white dark:bg-gray-800">
          <button className="btn-soft">Previous Page</button>
          <div className="text-sm text-gray-600 dark:text-gray-300">Page 1 of 4</div>
          <button className="btn-soft">Next Page</button>
        </div>
      </div>

      {/* Mini-map Overlay */}
      <div className="fixed right-4 bottom-4 w-32 h-48 card-basic opacity-75 hover:opacity-100 transition-opacity">
        <div className="text-xs text-center text-gray-500">Page Overview</div>
      </div>
    </div>
  )
}
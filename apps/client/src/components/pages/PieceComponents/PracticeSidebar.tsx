export function PracticeSidebar() {
  return (
    <div className="w-60 border-r border-gray-200 dark:border-gray-800 h-full flex flex-col p-4 bg-white dark:bg-gray-800">
      <PracticeTools />
      <PracticeHistory />
      <RecordingsSection />
    </div>
  );
}

function PracticeTools() {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-recia-medium text-gray-800 dark:text-gray-200">Practice Tools</h2>
      <PracticeTimer />
      <ToolButtons />
    </div>
  );
}

function PracticeTimer() {
  return (
    <div className="card-basic mb-4">
      <div className="text-3xl font-recia-medium text-center text-primary-600">00:00:00</div>
      <button className="btn-gradient w-full mt-2">Start Practice</button>
    </div>
  );
}

function ToolButtons() {
  return (
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
  );
}

function PracticeHistory() {
  return (
    <div className="mt-6">
      <h3 className="text-lg font-recia-medium text-gray-800 dark:text-gray-200 mb-2">Recent Practice</h3>
      <div className="space-y-2">
        <div className="card-hover cursor-pointer">
          <div className="text-sm text-gray-600 dark:text-gray-300">Today</div>
          <div className="font-medium">45 minutes</div>
        </div>
      </div>
    </div>
  );
}

function RecordingsSection() {
  return (
    <div className="mt-6">
      <h3 className="text-lg font-recia-medium text-gray-800 dark:text-gray-200 mb-2">Recordings</h3>
      <div className="space-y-2">
        <button className="btn-outline w-full">Add Recording</button>
      </div>
    </div>
  );
}
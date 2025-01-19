import type { Piece } from '@crescendo/validation/src/api';

interface MainContentProps {
  piece: Piece;
}

export function MainContent({ piece }: MainContentProps) {
  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden">
      <TopBar piece={piece} />
      <PdfViewer />
      <PageNavigation />
    </div>
  );
}

interface TopBarProps {
  piece: Piece;
}

function TopBar({ piece }: TopBarProps) {
  return (
    <div className="h-16 border-b border-gray-200 dark:border-gray-800 flex items-center px-6 bg-white dark:bg-gray-800">
      <div className="flex-1">
        <h1 className="text-2xl font-recia-medium text-gray-800 dark:text-gray-200">
          {piece.title}
        </h1>
        {piece.artist && (
          <p className="text-sm text-gray-600 dark:text-gray-400">{piece.artist}</p>
        )}
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
  );
}

function PdfViewer() {
  return (
    <div className="flex-1 bg-gray-100 dark:bg-gray-900 p-6 overflow-auto">
      <div className="card-basic h-full flex items-center justify-center">
        <span className="text-gray-500">PDF Viewer</span>
      </div>
    </div>
  );
}

function PageNavigation() {
  return (
    <div className="h-12 border-t border-gray-200 dark:border-gray-800 flex items-center justify-between px-6 bg-white dark:bg-gray-800">
      <button className="btn-soft">Previous Page</button>
      <div className="text-sm text-gray-600 dark:text-gray-300">Page 1 of 4</div>
      <button className="btn-soft">Next Page</button>
    </div>
  );
}
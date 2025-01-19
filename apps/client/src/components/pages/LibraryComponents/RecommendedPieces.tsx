export function RecommendedPieces() {
  return (
    <div className="mt-16">
      <h2 className="text-2xl font-recia-medium mb-6">Recommended Pieces</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card-hover bg-primary-50 dark:bg-primary-900/20">
          <div className="aspect-[4/5] bg-primary-100 dark:bg-primary-800/30 rounded-lg mb-4 flex items-center justify-center">
            <span className="text-primary-600 dark:text-primary-400">Preview</span>
          </div>
          <h3 className="text-lg font-recia-medium mb-1">Sample Piece</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">Sample Artist</p>
          <button className="btn-soft w-full mt-4">Add to Library</button>
        </div>
      </div>
    </div>
  );
}
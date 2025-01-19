import type { Piece } from '@crescendo/validation/src/api';
import { useNavigate } from '@tanstack/react-router';

interface PieceCardProps {
  piece: Piece;
}

interface PiecesGridProps {
  pieces?: Piece[];
  onAddNew: () => void;
}

export function PiecesGrid({ pieces, onAddNew }: PiecesGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
      {/* Add New Piece Card */}
      <div 
        className="card-hover group cursor-pointer"
        onClick={onAddNew}
      >
        <div className="aspect-[4/5] bg-gray-100 dark:bg-gray-700 rounded-lg mb-4 overflow-hidden flex items-center justify-center relative">
          <span className="i-heroicons-plus text-6xl text-gray-400 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></span>
        </div>
        <h3 className="text-lg font-recia-medium mb-1">Add New Music</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">Upload sheet music to your library</p>
      </div>

      {/* Existing Pieces */}
      {Array.isArray(pieces) && pieces.map((piece) => (
        <PieceCard key={piece.id} piece={piece} />
      ))}
    </div>
  );
}

export function PieceCard({ piece }: PieceCardProps) {
  const navigate = useNavigate();

  const handleStartPractice = () => {
    navigate({ to: '/piece/$pieceId', params: { pieceId: piece.id } });
  };

  return (
    <div className="card-hover group">
      <div className="aspect-[4/5] bg-gray-100 dark:bg-gray-700 rounded-lg mb-4 overflow-hidden">
        <div className="w-full h-full flex items-center justify-center text-gray-400">
          Sheet Preview
        </div>
      </div>
      <div className="flex justify-between items-start">
        <div className="min-w-0 flex-1">
          <h3 className="text-lg font-recia-medium truncate">{piece.title}</h3>
          {piece.artist && (
            <p className="text-sm text-gray-600 dark:text-gray-400 truncate">{piece.artist}</p>
          )}
        </div>
        <button 
          className="btn-soft ml-4 scale-90 opacity-0 group-hover:opacity-100 transition-all shrink-0"
          onClick={handleStartPractice}
        >
          Start Practice
        </button>
      </div>
    </div>
  );
}
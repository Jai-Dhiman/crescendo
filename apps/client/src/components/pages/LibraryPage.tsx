import { GetPieces } from '@/lib/api/pieces';
import { useState } from 'react';
import type { Piece } from '@crescendo/validation/src/api';
import { AddPieceModal } from './LibraryComponents/AddPieceModal';
import { PiecesGrid } from './LibraryComponents/PiecesGrid';
import { RecommendedPieces } from './LibraryComponents/RecommendedPieces';


export function LibraryComponent() {
  const { data: pieces } = GetPieces<Piece[]>();
  const [isAddingPiece, setIsAddingPiece] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-recia-medium mb-2">Your Music Library</h1>
            <p className="text-gray-600 dark:text-gray-400">Manage your musical pieces</p>
          </div>
        </div>

        <PiecesGrid 
          pieces={pieces} 
          onAddNew={() => setIsAddingPiece(true)} 
        />

        <RecommendedPieces />

        {isAddingPiece && (
          <AddPieceModal onClose={() => setIsAddingPiece(false)} />
        )}
      </div>
    </div>
  );
}
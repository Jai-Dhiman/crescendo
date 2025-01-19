import { GetPieces, CreatePiece } from '@/lib/api/pieces';
import { useState } from 'react';
import type { Piece } from '@crescendo/validation/src/api';


export function LibraryComponent() {
  const { data: pieces } = GetPieces<Piece[]>();
  const [isAddingPiece, setIsAddingPiece] = useState(false);
  const createPieceMutation = CreatePiece();

  const handleAddNewPiece = () => {
    setIsAddingPiece(true);
  };

  const handleFileUpload = async (title: string, artist: string | undefined, file: File) => {
    try {
      await createPieceMutation.mutateAsync({
        title,
        artist,
        file,
      });
      setIsAddingPiece(false);
    } catch (error) {
      console.error('Failed to upload piece:', error);
      alert('Failed to upload piece. Please try again.');
    }
  };

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

        {/* Pieces Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {/* Add New Piece Card */}
          <div 
            className="card-hover group cursor-pointer"
            onClick={handleAddNewPiece}
          >
            <div className="aspect-[4/5] bg-gray-100 dark:bg-gray-700 rounded-lg mb-4 overflow-hidden flex items-center justify-center relative">
              <span className="i-heroicons-plus text-6xl text-gray-400 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></span>
            </div>
            <h3 className="text-lg font-recia-medium mb-1">Add New Music</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Upload sheet music to your library</p>
          </div>

          {/* Existing Pieces */}
          {Array.isArray(pieces) && pieces.map((piece) => (
            <div key={piece.id} className="card-hover group">
              <div className="aspect-[4/5] bg-gray-100 dark:bg-gray-700 rounded-lg mb-4 overflow-hidden">
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  Sheet Preview
                </div>
              </div>
              <h3 className="text-lg font-recia-medium mb-1">{piece.title}</h3>
              {piece.artist && (
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{piece.artist}</p>
              )}
              <div className="mt-4 flex justify-end">
                <button className="btn-soft scale-90 opacity-0 group-hover:opacity-100 transition-all">
                  Start Practice
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Recommended Pieces Section */}
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

        {/* Upload Modal */}
        {isAddingPiece && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="card-basic max-w-md w-full">
              <h2 className="text-xl font-recia-medium mb-4">Add New Piece</h2>
              <form onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                const title = formData.get('title') as string;
                const artist = formData.get('artist') as string;
                const file = formData.get('file') as File;
                if (title && file) {
                  handleFileUpload(title, artist || undefined, file);
                }
              }}>
                <input
                  type="text"
                  name="title"
                  placeholder="Piece Title"
                  className="input-modern w-full mb-4"
                  required
                />
                <input
                  type="text"
                  name="artist"
                  placeholder="Artist (Optional)"
                  className="input-modern w-full mb-4"
                />
                <input
                  type="file"
                  name="file"
                  accept="application/pdf"
                  className="input-modern w-full mb-4"
                  required
                />
                <div className="flex justify-end gap-4">
                  <button 
                    type="button"
                    className="btn-outline"
                    onClick={() => setIsAddingPiece(false)}
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="btn-primary"
                  >
                    Upload
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
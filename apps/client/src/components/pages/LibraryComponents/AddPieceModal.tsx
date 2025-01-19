import { CreatePiece } from '@/lib/api/pieces';

interface AddPieceModalProps {
  onClose: () => void;
}

export function AddPieceModal({ onClose }: AddPieceModalProps) {
  const createPieceMutation = CreatePiece();

  const handleFileUpload = async (title: string, artist: string | undefined, file: File) => {
    try {
      await createPieceMutation.mutateAsync({
        title,
        artist,
        file,
      });
      onClose();
    } catch (error) {
      console.error('Failed to upload piece:', error);
      alert('Failed to upload piece. Please try again.');
    }
  };

  return (
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
              onClick={onClose}
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
  );
}
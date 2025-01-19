import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { DeletePiece } from '@/lib/api/pieces';

export function PracticeSidebar({ pieceId }: { pieceId: string }) {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const deletePieceMutation = DeletePiece();
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      await deletePieceMutation.mutateAsync(pieceId);
      setIsDeleteModalOpen(false);
      navigate({ to: '/pieceLibrary' });
    } catch (error) {
      console.error('Failed to delete piece:', error);
    }
  };

  return (
    <div className="w-60 border-r border-gray-200 dark:border-gray-800 h-full flex flex-col p-4 bg-white dark:bg-gray-800">
      <PracticeTools />
      <PracticeHistory />
      <RecordingsSection />
      
      <div className="mt-auto pt-4">
        <button 
          onClick={() => setIsDeleteModalOpen(true)}
          className="btn-soft w-full bg-red-100 text-red-700 hover:bg-red-200 dark:bg-red-900/50 dark:text-red-300 dark:hover:bg-red-800/50"
        >
          Delete Piece
        </button>
      </div>

      <ConfirmDeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDelete}
      />
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

function ConfirmDeleteModal({ isOpen, onClose, onConfirm }: {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="card-basic max-w-md w-full mx-4">
        <h3 className="text-xl font-recia-medium mb-4">Delete Piece?</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Are you sure you want to delete this piece? This action cannot be undone.
        </p>
        <div className="flex gap-3 justify-end">
          <button onClick={onClose} className="btn-soft">
            Cancel
          </button>
          <button onClick={onConfirm} className="btn-gradient bg-red-500 hover:bg-red-600">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
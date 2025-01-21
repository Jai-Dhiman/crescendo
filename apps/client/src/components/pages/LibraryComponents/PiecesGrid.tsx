import type { Piece } from '@crescendo/validation/src/schema';
import { useNavigate } from '@tanstack/react-router';
import { useEffect, useRef, useState } from 'react';
import * as pdfjsLib from 'pdfjs-dist';
import { GetPiecePdf } from '@/lib/api/pieces';

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


pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.js';

export function PieceCard({ piece }: PieceCardProps) {
  const navigate = useNavigate();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const renderTaskRef = useRef<any>(null);
  const [isLoadingPreview, setIsLoadingPreview] = useState(true);
  const [previewError, setPreviewError] = useState(false);
  
  const { data: pdfUrl } = GetPiecePdf(piece.id);

  useEffect(() => {
    if (!pdfUrl || !canvasRef.current) return;

    let isMounted = true;

    const loadPreview = async () => {
      try {
        setIsLoadingPreview(true);
        
        // Cancel any existing render task
        if (renderTaskRef.current) {
          renderTaskRef.current.cancel();
        }

        const pdf = await pdfjsLib.getDocument(pdfUrl).promise;
        if (!isMounted) return;

        const page = await pdf.getPage(1);
        if (!isMounted) return;

        const canvas = canvasRef.current;
        if (!canvas || !isMounted) return;

        const context = canvas.getContext('2d');
        if (!context) return;

        const viewport = page.getViewport({ scale: 1.0 });
        const aspectRatio = viewport.width / viewport.height;
        
        const maxWidth = 300;
        const maxHeight = 400;
        
        let width = maxWidth;
        let height = width / aspectRatio;
        
        if (height > maxHeight) {
          height = maxHeight;
          width = height * aspectRatio;
        }

        canvas.width = width;
        canvas.height = height;

        const scaledViewport = page.getViewport({ scale: width / viewport.width });
        
        renderTaskRef.current = page.render({
          canvasContext: context,
          viewport: scaledViewport,
        });

        await renderTaskRef.current.promise;
        
        if (isMounted) {
          setIsLoadingPreview(false);
        }
      } catch (error) {
        if (isMounted) {
          console.error('Error loading PDF preview:', error);
          setPreviewError(true);
          setIsLoadingPreview(false);
        }
      }
    };

    loadPreview();

    return () => {
      isMounted = false;
      if (renderTaskRef.current) {
        renderTaskRef.current.cancel();
      }
      if (pdfUrl) {
        URL.revokeObjectURL(pdfUrl);
      }
    };
  }, [pdfUrl]);

  const handleStartPractice = () => {
    navigate({ to: '/piece/$pieceId', params: { pieceId: piece.id } });
  };

  return (
    <div className="card-hover group">
      <div className="aspect-[4/5] bg-gray-100 dark:bg-gray-700 rounded-lg mb-4 overflow-hidden">
        {isLoadingPreview ? (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            Loading...
          </div>
        ) : previewError ? (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            Preview unavailable
          </div>
        ) : (
          <canvas 
            ref={canvasRef}
            className="w-full h-full object-contain"
          />
        )}
      </div>
      <div className="flex justify-between items-start">
        <div className="min-w-0 flex-1">
          <h3 className="text-lg font-recia-medium truncate">{piece.title}</h3>
          {piece.artist && (
            <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
              {piece.artist}
            </p>
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
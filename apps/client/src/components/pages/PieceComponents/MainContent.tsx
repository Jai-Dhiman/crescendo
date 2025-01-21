import type { Piece } from '@crescendo/validation/src/schema';
import { Spinner } from '@/components/utils/Spinner';
import { GetPiecePdf } from '@/lib/api/pieces';
import { useEffect, useRef, useState } from 'react';
import * as pdfjsLib from 'pdfjs-dist';
import type { PDFDocumentProxy } from 'pdfjs-dist';

pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.js';

interface MainContentProps {
  piece: Piece;
}

export function MainContent({ piece }: MainContentProps) {
  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden">
      <TopBar piece={piece} />
      <PdfViewer piece={piece} />
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
    </div>
  );
}

interface PdfViewerProps {
  piece: Piece;
}

function PdfViewer({ piece }: PdfViewerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [pdfDoc, setPdfDoc] = useState<PDFDocumentProxy | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [scale, setScale] = useState(1.5);
  
  const { data: pdfUrl, isLoading, isError } = GetPiecePdf(piece.id);

  useEffect(() => {
    if (!pdfUrl) return;

    const loadPdf = async () => {
      try {
        const pdf = await pdfjsLib.getDocument(pdfUrl).promise;
        setPdfDoc(pdf);
        renderPage(pdf, 1);
      } catch (error) {
        console.error('Error loading PDF:', error);
      }
    };

    loadPdf();

    return () => {
      if (pdfUrl) {
        URL.revokeObjectURL(pdfUrl);
      }
    };
  }, [pdfUrl]);

  const renderPage = async (pdf: PDFDocumentProxy, pageNumber: number) => {
    if (!canvasRef.current) return;

    const page = await pdf.getPage(pageNumber);
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    
    if (!context) return;

    const viewport = page.getViewport({ scale });
    canvas.height = viewport.height;
    canvas.width = viewport.width;

    const renderContext = {
      canvasContext: context,
      viewport: viewport,
    };

    await page.render(renderContext).promise;
  };

  const changePage = async (delta: number) => {
    if (!pdfDoc) return;
    
    const newPage = currentPage + delta;
    if (newPage >= 1 && newPage <= pdfDoc.numPages) {
      setCurrentPage(newPage);
      await renderPage(pdfDoc, newPage);
    }
  };

  const handleZoom = (factor: number) => {
    setScale(prevScale => {
      const newScale = prevScale * factor;
      if (pdfDoc) {
        renderPage(pdfDoc, currentPage);
      }
      return newScale;
    });
  };

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (isError || !pdfUrl) {
    return (
      <div className="flex-1 flex items-center justify-center text-red-500">
        Error loading PDF
      </div>
    );
  }

  return (
    <div className="flex-1 bg-gray-100 dark:bg-gray-900 p-6 overflow-auto">
      <div className="card-basic w-full flex flex-col items-center">
        <div className="flex gap-4 mb-4">
          <button
            onClick={() => changePage(-1)}
            className="btn-soft"
            disabled={currentPage <= 1}
          >
            Previous Page
          </button>
          <span className="flex items-center">
            Page {currentPage} of {pdfDoc?.numPages || '-'}
          </span>
          <button
            onClick={() => changePage(1)}
            className="btn-soft"
            // disabled={pdfDoc && currentPage >= pdfDoc.numPages}
          >
            Next Page
          </button>
          <button onClick={() => handleZoom(1.1)} className="btn-soft">
            Zoom In
          </button>
          <button onClick={() => handleZoom(0.9)} className="btn-soft">
            Zoom Out
          </button>
        </div>
        <div className="overflow-auto">
          <canvas ref={canvasRef} className="shadow-lg" />
        </div>
      </div>
    </div>
  );
}
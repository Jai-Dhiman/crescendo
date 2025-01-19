import type { Piece } from '@crescendo/validation/src/schema';
import { Viewer, Worker } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import { Spinner } from '@/components/utils/Spinner';
import { GetPiecePdf } from '@/lib/api/pieces';
import { useEffect } from 'react';

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
  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  const { data: pdfUrl, isLoading, isError } = GetPiecePdf(piece.id);

  useEffect(() => {
    return () => {
      if (pdfUrl) {
        URL.revokeObjectURL(pdfUrl);
      }
    };
  }, [pdfUrl]);

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
      <div className="card-basic full">
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
          <Viewer
            fileUrl={pdfUrl}
            plugins={[defaultLayoutPluginInstance]}
            defaultScale={1}
            theme={{
              theme: document.documentElement.classList.contains('dark') ? 'dark' : 'light',
            }}
          />
        </Worker>
      </div>
    </div>
  );
}
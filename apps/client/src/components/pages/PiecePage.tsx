
import { useParams } from '@tanstack/react-router';
import { GetPieceById } from '@/lib/api/pieces';
import { PracticeSidebar } from './PieceComponents/PracticeSidebar';
import { MainContent } from './PieceComponents/MainContent';
import { PageMinimap } from './PieceComponents/PageMinimap';
import { Spinner } from '../utils/Spinner';
import type { Piece } from '@crescendo/validation/src/api';

export function PieceComponent() {
  const { pieceId } = useParams({ from: '/piece/$pieceId' });
  const { data: piece, isLoading, isError } = GetPieceById<Piece>(pieceId);

  if (isLoading) {
    return <div className={`p-2 text-2xl`}><Spinner /></div>
  }

  if (isError || !piece) {
    return <div className="flex h-screen items-center justify-center">Error loading piece</div>;
  }

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <PracticeSidebar />
      <MainContent piece={piece} />
      <PageMinimap />
    </div>
  );
}
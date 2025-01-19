import { createFileRoute } from '@tanstack/react-router'
import { PieceComponent } from '@/components/pages/PiecePage'

export const Route = createFileRoute('/piece/$pieceId')({
  component: PieceComponent,
})
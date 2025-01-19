import { createFileRoute } from '@tanstack/react-router'
import { PieceComponent } from '@/components/pages/Piece'

export const Route = createFileRoute('/piece')({
  component: PieceComponent
})
import { createFileRoute } from '@tanstack/react-router'
import { LibraryComponent } from '@/components/pages/PieceLibrary'

export const Route = createFileRoute('/pieceLibrary')({
  component: LibraryComponent
})
import { createFileRoute } from '@tanstack/react-router'
import { LibraryComponent } from '@/components/pages/LibraryPage'

export const Route = createFileRoute('/pieceLibrary')({
  component: LibraryComponent
})
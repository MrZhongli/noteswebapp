'use client'

import { useState, useEffect } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import OptionsMenu from './OptionsMenu'
import EditNoteModal from './EditNoteModal'
import DeleteConfirmationModal from './DeleteConfirmationModal'
import ArchiveConfirmationModal from './ArchiveConfirmationModal'
import { Note } from '../types/Note'

export default function NoteList() {
  const [notes, setNotes] = useState<Note[]>([])
  const [filter, setFilter] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [editingNote, setEditingNote] = useState<Note | null>(null)
  const [deletingNoteId, setDeletingNoteId] = useState<number | null>(null)
  const [archivingNoteId, setArchivingNoteId] = useState<number | null>(null)

  const fetchNotes = async () => {
    try {
      const response = await fetch('http://localhost:8023/notes')
      if (!response.ok) {
        throw new Error('Failed to fetch notes')
      }
      const data: Note[] = await response.json()
      setNotes(data)
      setLoading(false)
    } catch (err) {
      setError((err as Error).message)
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchNotes()
  }, [])

  const filteredNotes = notes.filter(note =>
    !note.isArchived &&
    (note.title.toLowerCase().includes(filter.toLowerCase()) ||
    note.content.toLowerCase().includes(filter.toLowerCase()))
  )

  const handleEdit = (noteId: number) => {
    const noteToEdit = notes.find(note => note.id === noteId)
    if (noteToEdit) {
      setEditingNote(noteToEdit)
    }
  }

  const handleDelete = (noteId: number) => {
    setDeletingNoteId(noteId)
  }

  const handleArchive = (noteId: number) => {
    setArchivingNoteId(noteId)
  }

  const handleSaveEdit = async (updatedNote: { title: string; content: string }) => {
    if (editingNote) {
      try {
        const response = await fetch(`http://localhost:8023/notes/${editingNote.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedNote),
        })

        if (!response.ok) {
          throw new Error('Failed to update note')
        }

        const updatedNoteFromServer = await response.json()
        setNotes(notes.map(note => 
          note.id === editingNote.id ? updatedNoteFromServer : note
        ))
        setEditingNote(null)
      } catch (err) {
        console.error('Error updating note:', err)
      }
    }
  }

  const handleConfirmDelete = async () => {
    if (deletingNoteId) {
      try {
        const response = await fetch(`http://localhost:8023/notes/${deletingNoteId}`, {
          method: 'DELETE',
        })

        if (!response.ok) {
          throw new Error('Failed to delete note')
        }

        setNotes(notes.filter(note => note.id !== deletingNoteId))
        setDeletingNoteId(null)
      } catch (err) {
        console.error('Error deleting note:', err)
      }
    }
  }

  const handleConfirmArchive = async () => {
    if (archivingNoteId) {
      try {
        const response = await fetch(`http://localhost:8023/notes/${archivingNoteId}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ isArchived: true }),
        })

        if (!response.ok) {
          throw new Error('Failed to archive note')
        }

        const updatedNote = await response.json()
        setNotes(notes.map(note => 
          note.id === archivingNoteId ? updatedNote : note
        ))
        setArchivingNoteId(null)
      } catch (err) {
        console.error('Error archiving note:', err)
      }
    }
  }

  if (loading) {
    return <p>Loading notes...</p>
  }

  if (error) {
    return <p className="text-red-500">Error: {error}</p>
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Your Notes</h2>
      <Input
        type="text"
        placeholder="Filter notes by title or content..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="mb-4"
      />
      {filteredNotes.length === 0 ? (
        <p className="text-gray-500">No notes found matching your filter.</p>
      ) : (
        filteredNotes.map((note) => (
          <Card key={note.id}>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>{note.title}</CardTitle>
              <OptionsMenu
                onEdit={() => handleEdit(note.id)}
                onDelete={() => handleDelete(note.id)}
                onArchive={() => handleArchive(note.id)}
              />
            </CardHeader>
            <CardContent>
              <p>{note.content}</p>
              <p className="text-sm text-gray-500 mt-2 ">
                Created by: {note.user.name} - {new Date(note.createdAt).toLocaleDateString()}
              </p>
            </CardContent>
          </Card>
        ))
      )}
      <EditNoteModal
        isOpen={!!editingNote}
        onClose={() => setEditingNote(null)}
        onSave={handleSaveEdit}
        note={editingNote}
      />
      <DeleteConfirmationModal
        isOpen={!!deletingNoteId}
        onClose={() => setDeletingNoteId(null)}
        onConfirm={handleConfirmDelete}
      />
      <ArchiveConfirmationModal
        isOpen={!!archivingNoteId}
        onClose={() => setArchivingNoteId(null)}
        onConfirm={handleConfirmArchive}
      />
    </div>
  )
}


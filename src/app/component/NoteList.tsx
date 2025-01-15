'use client'

import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

type Note = {
  id: string
  title: string
  content: string
}

export default function NoteList() {
  const [notes, setNotes] = useState<Note[]>([
    { id: '1', title: 'Sample Note 1', content: 'This is a sample note.' },
    { id: '2', title: 'Sample Note 2', content: 'This is another sample note.' },
    { id: '3', title: 'Important Task', content: 'Remember to complete this task.' },
  ])
  const [filter, setFilter] = useState('')

  const filteredNotes = notes.filter(note => 
    note.title.toLowerCase().includes(filter.toLowerCase()) ||
    note.content.toLowerCase().includes(filter.toLowerCase())
  )

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
            <CardHeader>
              <CardTitle>{note.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{note.content}</p>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  )
}


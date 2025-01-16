'use client'

import { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Archive } from 'lucide-react'
import { Note } from '../types/Note'

export default function ArchivedNotes() {
    const [isOpen, setIsOpen] = useState(false)
    const [archivedNotes, setArchivedNotes] = useState<Note[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const fetchArchivedNotes = async () => {
        setLoading(true)
        setError(null)
        try {
            const response = await fetch('http://localhost:8023/notes?isArchived=true')
            if (!response.ok) {
                throw new Error('Failed to fetch archived notes')
            }
            const data: Note[] = await response.json()
            setArchivedNotes(data)
        } catch (err) {
            setError((err as Error).message)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (isOpen) {
            fetchArchivedNotes()
        }
    }, [isOpen])

    return (
        <>
            <Button onClick={() => setIsOpen(true)} variant="outline" className="w-full">
                <Archive className="w-4 h-4 mr-2" />
                View Archived Notes
            </Button>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent className="sm:max-w-[625px]">
                    <DialogHeader>
                        <DialogTitle>Archived Notes</DialogTitle>
                    </DialogHeader>
                    <div className="mt-4 space-y-4 max-h-[60vh] overflow-y-auto">
                        {loading && <p>Loading archived notes...</p>}
                        {error && <p className="text-red-500">Error: {error}</p>}
                        {!loading && !error && archivedNotes.length === 0 && (
                            <p>No archived notes found.</p>
                        )}
                        {archivedNotes.map((note) => (
                            <Card key={note.id}>
                                <CardHeader>
                                    <CardTitle>{note.title}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="whitespace-pre-wrap break-words">{note.content}</p>
                                    <p className="text-sm text-gray-500 mt-2">
                                        Created by: {note.user.name} - {new Date(note.createdAt).toLocaleDateString()}
                                    </p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </DialogContent>
            </Dialog>
        </>
    )
}


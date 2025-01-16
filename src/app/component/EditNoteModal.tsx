'use client'

import { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

type EditNoteModalProps = {
    isOpen: boolean
    onClose: () => void
    onSave: (updatedNote: { title: string; content: string }) => void
    note: { id: number; title: string; content: string } | null
}

async function updateNoteAPI(id: number, data: { title: string; content: string }) {
    try {
        const response = await fetch(`http://localhost:8023/notes/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error('Failed to update note');
        }

        return await response.json();
    } catch (error) {
        console.error('Error updating note:', error);
        throw error;
    }
}

export default function EditNoteModal({ isOpen, onClose, onSave, note }: EditNoteModalProps) {
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        if (note) {
            setTitle(note.title)
            setContent(note.content)
            setError(null)
        }
    }, [note])

    const handleSave = async () => {
        if (!note?.id) return;
        
        setIsLoading(true)
        setError(null)
        
        try {
            const updatedNote = await updateNoteAPI(note.id, { title, content })
            onSave({ title: updatedNote.title, content: updatedNote.content })
            window.location.reload()
            onClose()
        } catch (error) {
            setError('Failed to update note. Please try again.')
            console.error('Error saving note:', error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Edit Note</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="title" className="text-right">
                            Title
                        </Label>
                        <Input
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="col-span-3"
                            disabled={isLoading}
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="content" className="text-right">
                            Content
                        </Label>
                        <Textarea
                            id="content"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            className="col-span-3"
                            disabled={isLoading}
                        />
                    </div>
                    {error && (
                        <div className="text-red-500 text-sm mt-2">
                            {error}
                        </div>
                    )}
                </div>
                <DialogFooter>
                    <Button 
                        type="button" 
                        variant="secondary" 
                        onClick={onClose}
                        disabled={isLoading}
                    >
                        Cancel
                    </Button>
                    <Button 
                        type="button" 
                        onClick={handleSave}
                        disabled={isLoading}
                    >
                        {isLoading ? 'Saving...' : 'Save Changes'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
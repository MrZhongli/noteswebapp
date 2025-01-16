// updateNote.ts
export async function updateNote(noteId: number, updatedData: { title: string; content: string }): Promise<Note> {
    try {
        const response = await fetch(`http://localhost:8023/notes/${noteId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedData),
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        const updatedNote = await response.json();
        return updatedNote;
    } catch (error) {
        console.error('Failed to update note:', error);
        throw error;
    }
}
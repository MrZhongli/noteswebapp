import { Note } from '@/types/note'

// This is a mock API function. Replace with actual API calls when ready.
export async function getNotes(): Promise<Note[]> {
  // Simulating API delay
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  return [
    { id: '1', title: 'Sample Note 1', content: 'This is a sample note.' },
    { id: '2', title: 'Sample Note 2', content: 'This is another sample note.' },
  ]
}


import NoteList from './NoteList'
import NoteForm from './NoteForm'

export default function NoteSection() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-bold mb-4">Create a New Note</h2>
          <NoteForm />
        </div>
        <NoteList />
      </div>
    </div>
  )
}


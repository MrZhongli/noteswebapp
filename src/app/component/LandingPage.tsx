import Header from './Header'
import Footer from './Footer'
import NoteSection from './NoteSection'

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <NoteSection />
      </main>
      <Footer />
    </div>
  )
}


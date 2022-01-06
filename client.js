import Nullstack from 'nullstack'
import Application from './src/Application'
import { fetchNotes, fetchNote } from './src/services/database'

const context = Nullstack.start(Application)

// Read notes from localStorage
context.notes = fetchNotes()
context.saveNotes = saveNotes

const firstNote = context.notes[0] || {}

if (firstNote.hash) {
  context.currentNote = { ...firstNote, text: fetchNote(firstNote.hash) }
}

function saveNotes() {
  console.log('------> NOTES SAVED')
  window.localStorage.setItem('my-note', context.notes)
}

context.start = async function start() {}

export default context

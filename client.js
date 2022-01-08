import Nullstack from 'nullstack'
import Application from './src/Application'
import { fetchNotesList, fetchNote } from './src/services/database'

const context = Nullstack.start(Application)

// Read notes from localStorage
context.notes = fetchNotesList()

const firstNote = context.notes[0] || {}

if (firstNote.hash) {
  context.currentNote = { ...firstNote, text: fetchNote(firstNote.hash) }
}

context.start = async function start() {}

export default context

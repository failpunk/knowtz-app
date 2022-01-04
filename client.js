import Nullstack from 'nullstack'
import Application from './src/Application'

const context = Nullstack.start(Application)

// Read notes from localStorage
context.notes = window.localStorage.getItem('my-note') || ''
context.saveNotes = saveNotes

function saveNotes() {
  console.log('------> NOTES SAVED')
  window.localStorage.setItem('my-note', context.notes)
}

context.start = async function start() {}

export default context

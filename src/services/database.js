import shortHash from 'short-hash'

const NOTES_KEY = 'knowtz'

export function fetchNotes() {
  const lookup = `${NOTES_KEY}-list`
  const rawList = window.localStorage.getItem(lookup)
  return JSON.parse(rawList) || []
}

export function saveNotes(list) {
  const lookup = `${NOTES_KEY}-list`
  return window.localStorage.setItem(lookup, JSON.stringify(list))
}

export function fetchNote(noteKey) {
  const lookup = `${NOTES_KEY}-${noteKey}`
  return window.localStorage.getItem(lookup) || ''
}

export function saveNote({ hash, text }) {
  const lookup = `${NOTES_KEY}-${hash}`
  return window.localStorage.setItem(lookup, text)
}

// Delete note and from list
export function deleteNote(hash) {
  const lookup = `${NOTES_KEY}-${hash}`
  const remaining = fetchNotes().filter((note) => note.hash !== hash)
  window.localStorage.removeItem(lookup)
  saveNotes(remaining)
}

export function findNote() {}

// Crate note and add to list
export function createNewNote() {
  const existingNotes = fetchNotes()
  const name = `My New Note ${parseInt(existingNotes.length) + 1}`
  const hash = shortHash(name.toLowerCase())

  const noteObject = {
    hash,
    name,
  }

  // Save to list of notes
  existingNotes.push(noteObject)
  saveNotes(existingNotes)

  // Save actual note
  saveNote({ hash, text: '' })

  return { ...noteObject, text: '' }
}

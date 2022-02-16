import { nanoid } from 'nanoid'

const NOTES_KEY = 'knowtz'

export function fetchAllNotes() {
  const list = fetchNotesList()
  let notes = []
  for (const noteInfo of list) {
    notes.push({
      hash: noteInfo.hash,
      text: fetchNote(noteInfo.hash),
    })
  }

  return notes
}

export function fetchNotesList() {
  const lookup = `${NOTES_KEY}-list`
  const rawList = window.localStorage.getItem(lookup)
  return JSON.parse(rawList) || []
}

export function fetchNote(hash) {
  const lookup = `${NOTES_KEY}-${hash}`
  return window.localStorage.getItem(lookup) || ''
}

export function saveNotes(list) {
  const lookup = `${NOTES_KEY}-list`
  return window.localStorage.setItem(lookup, JSON.stringify(list))
}

export function updateName(hash, text) {
  const noteToUpdate = fetchNotesList().find((note) => note.hash === hash)
  noteToUpdate.name = text
  const remaining = fetchNotesList().filter((note) => note.hash !== hash)
  remaining.push(noteToUpdate)
  saveNotes(remaining)
}

export function saveNote({ hash, text }) {
  const lookup = `${NOTES_KEY}-${hash}`
  return window.localStorage.setItem(lookup, text)
}

// Delete note and from list
export function deleteNote(hash) {
  const lookup = `${NOTES_KEY}-${hash}`
  const remaining = fetchNotesList().filter((note) => note.hash !== hash)
  window.localStorage.removeItem(lookup)
  saveNotes(remaining)
}

// Crate note and add to list
export function createNewNote() {
  const existingNotes = fetchNotesList()
  const name = `My New Note ${parseInt(existingNotes.length) + 1}`
  const hash = nanoid(12)

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

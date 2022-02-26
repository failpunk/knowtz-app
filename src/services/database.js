import { nanoid } from 'nanoid'

const NOTES_KEY = 'knowtz'
export const ARCHIVE_NOTES_HASH = 'archive'

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

export function findNoteInList(hash) {
  return fetchNotesList().find((note) => note.hash === hash)
}

export function updateName(hash, text) {
  const noteToUpdate = findNoteInList(hash)
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

/**
 * Archive note to special archive key and remove original note from storage.
 */
export function archiveNote(hash) {
  const noteText = fetchNote(hash)
  const noteInfo = findNoteInList(hash)

  const textToArchive = noteInfo.name + '\n=====================================\n\n' + noteText
  console.log('------> textToArchive', textToArchive)

  const oldArchiveText = fetchNote(ARCHIVE_NOTES_HASH)

  const newArchiveText = `${textToArchive}\n\n${oldArchiveText}`

  // save archive
  saveNote({ hash: ARCHIVE_NOTES_HASH, text: newArchiveText })

  // delete now archived note
  deleteNote(hash)
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

export function fetchUser() {
  const lookup = `${NOTES_KEY}-user`
  const rawUser = window.localStorage.getItem(lookup)
  return JSON.parse(rawUser) || {}
}

export function saveUser(user) {
  const lookup = `${NOTES_KEY}-user`
  return window.localStorage.setItem(lookup, JSON.stringify(user))
}

export function updateUserName(username) {
  const user = fetchUser()
  user.username = username
  saveUser(user)
}

export function calcDatabaseSize() {
  var allStrings = ''
  for (var key in window.localStorage) {
    if (window.localStorage.hasOwnProperty(key)) {
      allStrings += window.localStorage[key]
    }
  }
  const size = (allStrings.length * 16) / (8 * 1024)
  return Math.round(size)
  // return allStrings ? 3 + Math.round(size) + ' KB' : 'Empty (0 KB)'
}

// knowtz-list
// knowtz-archive

export function exportDatabase() {
  const notes = fetchAllNotes()
  console.log('------> notes', notes)
}

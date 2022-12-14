import Nullstack from 'nullstack'
import Application from './src/Application'
import { fetchNotesList, fetchNote } from './src/services/database'
import Supabase from './src/services/supabase'
import mixpanel from 'mixpanel-browser'

const context = Nullstack.start(Application)

// enable debug in dev env
const { mixpanelKey, mixpanelDebug, supabaseUrl, supabasePubkey } = context.settings

// add supabase to context
const db = new Supabase(supabaseUrl, supabasePubkey)
context.db = db

mixpanel.init(mixpanelKey, { debug: mixpanelDebug === 'true' })
mixpanel.track('Knowtz Started')

context.mixpanel = mixpanel

// Read notes from localStorage
context.notes = fetchNotesList()

const firstNote = context.notes[0] || {}

if (firstNote.hash) {
  context.currentNote = { ...firstNote, text: fetchNote(firstNote.hash) }
}

context.start = async function start() {
  console.log('------> START')

  db.doClient()



  const notes = await db.getNotes()
  console.log('------> notes', JSON.stringify(notes, null, 2))
}

export default context

import Nullstack from 'nullstack'
import Application from './src/Application'
import { fetchNotesList, fetchNote } from './src/services/database'
import mixpanel from 'mixpanel-browser'

const context = Nullstack.start(Application)

// enable debug in dev env
const { mixpanelKey, mixpanelDebug } = context.settings
mixpanel.init(mixpanelKey, { debug: mixpanelDebug === 'true' })
mixpanel.track('Knowtz Started')

context.mixpanel = mixpanel

// Read notes from localStorage
context.notes = fetchNotesList()

const firstNote = context.notes[0] || {}

if (firstNote.hash) {
  context.currentNote = { ...firstNote, text: fetchNote(firstNote.hash) }
}

context.start = async function start() {}

export default context

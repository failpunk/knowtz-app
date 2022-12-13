import Nullstack from 'nullstack'
import Application from './src/Application'
import { fetchNotesList, fetchNote } from './src/services/database'
import mixpanel from 'mixpanel-browser'

const context = Nullstack.start(Application)

// enable debug in dev env
const { mixpanelKey, mixpanelDebug, supabaseUrl, supabasePubkey } = context.settings

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
  var myHeaders = new Headers()
  myHeaders.append('apikey', supabasePubkey)
  myHeaders.append('Authorization', `Bearer ${supabasePubkey}`)

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow',
  }

  const url = supabaseUrl + `/rest/v1/note`
  const response = await fetch(url, requestOptions).catch((error) => console.log('error', error))

  console.log('------> json', await response.json())
}

export default context

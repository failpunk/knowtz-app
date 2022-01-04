import Nullstack from 'nullstack'
import Application from './src/Application'

const context = Nullstack.start(Application)

// Read notes from localStorage
context.notes = window.localStorage.getItem('my-note') || ''
context.todos = []

context.start = async function start() {}

export default context

import Nullstack from 'nullstack'
import SparkleSvg from './svg/SparkleSvg'
import { debounce } from 'lodash-es'
import { saveNote, deleteNote, fetchNotesList, fetchNote, updateName } from './services/database'
import Modal from './components/Modal'

export default class Notes extends Nullstack {
  note = { text: '', name: '' }
  save
  showDeleteModal = false

  async hydrate({ currentNote }) {
    // Capture the TAB key when used within a textarea, then insert two spaces.
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Tab' && event.target.type === 'textarea') {
        event.preventDefault()
        event.target.setRangeText('  ', event.target.selectionStart, event.target.selectionStart, 'end')
      }
    })

    if (currentNote) {
      this.note = currentNote
    }

    this.save = debounce(this.saveNoteAndNotify, 1000) // todo: move to client???
  }

  // Save the current note and trigger a context update so we search for todos
  saveNoteAndNotify({ hash, text, context }) {
    saveNote({ hash, text })
    context.updated = !context.updated
  }

  async update({ currentNote }) {
    // console.log('------> Notes UPDATE', currentNote)
    if (currentNote) {
      this.note = currentNote
    }
  }

  handleNoteUpdated(context) {
    context.currentNote = this.note
    const { hash, text } = this.note
    this.save({ hash, text, context })
    context.updated = true
  }

  updateName(context) {
    const text = context.event.target.innerText
    if (text !== this.note.name) {
      updateName(this.note.hash, text)
      this.note.name = text
      context.notes = fetchNotesList()
    }
  }

  deleteModalCallback({ action }) {
    if (action === 'primary') {
      this.deleteNote()
    }
    this.showDeleteModal = false
  }

  deleteNote(context) {
    deleteNote(this.note.hash)
    context.notes = fetchNotesList()
    const firstNote = context.notes[0] || {}
    context.currentNote = { ...firstNote, text: fetchNote(firstNote.hash) }
    context.mixpanel.track('Note Deleted')
  }

  renderTextarea() {
    return (
      <textarea
        bind={this.note.text}
        oninput={this.handleNoteUpdated}
        rows="4"
        name="comment"
        id="comment"
        class="h-screen border-none block w-full sm:text-sm p-0 border-transparent focus:border-transparent focus:ring-0 scrollbar-thin scrollbar-thumb-rounded-md scrollbar-thumb-gray-900 scrollbar-track-gray-700"
      ></textarea>
    )
  }

  renderSplash() {
    return (
      <div class="flex justify-center items-center h-screen">
        <div class="block text-center">
          <div class="mb-5">
            <SparkleSvg />
          </div>
          Add Your First Note
        </div>
      </div>
    )
  }

  renderNoteTitle() {
    return (
      <h2 class="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate" contenteditable onblur={this.updateName}>
        {this.note.name}
      </h2>
    )
  }

  renderDeleteButton() {
    return (
      <button
        onclick={() => (this.showDeleteModal = true)}
        type="button"
        class="inline-flex items-center p-1 border border-transparent rounded-full shadow-sm text-white bg-blue-500 hover:bg-blue-600 focus:outline-none"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
          />
        </svg>
      </button>
    )
  }

  renderNote() {
    return (
      <div>
        <div class="md:flex md:items-center md:justify-between mb-5 border-b-2 pb-2">
          <div class="flex-1 min-w-0">
            <NoteTitle />
          </div>
          <div class="mt-4 flex md:mt-0 md:ml-4">
            <DeleteButton />
          </div>
        </div>
        <div class="mt-1 ">
          <Textarea />
        </div>
      </div>
    )
  }

  renderDeleteModal() {
    return <Modal title="Delete Note" text="Are you sure you want to permanently delete this note?" primaryText="Delete Note" onClose={this.deleteModalCallback} />
  }

  render() {
    return (
      <>
        {this.showDeleteModal && <DeleteModal />}
        <div class="absolute inset-0 pt-5 pb-3 px-4 sm:px-6 lg:px-8">
          <div class="h-full rounded-lg overflow-hidden">
            <section>
              <article>{this.note.hash ? <Note /> : <Splash />}</article>
            </section>
          </div>
        </div>
      </>
    )
  }
}

import Nullstack from 'nullstack'
import SparkleSvg from './svg/SparkleSvg'
import { debounce } from 'lodash-es'
import { saveNote, deleteNote, fetchNotesList, fetchNote, updateName } from './services/database'

export default class Notes extends Nullstack {
  note = { text: '', name: '' }
  save

  async hydrate({ currentNote }) {
    if (currentNote) {
      this.note = currentNote
    }
    this.save = debounce(saveNote, 1000) // todo: move to client???
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
    this.save({ hash, text })
  }

  updateName(context) {
    const text = context.event.target.innerText
    if (text !== this.note.name) {
      updateName(this.note.hash, text)
      this.note.name = text
      context.notes = fetchNotesList()
    }
  }

  deleteNote(context) {
    deleteNote(this.note.hash)
    context.notes = fetchNotesList()
    const firstNote = context.notes[0] || {}
    context.currentNote = { ...firstNote, text: fetchNote(firstNote.hash) }
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
        type="button"
        class="ml-3 inline-flex items-center px-2.5 py-1.5 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        onclick={this.deleteNote}
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="-ml-0.5 mr-2 h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
          <path
            fill-rule="evenodd"
            d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
            clip-rule="evenodd"
          />
        </svg>
        Delete
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

  render() {
    return (
      <div class="absolute inset-0 pt-5 pb-3 px-4 sm:px-6 lg:px-8">
        <div class="h-full rounded-lg overflow-hidden">
          <section>
            <article>{this.note.name ? <Note /> : <Splash />}</article>
          </section>
        </div>
      </div>
    )
  }
}

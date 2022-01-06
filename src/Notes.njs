import Nullstack from 'nullstack'
import { debounce } from 'lodash-es'
import { saveNote } from './services/database'

class Home extends Nullstack {
  note = { text: '', name: '' }
  save

  async hydrate({ currentNote }) {
    console.log('------> NOTES HYDRATE', currentNote)
    if (currentNote) {
      this.note = currentNote
    }
    this.save = debounce(saveNote, 1000) // todo: move to client???
  }

  handleNoteUpdated(context) {
    context.currentNote = this.note
    console.log('------> handleNoteUpdated', this.note, this.note.hash)
    const { hash, text } = this.note
    this.save({ hash, text })
  }

  async update({ currentNote }) {
    console.log('------> NOTES UPDATE', currentNote)
    if (currentNote) {
      this.note = currentNote
    }
  }

  renderTextarea() {
    return (
      <textarea
        bind={this.note.text}
        oninput={this.handleNoteUpdated}
        rows="4"
        name="comment"
        id="comment"
        class="h-screen border-none block w-full sm:text-sm p-0 border-transparent focus:border-transparent focus:ring-0"
      ></textarea>
    )
  }

  render() {
    return (
      <section>
        <article>
          <div>
            <label for="comment" class="block text-2xl font-medium text-gray-700 border-b-2 mb-7">
              {this.note.name}
            </label>
            <div class="mt-1">
              <Textarea />
            </div>
          </div>
        </article>
      </section>
    )
  }
}

export default Home

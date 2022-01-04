import Nullstack from 'nullstack'
import { debounce } from 'lodash-es'

class Home extends Nullstack {
  notes = ''
  save

  async hydrate({ notes, saveNotes }) {
    this.notes = notes
    this.save = debounce(saveNotes, 1000)
  }

  noteUpdated(context) {
    context.notes = this.notes
    this.save()
  }

  async update(context) {
    console.log('------> NOTES UPDATED')
    this.notes = context.notes
  }

  renderTextarea() {
    return (
      <textarea
        bind={this.notes}
        oninput={this.noteUpdated}
        rows="4"
        name="comment"
        id="comment"
        class="h-screen shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md bg-slate-50"
      ></textarea>
    )
  }

  render() {
    return (
      <section>
        <article>
          <div>
            <label for="comment" class="block text-sm font-medium text-gray-700">
              Notes
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

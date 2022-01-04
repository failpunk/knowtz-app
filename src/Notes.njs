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

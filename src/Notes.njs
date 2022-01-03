import Nullstack from 'nullstack'
import { debounce } from 'lodash-es'

class Home extends Nullstack {
  notes = ''
  todos = []
  save

  async hydrate() {
    this.notes = window.localStorage.getItem('my-note')
    this.save = debounce(this.saveNotes, 1000)
    this.processText()
  }

  saveNotes() {
    console.log('------> SAVE NOTES')
    window.localStorage.setItem('my-note', this.notes)
  }

  toggleTodo({ todo }) {
    todo.isComplete = !todo.isComplete

    const replacement = todo.isComplete ? '[X]' : '[]'
    const toBeReplaced = todo.isComplete ? '[]' : '[X]'

    const oldText = todo.text

    // update todo list text
    todo.text = todo.text.replace(toBeReplaced, replacement)
    // update noriginal note text
    this.notes = this.notes.replace(oldText, todo.text)

    this.saveNotes()
  }

  processText() {
    // searching for []
    const matches = [...this.notes.matchAll(/\[\]/g)]

    // parse each match for just the todo text.
    this.todos = matches.map((match) => {
      const firstNewlineIndex = match.input.indexOf('\n', match.index) || undefined
      const text = match.input.substring(match.index, firstNewlineIndex > 0 ? firstNewlineIndex : undefined)

      return {
        text: text,
        startIndex: match.index,
        endIndex: firstNewlineIndex,
        length: firstNewlineIndex - match.index,
        isComplete: false,
      }
    })

    this.save()
  }

  renderTodo({ todo }) {
    if (!todo) return false

    return (
      // <li class={`todo ${(todo.isComplete &&= 'isComplete')}`} todo={todo} onclick={this.toggleTodo}>
      //   {todo.text}
      // </li>

      <div class="relative flex items-start py-4">
        <div class="min-w-0 flex-1 text-sm">
          <label for="person-2" class="font-medium text-gray-700 select-none">
            {todo.text}
          </label>
        </div>
        <div class="ml-3 flex items-center h-5">
          <input id="person-2" name="person-2" type="checkbox" class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
        </div>
      </div>
    )
  }

  renderTodosList() {
    return (
      <>
        <fieldset>
          <legend class="text-lg font-medium text-gray-900">Todos:</legend>
          <div class="mt-4 border-t border-b border-gray-200 divide-y divide-gray-200">
            {this.todos.map((todo) => (
              <Todo todo={todo} />
            ))}
          </div>
        </fieldset>
      </>
    )
  }

  render() {
    return (
      <section>
        <aside>
          <TodosList />
        </aside>
        <article>
          <div>
            <label for="comment" class="block text-sm font-medium text-gray-700">
              Notes
            </label>
            <div class="mt-1">
              <textarea
                bind={this.notes}
                oninput={this.processText}
                rows="4"
                name="comment"
                id="comment"
                class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md bg-slate-50"
              ></textarea>
            </div>
          </div>
          {/* <textarea bind={this.notes} oninput={this.processText}></textarea> */}
        </article>
      </section>
    )
  }
}

export default Home

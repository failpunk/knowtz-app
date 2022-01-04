import Nullstack from 'nullstack'
import { debounce } from 'lodash-es'

class Home extends Nullstack {
  todos = []

  async hydrate() {
    this.processText()
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

  async update({ notes }) {
    this.processText()
  }

  processText({ notes }) {
    // searching for []
    const matches = [...notes.matchAll(/\[\]/g)]

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
      <fieldset>
        <legend class="text-lg font-medium text-gray-900">Todos:</legend>
        <div class="mt-4 border-t border-b border-gray-200 divide-y divide-gray-200">
          {this.todos.map((todo) => (
            <Todo todo={todo} />
          ))}
        </div>
      </fieldset>
    )
  }

  render() {
    return <TodosList />
  }
}

export default Home

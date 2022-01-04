import Nullstack from 'nullstack'

const UNCHECKED_BRACKET = '[]'
const CHECKED_BRACKET = '[X]'
class Home extends Nullstack {
  todos = []

  async hydrate() {
    this.searchNotesForTodos()
  }

  toggleTodo(context) {
    const { todo, notes } = context

    todo.isComplete = !todo.isComplete

    const replacement = todo.isComplete ? '[X]' : '[]'
    const toBeReplaced = todo.isComplete ? '[]' : '[X]'

    const oldText = todo.originalText

    // update todo list text
    todo.originalText = todo.originalText.replace(toBeReplaced, replacement)

    // update noriginal note text
    context.notes = notes.replace(oldText, todo.originalText)
  }

  async update() {
    this.searchNotesForTodos()
  }

  searchNotesForTodos({ notes }) {
    // searching for []
    const matchesComplete = [...notes.matchAll(/\[X\]/g)]
    const matchesIncomplete = [...notes.matchAll(/\[\]/g)]

    // parse each match for just the todo text.
    const parsedComplete = matchesComplete.map((match) => this.parseTodo({ match, isComplete: true }))
    const parsedIncomplete = matchesIncomplete.map((match) => this.parseTodo({ match, isComplete: false }))

    this.todos = [...parsedIncomplete, ...parsedComplete]
  }

  parseTodo({ match, isComplete }) {
    const firstNewlineIndex = match.input.indexOf('\n', match.index) || undefined
    const textWithBrackets = match.input.substring(match.index, firstNewlineIndex > 0 ? firstNewlineIndex : undefined)

    // Remove brackets
    let textWithoutBrackets = textWithBrackets.replace(`${UNCHECKED_BRACKET} `, '')
    textWithoutBrackets = textWithoutBrackets.replace(`${CHECKED_BRACKET} `, '')

    return {
      originalText: textWithBrackets,
      text: textWithoutBrackets,
      startIndex: match.index,
      endIndex: firstNewlineIndex,
      length: firstNewlineIndex - match.index,
      isComplete: isComplete,
    }
  }

  renderTodo({ todo }) {
    if (!todo) return false

    console.log('------> todo.isComplete', todo)

    return (
      // <li class={`todo ${(todo.isComplete &&= 'isComplete')}`} todo={todo} onclick={this.toggleTodo}>
      //   {todo.text}
      // </li>

      <div class="relative flex items-start py-4">
        <div class="ml-3 flex items-center h-5 mr-2">
          <input
            checked={todo.isComplete}
            id="person-2"
            name="person-2"
            type="checkbox"
            class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
            todo={todo}
            onclick={this.toggleTodo}
          />
        </div>
        <div class="min-w-0 flex-1 text-sm">
          <label for="person-2" class="font-medium text-gray-700 select-none">
            {todo.text}
          </label>
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

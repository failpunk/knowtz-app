import Nullstack from 'nullstack'
import { saveNote, fetchAllNotes, fetchNote } from './services/database'

const UNCHECKED_BRACKET = '[]'
const CHECKED_BRACKET = '[X]'
export default class Todos extends Nullstack {
  todos = []
  notes = []

  async hydrate({ notes }) {
    this.notes = notes
    this.searchForTodos()
  }

  async update({ notes }) {
    this.notes = notes
    this.searchForTodos()
  }

  // Sort by not completed first
  getSortedTodos() {
    return this.todos.sort((x) => (x.isComplete ? 1 : -1))
  }

  toggleTodo(context) {
    const { todo, currentNote } = context

    todo.isComplete = !todo.isComplete

    const replacement = todo.isComplete ? '[X]' : '[]'
    const toBeReplaced = todo.isComplete ? '[]' : '[X]'

    const oldText = todo.originalText

    // update todo list text
    todo.originalText = todo.originalText.replace(toBeReplaced, replacement)

    // update original note text
    let noteToUpdate = fetchNote(todo.hash)
    noteToUpdate = noteToUpdate.replace(oldText, todo.originalText)

    // Save updated note text
    saveNote({ hash: todo.hash, text: noteToUpdate })

    if (todo.hash === currentNote.hash) {
      context.currentNote = { ...currentNote, text: noteToUpdate }
    }
  }

  searchForTodos() {
    const todos = fetchAllNotes().map((note) => {
      return this.searchNoteForTodos({ text: note.text }).map((todo) => ({ ...note, ...todo }))
    })
    this.todos = todos.flat()
  }

  searchNoteForTodos({ text }) {
    // searching for []
    const matchesComplete = [...text.matchAll(/\[X\]/g)]
    const matchesIncomplete = [...text.matchAll(/\[\]/g)]

    // parse each match for just the todo text.
    const parsedComplete = matchesComplete.map((match) => this.parseTodo({ match, isComplete: true }))
    const parsedIncomplete = matchesIncomplete.map((match) => this.parseTodo({ match, isComplete: false }))

    return [...parsedIncomplete, ...parsedComplete]
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

    return (
      <div class="relative flex items-start py-4 border-gray-300">
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
          <label for="person-2" class={`font-medium text-gray-700 select-none ${(todo.isComplete &&= 'line-through opacity-60')}`}>
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
        <div class="mt-4 border-t border-b border-gray-300 divide-y divide-gray-300">
          {this.getSortedTodos().map((todo) => (
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

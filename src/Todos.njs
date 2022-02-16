import Nullstack from 'nullstack'
import { saveNote, fetchAllNotes, fetchNote } from './services/database'

const UNCHECKED_BRACKET = '[]'
const CHECKED_BRACKET = '[X]'
export default class Todos extends Nullstack {
  todos = []
  notes = []
  menuOpen = false
  hideCompleted = false

  async hydrate({ notes }) {
    this.notes = notes
    this.searchForTodos()
  }

  async update({ notes }) {
    this.notes = notes
    this.searchForTodos()
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen
  }

  toggleShowHideCompleted() {
    this.hideCompleted = !this.hideCompleted
    this.menuOpen = false
  }

  // Sort by not completed first
  getSortedTodos() {
    return this.todos.sort((x) => (x.isComplete ? 1 : -1))
  }

  getTodosWithoutCompleted({ todos }) {
    return todos.filter((todo) => todo.isComplete === false)
  }

  getTodos() {
    const todos = this.getSortedTodos()
    return this.hideCompleted ? this.getTodosWithoutCompleted({ todos }) : todos
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
      <div class="mt-4 border-b border-gray-300 divide-y divide-gray-300 overflow-y-auto h-screen scrollbar-thin scrollbar-thumb-rounded-md scrollbar-thumb-gray-900 scrollbar-track-gray-700">
        {this.getTodos().map((todo) => (
          <Todo todo={todo} />
        ))}
      </div>
    )
  }

  renderMenuDots() {
    return (
      <div>
        <button type="button" class="-m-2 p-2 rounded-full flex items-center text-gray-400 hover:text-gray-600" id="menu-0-button" aria-expanded="false" aria-haspopup="true" onclick={this.toggleMenu}>
          <span class="sr-only">Open options</span>
          <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
          </svg>
        </button>
      </div>
    )
  }

  renderShowTodoMenuItem() {
    return (
      <>
        <svg xmlns="http://www.w3.org/2000/svg" class="mr-3 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
          <path
            fill-rule="evenodd"
            d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z"
            clip-rule="evenodd"
          />
          <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
        </svg>
        <span>Hide Completed Todos</span>
      </>
    )
  }

  renderHideTodoMenuItem() {
    return (
      <>
        <svg xmlns="http://www.w3.org/2000/svg" class="mr-3 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
          <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
          <path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd" />
        </svg>
        <span>Show Completed Todos</span>
      </>
    )
  }

  renderTodoMenu() {
    return (
      <div
        class="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="menu-0-button"
        tabindex="-1"
      >
        <div class="py-1" role="none">
          <a href="#" class="text-gray-700 flex px-4 py-2 text-sm" role="menuitem" tabindex="-1" id="menu-0-item-2" onclick={this.toggleShowHideCompleted}>
            {this.hideCompleted ? <HideTodoMenuItem /> : <ShowTodoMenuItem />}
          </a>
        </div>
      </div>
    )
  }

  renderTodoHeader() {
    return (
      <div class="px-4 py-5 sm:px-6 ">
        <div class="flex justify-between">
          <div class="flex-shrink-0">
            <h2 class="text-xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">Todos</h2>
          </div>

          <div class="flex-shrink-0 self-center flex">
            <div class="relative z-30 inline-block text-left">
              <MenuDots />

              {this.menuOpen && <TodoMenu />}
            </div>
          </div>
        </div>
      </div>
    )
  }

  render() {
    return (
      <div>
        <TodoHeader />
        <TodosList />
      </div>
    )
  }
}

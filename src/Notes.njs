import Nullstack from 'nullstack';
import { debounce } from 'lodash-es';
import './Notes.scss';

class Home extends Nullstack {
  notes = '';
  todos = [];
  save;

  async hydrate() {
    this.notes = window.localStorage.getItem('my-note');
    this.save = debounce(this.saveNotes, 1000);
    this.processText();
  }

  saveNotes() {
    console.log('------> SAVE NOTES');
    window.localStorage.setItem('my-note', this.notes);
  }

  toggleTodo({ todo }) {
    todo.isComplete = !todo.isComplete;

    const replacement = todo.isComplete ? '[X]' : '[]';
    const toBeReplaced = todo.isComplete ? '[]' : '[X]';

    const oldText = todo.text;

    // update todo list text
    todo.text = todo.text.replace(toBeReplaced, replacement);
    // update noriginal note text
    this.notes = this.notes.replace(oldText, todo.text);

    this.saveNotes();
  }

  processText() {
    // searching for []
    const matches = [...this.notes.matchAll(/\[\]/g)];

    // parse each match for just the todo text.
    this.todos = matches.map((match) => {
      const firstNewlineIndex = match.input.indexOf('\n', match.index) || undefined;
      const text = match.input.substring(match.index, firstNewlineIndex > 0 ? firstNewlineIndex : undefined);

      return {
        text: text,
        startIndex: match.index,
        endIndex: firstNewlineIndex,
        length: firstNewlineIndex - match.index,
        isComplete: false,
      };
    });

    this.save();
  }

  renderTodo({ todo }) {
    if (!todo) return false;

    return (
      <li class={`todo ${(todo.isComplete &&= 'isComplete')}`} todo={todo} onclick={this.toggleTodo}>
        {todo.text}
      </li>
    );
  }

  renderTodosList() {
    return (
      <>
        <h2>Todos:</h2>
        <ul>
          {this.todos.map((todo) => (
            <Todo todo={todo} />
          ))}
        </ul>
      </>
    );
  }

  render() {
    return (
      <section>
        <aside>
          <TodosList />
        </aside>
        <article>
          <h1>Notes</h1>
          <textarea bind={this.notes} oninput={this.processText}></textarea>
        </article>
      </section>
    );
  }
}

export default Home;

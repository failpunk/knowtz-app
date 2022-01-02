import Nullstack from 'nullstack';
import './Notes.scss';

class Home extends Nullstack {
  notes = '[] do something cool';
  todos = [];

  async hydrate() {
    this.processText();
  }

  processText() {
    // searching for []
    const matches = [...this.notes.matchAll(/\[\]/g)];

    // parse each match for just the todo text.
    this.todos = matches.map((match) => {
      const firstNewlineIndex = match.input.indexOf('\n', match.index) || undefined;
      return match.input.substring(match.index, firstNewlineIndex > 0 ? firstNewlineIndex : undefined);
    });
  }

  renderTodo({ todo }) {
    if (!todo) return false;

    return <li> {todo} </li>;
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

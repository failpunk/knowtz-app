import Nullstack from 'nullstack'
import './tailwinds.css'
import Layout from './Layout'
import Notes from './Notes'
import Todos from './Todos'

class Application extends Nullstack {
  prepare(context) {
    context.page.locale = 'en-US'
  }

  renderHead() {
    return (
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Anonymous+Pro:ital,wght@0,400;0,700;1,400;1,700&family=Mulish:wght@200&display=swap" rel="stylesheet" />
      </head>
    )
  }

  render() {
    return (
      <main class="dark h-screen">
        <Head />
        <Layout leftColumn={<Todos />} rightColumn={<Notes />} />
      </main>
    )
  }
}

export default Application

import Nullstack from 'nullstack'
import './tailwinds.css'
import Layout from './Layout'
import Notes from './Notes'
import Todos from './Todos'

class Application extends Nullstack {
  prepare(context) {
    context.page.locale = 'en-US'
  }

  render() {
    return <Layout leftColumn={<Todos />} rightColumn={<Notes />} />
  }
}

export default Application

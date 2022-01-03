import Nullstack from 'nullstack'
import './tailwinds.css'
import Layout from './Layout'

class Application extends Nullstack {
  prepare({ page }) {
    page.locale = 'en-US'
  }

  renderLeftColumn() {
    render()
  }

  render() {
    return <Layout leftColumn={<div>Todos</div>} />
  }
}

export default Application

import Nullstack from 'nullstack'
import { exportDatabase, importDatabase } from '../services/database'

export default class Settings extends Nullstack {
  isVisble = false

  showModal() {
    this.isVisble = true
  }

  hideModal() {
    this.isVisble = false
  }

  async importFile({ event }) {
    const file = event.target.files[0]
    const str = await file.text()
    importDatabase(JSON.parse(str))
  }

  /**
   * Builds a JSON object in a Blob for download
   */
  renderExportNotes() {
    const obj = exportDatabase()
    var blob = new Blob([JSON.stringify(obj)], { type: 'application/json' })
    const url = window.URL.createObjectURL(blob)

    return (
      <div class="mt-3 text-center sm:mt-5">
        <div class="mb-3">
          <h2 class="text-lg leading-6 font-medium text-gray-900">Export Notes</h2>
          <p class="mt-1 text-sm text-gray-500">Download a single JSON file of your notes, to import on another devices or backup online.</p>
        </div>

        <a
          href={url}
          download="knowtz-export.json"
          textContent="justin.json"
          type="button"
          class="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-600 focus:outline-none sm:text-sm"
        >
          Export Notes
        </a>
      </div>
    )
  }

  renderImportNotes() {
    return (
      <div class="mt-3 text-center sm:mt-5">
        <div class="mb-3">
          <h2 class="text-lg leading-6 font-medium text-gray-900">Import Notes</h2>
          <p class="mt-1 text-sm text-gray-500">Import your exported JSON file of notes. (WARNING: only import files into a fresh copy of knowtz. Importing into a Knowtz app that already contains data will most likely make you sad.)</p>
        </div>

        <input
          class="block w-full text-sm text-gray-900 bg-blue-400 rounded-lg border border-blue-300 cursor-pointer dark:text-gray-400 focus:outline-none focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
          type="file"
          onchange={this.importFile}
        />
      </div>
    )
  }

  renderHeaderIcon() {
    return (
      <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 text-gray-400">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
          />
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      </div>
    )
  }

  renderSettingsModal() {
    return (
      // <!-- This example requires Tailwind CSS v2.0+ -->
      <div class="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
        <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
          <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
            &#8203;
          </span>

          <div class="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
            <div class="hidden sm:block absolute top-0 right-0 pt-4 pr-4">
              <button onclick={this.hideModal} type="button" class="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                <span class="sr-only">Close</span>
                {/* <!-- Heroicon name: outline/x --> */}
                <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div>
              <HeaderIcon />
            </div>
            <div class="mt-5 sm:mt-6 space-y-10">
              <ExportNotes />
              <ImportNotes />
            </div>
          </div>
        </div>
      </div>
    )
  }

  renderSettingsButton() {
    return (
      <button onclick={this.showModal} type="button" class="inline-flex items-center p-1 border border-transparent rounded-full shadow-sm text-gray-500">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
          />
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      </button>
    )
  }

  render() {
    return (
      <>
        <SettingsButton />
        {this.isVisble && <SettingsModal />}
      </>
    )
  }
}

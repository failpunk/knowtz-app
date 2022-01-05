import Nullstack from 'nullstack'

export default class Layout extends Nullstack {
  user = 'Justin Vencel'
  avatarUrl = 'https://avatars.githubusercontent.com/u/1109167?v=4'
  notes = ['New Note', 'Another Note']
  selectedNote = 'New Note'

  renderNotesList() {
    return (
      <nav class="mt-5 flex-1" aria-label="Sidebar">
        <div class="px-2 space-y-1">
          {this.notes.map((note) => (
            <NavItem text={note} isActive={note === this.selectedNote} />
          ))}
        </div>
      </nav>
    )
  }

  renderNavItem({ text, isActive }) {
    const css = isActive ? 'bg-gray-200 text-gray-900' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'

    return (
      <a href="#" class={`${css} group flex items-center px-2 py-2 text-sm font-medium rounded-md`}>
        <svg xmlns="http://www.w3.org/2000/svg" class="text-gray-500 mr-3 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
          />
        </svg>
        {text}
      </a>
    )
  }

  render({ leftColumn, rightColumn }) {
    return (
      <div class="h-full flex">
        {/* Off-canvas menu for mobile, show/hide based on off-canvas menu state. */}
        {/* <div class="fixed inset-0 flex z-40 lg:hidden" role="dialog" aria-modal="true">
          <div class="fixed inset-0 bg-gray-600 bg-opacity-75" aria-hidden="true"></div>

          <div class="relative flex-1 flex flex-col max-w-xs w-full bg-white focus:outline-none">
            <div class="absolute top-0 right-0 -mr-12 pt-2">
              <button type="button" class="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                <span class="sr-only">Close sidebar</span>
                <svg class="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div class="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
              <div class="flex-shrink-0 flex items-center px-4">
                <img class="h-8 w-auto" src="https://tailwindui.com/img/logos/workflow-logo-indigo-600-mark-gray-900-text.svg" alt="Workflow" />
              </div>
              <nav aria-label="Sidebar" class="mt-5">
                <div class="px-2 space-y-1">
                  <a href="#" class="bg-gray-100 text-gray-900 group flex items-center px-2 py-2 text-base font-medium rounded-md">
                    <svg class="text-gray-500 mr-4 h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                      />
                    </svg>
                    Dashboard
                  </a>
                </div>
              </nav>
            </div>
            <div class="flex-shrink-0 flex border-t border-gray-200 p-4">
              <a href="#" class="flex-shrink-0 group block">
                <div class="flex items-center">
                  <div>
                    <img class="inline-block h-10 w-10 rounded-full" src={this.avatarUrl} alt="" />
                  </div>
                  <div class="ml-3">
                    <p class="text-base font-medium text-gray-700 group-hover:text-gray-900">{this.user}</p>
                    <p class="text-sm font-medium text-gray-500 group-hover:text-gray-700">View profile</p>
                  </div>
                </div>
              </a>
            </div>
          </div>

          <div class="flex-shrink-0 w-14" aria-hidden="true"></div>
        </div> */}

        {/* Static sidebar for desktop */}
        <div class="hidden lg:flex lg:flex-shrink-0">
          <div class="flex flex-col w-64">
            <div class="flex-1 flex flex-col min-h-0 border-r border-gray-200 bg-gray-100">
              <div class="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
                <div class="flex items-center flex-shrink-0 px-4">
                  <img class="h-8 w-auto" src="https://tailwindui.com/img/logos/workflow-logo-indigo-600-mark-gray-900-text.svg" alt="Workflow" />
                </div>
                <NotesList />
              </div>
              <div class="flex-shrink-0 flex border-t border-gray-200 p-4">
                <a href="#" class="flex-shrink-0 w-full group block">
                  <div class="flex items-center">
                    <div>
                      <img class="inline-block h-9 w-9 rounded-full" src={this.avatarUrl} alt="" />
                    </div>
                    <div class="ml-3">
                      <p class="text-sm font-medium text-gray-700 group-hover:text-gray-900">{this.user}</p>
                      <p class="text-xs font-medium text-gray-500 group-hover:text-gray-700">View profile</p>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div class="flex flex-col min-w-0 flex-1 overflow-hidden">
          <div class="lg:hidden">
            <div class="flex items-center justify-between bg-gray-50 border-b border-gray-200 px-4 py-1.5">
              <div>
                <img class="h-8 w-auto" src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg" alt="Workflow" />
              </div>
              <div>
                <button type="button" class="-mr-3 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900">
                  <span class="sr-only">Open sidebar</span>
                  <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <div class="flex-1 relative z-0 flex overflow-hidden">
            <main class="flex-1 relative z-0 overflow-y-auto focus:outline-none xl:order-last">
              <div class="absolute inset-0 py-6 px-4 sm:px-6 lg:px-8">
                <div class="h-full rounded-lg">{rightColumn}</div>
              </div>
            </main>
            <aside class="hidden relative xl:order-first xl:flex xl:flex-col flex-shrink-0 w-96 border-r border-gray-200 overflow-y-auto">
              <div class="absolute inset-0 py-6 px-4 sm:px-6 lg:px-8">
                <div class="h-full rounded-lg">{leftColumn}</div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    )
  }
}

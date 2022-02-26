import Nullstack from 'nullstack'

/**
 * Usage
 *
 * <Modal title="Delete Note" text="Are you sure you want to permanently delete this note?" primaryText="Delete Note" onClose={this.deleteModalCallback} />
 */
export default class Modal extends Nullstack {
  handlePrimaryClick({ onClose }) {
    onClose({ action: 'primary' })
  }

  handleSecondaryClick({ onClose }) {
    onClose({ action: 'secondary' })
  }

  renderPrimaryButton({ primaryText = 'Accept', style }) {
    const errorColor = 'bg-red-100 hover:bg-red-200'
    const infoColor = 'bg-blue-400 hover:bg-blue-500'

    const buttonColor = style === 'error' ? errorColor : infoColor

    return (
      <button
        onclick={this.handlePrimaryClick}
        type="button"
        class={`w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 ${buttonColor} text-base font-medium focus:outline-none sm:ml-3 sm:w-auto sm:text-sm`}
      >
        {primaryText}
      </button>
    )
  }

  renderSecondaryButton({ secondaryText = 'Cancel' }) {
    return (
      <button
        onclick={this.handleSecondaryClick}
        type="button"
        class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-white font-medium text-gray-700 hover:text-gray-500 focus:outline-none sm:mt-0 sm:w-auto sm:text-sm"
      >
        {secondaryText}
      </button>
    )
  }

  renderModalIcon({ style }) {
    const errorIcon = (
      <div class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
        {/* <!-- Heroicon name: outline/exclamation --> */}
        <svg class="h-6 w-6 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
      </div>
    )

    const infoIcon = (
      <div class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-400 sm:mx-0 sm:h-10 sm:w-10">
        {/* <!-- Heroicon name: outline/exclamation --> */}
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
    )

    return style === 'error' ? errorIcon : infoIcon
  }

  /**
   * https://tailwindui.com/components/application-ui/overlays/modals#component-6a0b582f00c5ec38bf748d9a75559f04
   */
  render({ title, text, style = 'error' }) {
    return (
      <div class="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
        <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>

          {/* <!-- This element is to trick the browser into centering the modal contents. --> */}
          <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
            &#8203;
          </span>

          <div class="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
            <div class="hidden sm:block absolute top-0 right-0 pt-4 pr-4">
              <button
                onclick={this.handleSecondaryClick}
                type="button"
                class="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <span class="sr-only">Close</span>
                {/* <!-- Heroicon name: outline/x --> */}
                <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div class="sm:flex sm:items-start">
              <ModalIcon style={style} />
              <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                  {title}
                </h3>
                <div class="mt-2">
                  <p class="text-sm text-gray-500">{text}</p>
                </div>
              </div>
            </div>
            <div class="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
              <PrimaryButton style={style} />
              <SecondaryButton />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

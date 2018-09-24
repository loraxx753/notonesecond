export class Official extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
    const div = document.createElement('div')
    div.innerHTML =  `
      <p>This is where their bio should go</p>
    `
    this.shadowRoot.appendChild(div)
  }
}
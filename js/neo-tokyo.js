export class NeoTokyo extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
    const div = document.createElement('div')
    div.innerHTML =  `
      <p>I'm so stoked right now.</p>
    `
    this.shadowRoot.appendChild(div)
  }
}
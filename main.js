import * as register from './js/register.js'
import config from './js/config.js'
import api from './js/api.js'
import { handleResponse } from './js/functions.js'

(async function(config) {
  const loadButton = document.querySelector('#load').addEventListener('click', async function() {
    api.setConfig('google')
    const addressValue = document.querySelector('input#address').value
    const representatives = await api.representatives({ address: addressValue })
    const notification = document.querySelector('link[rel=import][href*=nos-notification]').import
    
    
    if('error' in representatives) {
      const template = notification.querySelector('template').content.cloneNode(true)
      const p = template.querySelector('p')
      p.innerText = representatives.error.message

      document.querySelector('section').appendChild(template)
    } else {
      handleResponse(representatives)
    }
  })



})(config)
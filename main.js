import { loadRepresenitives, handleScroll } from './js/functions.js'
import * as register from './js/register.js'

(async function() {
  document.querySelector('#load').addEventListener('click', loadRepresenitives)
  if(localStorage.getItem('address')) {
    document.querySelector('input#address').value = localStorage.getItem('address') || ''
    document.querySelector('details > button').innerHTML = "Change Address"
    document.querySelector('details').open = false
  }
  document.querySelector('article').addEventListener('scroll', handleScroll)
  loadRepresenitives()
})()
(async function() {
  // Look for the address in localStorage
  if(window.localStorage.getItem('address')) {
    document.querySelector('#address').value = window.localStorage.getItem('address');
    document.querySelector('details > button').innerHTML = "Change Address"
    document.querySelector('details').open = false;
    await loadFromAddress(window.localStorage.getItem('address'))
  } else {
    document.querySelector('details').open = true;
  }
})()

// Register the Service Worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('../sw.js')
      .then(reg => console.log('Service Worker is now registered'))
      .catch(err => console.log(`Service Worker: Error: ${err}`))
  })    
}  

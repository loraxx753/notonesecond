if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('../sw.js')
      .then(reg => console.log('Service Worker is now registered'))
      .catch(err => console.log(`Service Worker: Error: ${err}`))
  })    
}
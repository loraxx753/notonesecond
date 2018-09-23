(async function(config) {
  // Make sure sw are supported
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('sw.js')
        .then(reg => console.log('Service Worker is now registered'))
        .catch(err => console.log(`Service Worker: Error: ${err}`))
    })

    if(window.localStorage.getItem('address')) {
      
      document.querySelector('#address').value = window.localStorage.getItem('address');
      document.querySelector('summary').classList.add('change-address');
      document.querySelector('details').open = false;
      loadFromAddress(window.localStorage.getItem('address'))
    }
    
    document.querySelector('#load').addEventListener('click', loadFromAddress)

    document.querySelector('article').addEventListener('scroll', handleScroll)
    
  }  
})(config)



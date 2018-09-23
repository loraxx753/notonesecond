async function loadFromAddress(e) {
  const address = document.querySelector('input#address').value
  const representatives = await api.representatives({
      address: address
  })
  if(representatives.error) {
    document.querySelector('section').innerHTML = `<p>An Error Occurred.</p>`
  } else {
    window.localStorage.setItem('address', address)
    await debugResponse(representatives)
  }
}

async function debugResponse(response) {
//   response = Object.keys(response) 
  document.querySelector('section').innerHTML = `<pre><code>${JSON.stringify(response, null, 2)}</code></pre>`
}


async function handleScroll(e) {
  if(this.scrollTop > 34) {
    document.querySelector('header').classList.add('scrolled')
    document.querySelector('article').classList.add('scrolled')
    document.querySelector('footer').classList.add('scrolled')
  } else {
    document.querySelector('header').classList.remove('scrolled')
    document.querySelector('article').classList.remove('scrolled')
    document.querySelector('footer').classList.remove('scrolled')
  }
}

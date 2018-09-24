async function debugResponse(response) {
  response = Object.keys(response) 
  document.querySelector('section').innerHTML = `<pre><code>${JSON.stringify(response, null, 2)}</code></pre>`
}

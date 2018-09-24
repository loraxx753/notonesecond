async function loadFromAddress(e) {
  const addressValue = document.querySelector('input#address').value
  const representatives = await api.representatives({ address: addressValue })
  if(representatives.error) {
    document.querySelector('section').innerHTML = `<p>An Error Occurred.</p>`
  } else {
    localStorage.setItem('address', addressValue)
    document.querySelector('details').open = false;
    document.querySelector('details > button').innerHTML = "Change Address"
    const address = representatives.normalizedInput
    const rawDivisions = await parseObject(representatives.divisions, 'name')
    const rawOffices = await parseObject(representatives.offices, 'name')


    const officials = await parseArray(representatives.officials, 'name')
    const offices = await parseOffices(rawOffices, representatives.officials, representatives.divisions)
    const divisions = await parseDivisions(rawDivisions, representatives.offices )
    

    const representativesObject = {
      address,
      divisions,
      offices,
      officials
    }
    await handleResponse(representativesObject)
  }
}

const handleResponse = async ({address, divisions, offices, officials}) => {
  document.querySelector('[slot=line1]').innerHTML = address.line1
  document.querySelector('[slot=city]').innerHTML = address.city
  document.querySelector('[slot=state]').innerHTML = address.state
  document.querySelector('[slot=zip]').innerHTML = address.zip
  

  const template = document.querySelector('template#division').content.cloneNode(true)
  document.querySelector('section').appendChild(template)


  document.querySelector('section').style = "display: block;"

}

async function debugResponse(response) {
  response = Object.keys(response) 
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

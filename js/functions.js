
const handleResponse = async ({address, divisions, offices, officials}) => {
  document.querySelector('[slot=line1]').innerHTML = address.line1
  document.querySelector('[slot=city]').innerHTML = address.city
  document.querySelector('[slot=state]').innerHTML = address.state
  document.querySelector('[slot=zip]').innerHTML = address.zip
  

  const template = document.querySelector('template#division').content.cloneNode(true)
//   document.querySelector('section').appendChild(template)


  document.querySelector('section').style = "display: block;"

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

export { handleResponse }

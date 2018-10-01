import {
  parseArray,
  parseObject, parseOffices, parseDivisions 
  } from './parse.js'
import api from './api.js'

api.setConfig('google')



const handleResponse = async ({ offices, ...response}) => {
  const officeTemplateImport = await document.querySelector('link[rel=import][href*=office-list]').import
  

  const p = document.createElement`p`
  const li = document.createElement`li`
  const ul = document.createElement`ul`
  const a = document.createElement`a`
  
  const officeTemplate = officeTemplateImport.querySelector`template`.content.cloneNode(true)
  
  for(let officeName in offices) {

    const officeLi = li.cloneNode()
    officeLi.classList.add('office')
    officeLi.innerHTML = `<p class="office-name">${officeName}</p>`

    const { officials, divisions } = offices[officeName]
    
    for(let officialName in officials) {
      const official = officials[officialName]
      const officialUl = ul.cloneNode()
      const officialLi = li.cloneNode()
      officialLi.classList.add('official')
      const channels = official.channels

      const channelsUl = ul.cloneNode()
      channelsUl.classList.add('channels')
      for(let channel in channels) {
        const channelLi = li.cloneNode()
        const { type, id } = channels[channel]

        channelLi.addEventListener('click', goToChannel)
        channelLi.classList.add(type)
        channelLi.classList.add('channel')
        channelLi.dataset.channelId = id
        channelLi.innerHTML = id
        channelsUl.appendChild(channelLi)
      }

      officialLi.innerHTML = `
      <div class="party ${official.party}">
        ${official.party ? official.party[0] : ''}
      </div>
      <div class="name">
        ${officialName}
      </div>
      ${(official.phones) ? `<a class="phone" href="tel:${official.phones[0]}">
         ${official.phones[0]}
      </a>
      ` : '?'}`
      officialLi.appendChild(channelsUl)
      officialUl.appendChild(officialLi)
      officeLi.appendChild(officialUl)

      officeTemplate.querySelector`#office-list`.appendChild(officeLi)
    }
  }
  const section = document.querySelector('section')
  while (section.firstChild) {
    section.removeChild(section.firstChild);
  }

  section.appendChild(officeTemplate)
}

async function goToChannel(e) {
  const channelName = e.target.classList.value.replace(' channel', '')
  let newURL = ''
  const channelId = e.target.dataset.channelId
  switch (channelName) {
    case 'GooglePlus':
      newURL = `https://plus.google.com/${channelId}`
      break;
    case 'Facebook':
      newURL = `https://www.facebook.com/${channelId}`
    break;
      case 'Twitter':
      newURL = `https://twitter.com/${channelId}`
      break;
    case 'YouTube':
      newURL = `https://www.youtube.com/${channelId}`
      break;
    default:
      break;
  }
  window.open(newURL, '_blank');

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

async function loadRepresenitives() {
  const addressValue = localStorage.getItem('address') || document.querySelector('input#address').value
  if(!addressValue) return
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


export { 
  loadRepresenitives,
  handleScroll, 
}



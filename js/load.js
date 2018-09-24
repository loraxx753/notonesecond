import { handleResponse } from './functions.js'

async function load(e) {
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
export default load
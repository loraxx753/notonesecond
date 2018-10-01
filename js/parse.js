
export const parseArray = async (array, propForArray) => {
  const response =  {}

  for(let item of array) {
    item.key = Object.keys(response).length
    const name = item[propForArray]
    response[name] = item
  }

  return response
}

export const parseObject = async (array, propForArray) => {
  const response = {}
  for(let key in array) {
    const name = array[key][propForArray]
    response[name] = ({
      key,
      ...array[key]
    })
  }

  return response
}


export const parseOffices = (offices, officials, divisions) => {
    const response = offices
    for(let officeName in offices) {
      const office = offices[officeName]
      office.officials = {}
      office.divisions = {}
      for(let officialId of office.officialIndices) {
        const name = officials[officialId].name
        office.officials[name] = officials[officialId]
      }
      for(let divisionId in divisions) {
        const name = divisions[divisionId].name
        office.divisions[name] = divisions[divisionId]
      }
    }
    return response
}


export const parseDivisions = (divisions, offices) => {
    const response = divisions
    for(let divisionName in divisions) {
      const division = divisions[divisionName]
      for(let officeId in division.officeIndices) {
        response[divisionName].offices = {}
        const name = offices[officeId].name
        response[divisionName].offices[name] = offices[officeId]
      }
    }
    return response
}

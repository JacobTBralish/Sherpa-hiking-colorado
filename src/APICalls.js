import COLatLong from './data.json'
import axios from 'axios';

let hikingProjectKey = process.env.HIKING_PROJECT_API_KEY

export const getAllTrails = async () => {
let loopedTrails = [];
for(let i = 0 ; i < COLatLong.length ; i++){
    var response = await axios.get(`https://www.hikingproject.com/data/get-trails?lat=${(COLatLong[i].lat)}&lon=${COLatLong[i].long}&maxDistance=50&maxResults=500&key=${hikingProjectKey}`)
        var { trails } = response.data
        // console.log('trails: ', trails[i].imgSmall);
        if (trails.length > 0){
            trails.filter(trail => {
                if (trail.imgMedium || trail.imgSmall || trail.imgSmallMed || trail.imgSqSmall){
                    loopedTrails.push(trail)
                }
            })
        }
    }
    return loopedTrails
}

export const getTrailsNearCity = async (lat, long) => {
    let fixedTrails = [];
    let response = await axios.get(`https://www.hikingproject.com/data/get-trails?lat=${lat}&lon=${long}&maxDistance=15&maxResults=500&key=${hikingProjectKey}`)
    let { trails } = response.data;
    console.log('trails: ', trails);
    trails.filter(trail => {
        if (trail.imgMedium || trail.imgSmall || trail.imgSmallMed || trail.imgSqSmall){
            fixedTrails.push(trail)
        }
    })
return fixedTrails
}

export const fetchByGeoLocation = async (lat,long) => {
    let trailsNearBy = [];
      let response = await axios.get(`https://www.hikingproject.com/data/get-trails?lat=${lat}&lon=${long}&maxDistance=50&maxResults=500&key=${hikingProjectKey}`);
      var { trails } = response.data
      if (trails.length > 0){
          trails.filter(trail => {
              if (trail.imgMedium || trail.imgSmall || trail.imgSmallMed || trail.imgSqSmall){
                  trailsNearBy.push(trail)
              }
          })
      } else {
          return 'Sorry! It looks like there are no hiking trails near you.'
      }
      return trailsNearBy
}

export const fetchSavedTrails = async (userId) => {
    let response = await axios.get(`/api/saveforlater/${userId}`);
    return response.data
    }


export const fetchVisitedTrails = async (userId) => {
    let response = await axios.get(`/api/visited/${userId}`);
    return response.data
}
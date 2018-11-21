import COLatLong from './data.json'
import axios from 'axios';

export const getAllTrails = async () => {
let loopedTrails = [];
for(let i = 0 ; i < COLatLong.length ; i++){
    var response = await axios.get(`https://www.hikingproject.com/data/get-trails?lat=${(COLatLong[i].lat)}&lon=${COLatLong[i].long}&maxDistance=50&maxResults=500&key=200356963-c67e8738e2f605aeb5bcc2a5ef5f6375`)
        var { trails } = response.data
        if (trails.length > 0){
            trails.filter(trail => {
                if (trail.imgMedium || trail.imgSmall || trail.imgSmallMed || trail.imgSqSmall){
                    loopedTrails.push(trail)
                }
                return loopedTrails
            })
        }
    }
    return loopedTrails
}

export const getTrailsNearCity = async (lat, long) => {
    let fixedTrails = [];
    let response = await axios.get(`https://www.hikingproject.com/data/get-trails?lat=${lat}&lon=${long}&maxDistance=15&maxResults=500&key=200356963-c67e8738e2f605aeb5bcc2a5ef5f6375`)
    let { trails } = response.data;
    trails.filter(trail => {
        if (trail.imgMedium || trail.imgSmall || trail.imgSmallMed || trail.imgSqSmall){
            fixedTrails.push(trail)
        }
        return fixedTrails
    })
return fixedTrails
}

export const fetchByGeoLocation = async (lat,long) => {
    let trailsNearBy = [];
      let response = await axios.get(`https://www.hikingproject.com/data/get-trails?lat=${lat}&lon=${long}&maxDistance=25&maxResults=500&key=200356963-c67e8738e2f605aeb5bcc2a5ef5f6375`);
      var { trails } = response.data
      if (trails.length > 0){
          trails.filter(trail => {
              if (trail.imgMedium || trail.imgSmall || trail.imgSmallMed || trail.imgSqSmall){
                  trailsNearBy.push(trail)
              }
              return trailsNearBy
          })
      } else {
          return 'Sorry! It looks like there are no hiking trails near you.'
      }
      return trailsNearBy
}

export const fetchSavedTrails = async (userId) => {
    let response = await axios.get(`/api/saveforlater/${userId}`);
    if (response.data.length > 0){
        return response.data
        } else {
            return "There is nothing here to see!"
        }
    }


export const fetchVisitedTrails = async (userId) => {
    let response = await axios.get(`/api/visited/${userId}`);
    if (response.data.length > 0){
        return response.data
        } else {
            return "There is nothing here to see!"
        }
    }

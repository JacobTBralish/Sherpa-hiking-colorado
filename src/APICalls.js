import COLatLong from './data.json'
import axios from 'axios';

export const getAllTrails = async () => {
let loopedTrails = [];
for(let i = 0 ; i < COLatLong.length ; i++){
    var response = await axios.get(`https://www.hikingproject.com/data/get-trails?lat=${(COLatLong[i].lat)}&lon=${COLatLong[i].long}&maxDistance=25&maxResults=500&key=200356963-c67e8738e2f605aeb5bcc2a5ef5f6375`)
        var { trails } = response.data
        // console.log('trails: ', trails[i].imgSmall);
        if (trails.length > 0){
            // if(trails[i].imgMedium === true || trails[i].imgSmall === true || trails[i].imgSmallMed === true || trails[i].imgSqSmall === true){

            loopedTrails.push(...trails)
        // }
        }
    }
    return loopedTrails
}

export const getTrailsNearCity = async (lat, long) => {
    let response = await axios.get(`https://www.hikingproject.com/data/get-trails?lat=${lat}&lon=${long}&maxDistance=50&maxResults=500&key=200356963-c67e8738e2f605aeb5bcc2a5ef5f6375`)
    let { trails } = response.data;
    console.log('trails: ', trails);
        return trails
}
import axios from 'axios';

const initialState = {
    user: [],
    isLoading: false,
    position: [],
    chosenTrail:[],
    trailId: '',
    trailsList: [],
    trails: [],
    trail: []
}

const LOGGED_IN = 'LOGGED_IN';
const LOGGED_OUT = 'LOGGED_OUT';

const FOUND_LOCATION ='FOUND_LOCATION';

const CHOSEN_TRAIL = 'CHOSEN_TRAIL';
const GET_TRAIL = 'GET_TRAIL';

const POST_VISITED_TRAIL = 'POST_VISITED_TRAIL';

const SAVE_FOR_LATER = 'SAVE_FOR_LATER';

export default function reducer (state = initialState, action){
    
    switch(action.type){
        case `${LOGGED_IN}_FULFILLED`:
            return {...state, user: action.payload}
        case LOGGED_OUT:
            return {...state, user: null}
        case FOUND_LOCATION:
            return {...state, latitude: action.payload.lat, longitude: action.payload.long}
        case GET_TRAIL:
            return {...state, chosenTrail: action.payload}
        case CHOSEN_TRAIL:
            return {...state, trailId: action.payload}
        case POST_VISITED_TRAIL:
            return {...state, trail:action.payload}
        case SAVE_FOR_LATER:
            return {...state, trail:action.payload}
    default:
    return state
    }
}

//----------------------------------------------------------------------GET INFO--------------------------------------------------------------\\


export function getUser(){
    return {
        type: LOGGED_IN,
        payload: axios.get('/api/user-data').then(response => {
            return response.data
            }).catch(error => {
          
            })
        }
    }
    
export function logOut(){
    return {
        type: LOGGED_OUT
    }
}

export function getTrail(chosenTrail){
return {
        type: GET_TRAIL,
        payload: chosenTrail
    }
}

export function chooseTrail(trailId) {
    // 
    return {
        type: CHOSEN_TRAIL,
        payload: trailId
    }
}

export function findGeo(lat, long) {
    return {
        type: FOUND_LOCATION,
        payload: {lat, long}
    }
}
// //----------------------------------------------------------------------VISITED--------------------------------------------------------------\\

export function postVisitedTrail(userId, trailId, trailName, trailImage, trailLocation, trailDifficulty){
    let trail = axios.post(`/api/visited/${trailId}`, {userId, trailId, trailName, trailImage, trailLocation, trailDifficulty}).then(response => {
        console.log('response: ', response);
        return response.data
    })
return {
    type: POST_VISITED_TRAIL,
    payload: trail
    }
}

// //----------------------------------------------------------------------SAVED--------------------------------------------------------------\\

export function saveForLater(userId, trailId, trailName, trailImage, trailLocation, trailDifficulty){
    let trail = axios.post(`/api/saveforlater/${trailId}`, {userId, trailId, trailName, trailImage, trailLocation, trailDifficulty}).then(response => {
        console.log('response: ', response);
        return response.data
    })
return {
    type: SAVE_FOR_LATER,
    payload: trail
    }
}



// export function getVisitedTrails(visited){
// return {
//     type: GET_VISITED_TRAIL,
//     payload: visited
//     }
// }

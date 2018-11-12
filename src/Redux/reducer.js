import axios from 'axios';

const initialState = {
    user: [],
    profile: [],
    isLoading: false,
    latitude: '',
    longitude: '',

    // chosenCity: '',
    chosenTrail:[],
    oneTrail:[],
    trailId: '',
    // citiesList: [],
    trailsList: [],
    // trailReviews: [],

    // latitude: '',
    // longitude: '',

}

const LOGGED_IN = 'LOGGED_IN';
const LOGGED_OUT = 'LOGGED_OUT';
const FOUND_LOCATION ='FOUND_LOCATION';

// const CHOSEN_CITY = 'CHOSEN_CITY';
const CHOSEN_TRAIL = 'CHOSEN_TRAIL';

// const GET_CITIES = 'GET_CITIES';
// const GET_TRAILS = 'GET_TRAILS';
const GET_TRAIL = 'GET_TRAIL';

// const GET_VISITED_TRAIL = 'GET_VISITED_TRAIL';
// const POST_VISITED_TRAIL = 'POST_VISITED_TRAIL';
// const INCREMENT_VISITED = 'INCREMENT_VISITED';

// const GET_TRAIL_REVIEWS = 'GET_TRAIL_REVIEWS';
// const POST_TRAIL_REVIEWS = 'POST_TRAIL_REVIEWS';
// const DELETE_REVIEW = 'DELETE_REVIEW';

// const GET_PROFILE = 'GET_PROFILE';
// const POST_PROFILE = 'POST_PROFILE';
// const EDIT_PROFILE = 'EDIT_PROFILE';


export default function reducer (state = initialState, action){
    
    switch(action.type){
        case `${LOGGED_IN}_FULFILLED`:
            return {...state, user: action.payload}
        case LOGGED_OUT:
            return {...state, user: null}
        // case CHOSEN_STATE:
        //     return {...state, chosenState: action.payload}
        // case CHOSEN_CITY:
        //     return {...state, chosenCity: action.payload}
        // case GET_STATES + `_FULFILLED`:
        //     return {...state, statesList: action.payload}
        // case GET_CITIES + `_FULFILLED`:
        //     return {...state, citiesList: action.payload}
        // case `${GET_TRAILS}_PENDING`:
        //     return {...state, isLoading: true}
        // case `${GET_TRAILS}_FULFILLED`:
        //     return {...state, trailsList: action.payload, isLoading: false}


        case FOUND_LOCATION:
            return {...state, latitude: action.payload.lat, longitude: action.payload.long}
        case GET_TRAIL:
            return {...state, chosenTrail: action.payload}
        case CHOSEN_TRAIL:
            return {...state, trailId: action.payload}
        // case GET_TRAIL_REVIEWS:
        //     return {...state, trailReviews: action.payload}
        // case POST_TRAIL_REVIEWS:
        //     return {...state, trailReviews: action.payload}
        // case DELETE_REVIEW:
        //     return {...state, trailReviews: action.payload}

        // case GET_VISITED_TRAIL:
        //     return {...state, visited: action.payload}
        // case POST_VISITED_TRAIL:
        //     return {...state, visited: action.payload}
        // case INCREMENT_VISITED:
        //     return {...state, visitCount: action.payload}




        // case GET_PROFILE + `_FULFILLED`:
        //     return {...state, profile: action.payload}
        // case POST_PROFILE + `_FULFILLED`:
        //     return {...state, profile: action.payload}
        // case EDIT_PROFILE + `_FULFILLED`:
        //     return {...state, profile: action.payload}

            // return {...state, experience: action.payload}
            
            
    //  case LOGGED_IN:
    //         return {...state, user: action.payload}
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

// export function chooseState(item) {
//     // 
//     return {
//         type: CHOSEN_STATE,
//         payload: item
//     }
// }

// export function chooseCity(item) {
//     // 
//     return {
//         type: CHOSEN_CITY,
//         payload: item
//     }
// }

// export function getTrailReviews(trailReviews){
//     // 
// return {
//         type: GET_TRAIL_REVIEWS,
//         payload: trailReviews
//     }
// }

// export function postTrailReview(trailReviews){
//     // 
// return {
//         type: POST_TRAIL_REVIEWS,
//         payload: trailReviews
//     }
// }

// export function deleteReview(trailReviews){
//     
// return {
//         type: DELETE_REVIEW,
//         payload: trailReviews
//     }
// }



// //----------------------------------------------------------------------VISITED--------------------------------------------------------------\\



// export function postVisitedTrail(visited){
// return {
//     type: POST_VISITED_TRAIL,
//     payload: visited
//     }
// }

// export function getVisitedTrails(visited){
// return {
//     type: GET_VISITED_TRAIL,
//     payload: visited
//     }
// }

// export function incrementVisited(visited){
// return {
//     type: INCREMENT_VISITED,
//     payload: visited
//     }
// }


// // export function visitedTrail(visited){
// // return {
// //     type: VISITED_TRAIL,
// //     payload: visited
// //     }
// // }


// //----------------------------------------------------------------------LOGIN--------------------------------------------------------------\\


// export function logIn(user){
//     
//     return {
//         type: LOGGED_IN,
//         payload: user
//     }
// }

// export function logOut(){
//     return {
//         type: LOGGED_OUT
//     }
// }



// //----------------------------------------------------------------------PROFILE INFO--------------------------------------------------------------\\

// export function getProfile(id){
//     
//     return {
//         type: GET_PROFILE,
//         payload: axios.get(`/api/profile/${ id }`).then(response => { 
//             
//             
//             return response.data
//         })
//     }
// }

// export function postProfile(id, profileId, profilePic, bio, city, profileState, firstName, lastName, experience ){
//     // 
//     return {
//         type: POST_PROFILE,
//         payload: axios.post(`/api/profile/${ id }`, { profileId, profilePic, bio, city, profileState, firstName, lastName, experience }).then(response => {
//             // 
//             return response.data;
//         }).catch(error => {
//             
//         })
//     }
// }

// export function editProfile(id, profilePic, bio, city, profileState, lastName, experience){
//     // 
//     return {
//         type: POST_PROFILE,
//         payload: axios.put(`/api/profile/${ id }`, {profilePic, bio, city, profileState, lastName, experience}).then(response => {
//             
//             return response.data;
//         })
//     }
// }








import axios from "axios";

const initialState = {
  user: [],
  isLoading: false,
  chosenTrail: [],
  trail: [],
  reviews: []
};

const LOGGED_IN = "LOGGED_IN";
const LOGGED_OUT = "LOGGED_OUT";
const SAVE_NEW_USER_INFO = "SAVE_NEW_USER_INFO";

const GET_REVIEWS = "GET_REVIEWS";
const POST_REVIEW = "POST_REVIEW";
const DELETE_REVIEW = "DELETE_REVIEW";
const EDIT_REVIEW = "EDIT_REVIEW";

const CHOSEN_TRAIL = "CHOSEN_TRAIL";
const GET_TRAIL = "GET_TRAIL";

const POST_VISITED_TRAIL = "POST_VISITED_TRAIL";
const DELETE_USER_TRAIL = "DELETE_USER_TRAIL";

const SAVE_FOR_LATER = "SAVE_FOR_LATER";

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case `${LOGGED_IN}_FULFILLED`:
      return { ...state, user: action.payload };
    case LOGGED_OUT:
      return { ...state, user: null };
    case `${SAVE_NEW_USER_INFO}_FULFILLED`:
      return { ...state, user: action.payload };
    case GET_TRAIL:
      return { ...state, chosenTrail: action.payload };
    case CHOSEN_TRAIL:
      return { ...state, trailId: action.payload };
    case `${POST_VISITED_TRAIL}_FULFILLED`:
      return { ...state, trail: action.payload };
    case `${SAVE_FOR_LATER}_FULFILLED`:
      return { ...state, trail: action.payload };
    case `${DELETE_USER_TRAIL}_FULFILLED`:
      return { ...state, trail: action.payload };
    case `${GET_REVIEWS}_FULFILLED`:
      return { ...state, reviews: action.payload };
    case `${POST_REVIEW}_FULFILLED`:
      return { ...state, reviews: action.payload };
    case `${DELETE_REVIEW}_FULFILLED`:
      return { ...state, reviews: action.payload };
    case `${EDIT_REVIEW}_FULFILLED`:
      return { ...state, reviews: action.payload };
    default:
      return state;
  }
}

//----------------------------------------------------------------------GET INFO--------------------------------------------------------------\\

export function getUser() {
  return {
    type: LOGGED_IN,
    payload: axios
      .get("/api/user-data")
      .then(response => {
        return response.data;
      })
      .catch(error => {})
  };
}

export function logOut() {
  return {
    type: LOGGED_OUT
  };
}

export function getTrail(chosenTrail) {
  return {
    type: GET_TRAIL,
    payload: chosenTrail
  };
}

export function chooseTrail(trailId) {
  //
  return {
    type: CHOSEN_TRAIL,
    payload: trailId
  };
}

// //----------------------------------------------------------------------VISITED--------------------------------------------------------------\\

export function postVisitedTrail(
  userId,
  trailId,
  trailName,
  trailImage,
  trailLocation,
  trailDifficulty
) {
  let trail = axios
    .post(`/api/visited/${trailId}`, {
      userId,
      trailId,
      trailName,
      trailImage,
      trailLocation,
      trailDifficulty
    })
    .then(response => {
      return response.data;
    });
  return {
    type: POST_VISITED_TRAIL,
    payload: trail
  };
}

// //----------------------------------------------------------------------SAVED--------------------------------------------------------------\\

export function saveForLater(
  userId,
  trailId,
  trailName,
  trailImage,
  trailLocation,
  trailDifficulty
) {
  let trail = axios
    .post(`/api/saveforlater/${trailId}`, {
      userId,
      trailId,
      trailName,
      trailImage,
      trailLocation,
      trailDifficulty
    })
    .then(response => {
      return response.data;
    });
  return {
    type: SAVE_FOR_LATER,
    payload: trail
  };
}

// //----------------------------------------------------------------------USER INFO--------------------------------------------------------------\\

export function deleteUserTrail(type, usersTrailId, userId) {
  let trail = axios
    .delete(`/api/${type}/userstrail?id=${usersTrailId}`, { userId })
    .then(response => {
      return response.data;
    });
  return {
    type: DELETE_USER_TRAIL,
    payload: trail
  };
}

// export function deleteReview(trailId, reviewId){
//     let reviews = axios.delete(`/api/trailreview/${trailId}?reviewId=${reviewId}`).then((response) => {
//         return response.data
//     })
// return {
//     type: DELETE_REVIEW,
//     payload: reviews
//     }
// }

// export function saveUserChanges(userId, firstName, lastName, email){
//     let user = axios.put(`/api/updateuser/${userId}`, { firstName, lastName, email }).then(response => {
//
//         return response.data
//     })
//     return {
//         type: SAVE_NEW_USER_INFO,
//         payload: user
//     }
// }

// //----------------------------------------------------------------------REVIEWS--------------------------------------------------------------\\

export function getReviews(trailId) {
  let reviews = axios.get(`/api/trailreview/${trailId}`).then(response => {
    return response.data;
  });
  return {
    type: GET_REVIEWS,
    payload: reviews
  };
}

export function postReview(
  trailId,
  trailName,
  trailImg,
  userSubmittedImage1,
  userSubmittedImage2,
  title,
  reviewBody,
  rating,
  userId,
  userImage,
  userName
) {
  const date = new Date();
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  const time = `${
    months[date.getMonth()]
  } ${date.getDate()}, ${date.getFullYear()}`;

  let reviews = axios
    .post(`/api/trailreview/${trailId}`, {
      trailId,
      trailName,
      trailImg,
      userSubmittedImage1,
      userSubmittedImage2,
      title,
      time,
      reviewBody,
      rating,
      userId,
      userImage,
      userName
    })
    .then(response => {
      return response.data;
    });
  return {
    type: POST_REVIEW,
    payload: reviews
  };
}

export function deleteReview(trailId, reviewId) {
  let reviews = axios
    .delete(`/api/trailreview/${trailId}?reviewId=${reviewId}`)
    .then(response => {
      return response.data;
    });
  return {
    type: DELETE_REVIEW,
    payload: reviews
  };
}

export function editReview(
  trailId,
  userSubmittedImage1,
  userSubmittedImage2,
  title,
  reviewBody,
  rating,
  reviewId
) {
  let reviews = axios
    .put(`/api/trailreview/${trailId}`, {
      userSubmittedImage1,
      userSubmittedImage2,
      title,
      reviewBody,
      rating,
      reviewId
    })
    .then(response => {
      return response.data;
    });
  return {
    type: EDIT_REVIEW,
    payload: reviews
  };
}

// //----------------------------------------------------------------------CLOUDINARY--------------------------------------------------------------\\

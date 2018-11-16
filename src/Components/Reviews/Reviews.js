import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import './Reviews.scss';

class Reviews extends Component {
    constructor(props) {
        super(props);
            this.state = {
                title: '',
                reviewBody: '',
                rating: 0,
                isLoading: false,
                reviews: []

            }
    }
    
    componentDidMount() {
        this.setState({isLoading: true})
        axios.get(`/api/trail/${this.props.match.params.id}`).then(response => {
            this.setState({
                reviews: response.data,
                isLoading:false
            })
            console.log('response.data: ', response.data);
        }).catch(error => {
        console.log(error, 'Error getting trail.')
    })
}

    handlePost = ( trailName, trailImg, title, reviewBody, rating, userId, e ) => {
        console.log("work----------------------------------",trailName, trailImg, title, reviewBody, rating, userId, e)
        e.preventDefault();
    const date = new Date();
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    const time = `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
    //    console.log('DATE',time)
    //    console.log(title, time, reviewBody, rating, userId)

        axios.post(`/api/trail/${this.props.match.params.id}`, { trailName, trailImg, title, time, reviewBody, rating, userId} ).then(response => {
            console.log( response.data )
            this.props.postTrailReview(response.data);
        }).catch(error => {
            console.log(error, 'Error with posting your review')
        })
    }


    handleDelete = (reviewId) => {
        console.log(reviewId)
        axios.delete(`/api/trail/${this.props.match.params.id}?reviewId=${reviewId}`).then((response) => {
            this.props.deleteReview(response.data)
        }).catch(error => {
                 console.log(error, 'Error on the front end delete')
         })
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
     }

    render() { 
    //     const data = this.props.trailReviews.length > 0 ? this.props.trailReviews[0]: {}
        
        let{ trailReviews, user, chosenTrail, render, trailName, imgSmallMed } = this.props;
        let { title, reviewBody, rating, isLoading, reviews } = this.state;
        // console.log(chosenTrail);


        // let mappedTrailReviews = reviews.map((review, index) => {
        //     return (
        //         <div key={index} className='reviewInfo'>
        //             <p className='reviewText'>{review.name}</p>
        //             <p className='reviewText'>{review.title}</p>
        //             <p className='reviewText'>{review.rating}</p>
        //             <p className='reviewText'>{review.body}</p>
        //             <div className='trashButtonAnimation'>
        //                 <button className='trashButton' onClick={() => this.handleDelete(review.id)}><i class="fas fa-trash"></i></button>
        //             </div>
        //         </div>
        //     )
        // })


        return ( 
            <div className='reviewContainer'>
                <div className='reviewFormContainer'>                         
                    <form className='reviewForm'>
                        <div className='reviewTitleContainer'>
                            <label className='reviewLabel' htmlFor='title'>Title: </label>
                            <input onChange={this.handleChange} name='title'></input>
                        </div>
                        
                        <div className='reviewRatingContainer'>
                            <label className='reviewLabel' htmlFor='rating'>Rating:</label>
                            <div className='selectContainer'>
                                <select className='rating' name='rating' onChange={this.handleChange}>
                                    <option>Select a rating</option>
                                    <option value={1}>1</option>
                                    <option value={1.5}>1.5</option>
                                    <option value={2}>2</option>
                                    <option value={2.5}>2.5</option>
                                    <option value={3}>3</option>
                                    <option value={3.5}>3.5</option>
                                    <option value={4}>4</option>
                                    <option value={4.5}>4.5</option>
                                    <option value={5}>5</option>
                                </select>
                            </div>
                        </div>
                        <div className='reviewBodyContainer'>
                            <label className='reviewLabel' htmlFor='reviewBody'>Review: </label>
                            <textarea name='reviewBody' className='reviewInput' onChange={this.handleChange} />
                        </div>

                        <div className='reviewSubmitButtonContainer'>
                            <button className='submitButton' type='submit' onClick={(e) => { this.handlePost( trailName, imgSmallMed, title, reviewBody, rating, user.id, e )}}>Submit</button>
                        </div>
                    {/* {user && user.profileFinished ? */}

                    {/* : */}
                    {/* // <button className='postButton'  onClick={() => {alert('You are not logged in! Please log in or create an account to post a review.')}}>Post Review</button> */}
                    
                    </form>
                </div>

                <div className='leftReviewsContainer'>

                    <h1 className='reviewsTitle'>See what others thought about the trail›</h1>
                    {/* <div>{mappedTrailReviews}</div> */}
                </div>
            </div>
         );
    }
}

const mapStateToProps = state => {
    return{
        // trailReviews:state.trailReviews,
        // trailId: state.trailId,
        user: state.user,
        chosenTrail: state.chosenTrail,

    }
}
 
const mapDispatchToProps = {
    // getTrailReviews,
    // deleteReview,
    // postTrailReview,

}


export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Reviews));
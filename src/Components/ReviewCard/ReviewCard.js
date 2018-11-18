import React, { Component } from 'react';
import EditReviewForm from '../EditReviewForm/EditReviewForm';
import axios from 'axios';

import './ReviewCard.scss';

class EditReviewCard extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            toggle: false,
         }
    }

    handleToggle = () => {
        this.setState((prevState) =>{
        //  console.log('prevstate', prevState)
            return {
                toggle: !prevState.toggle,
            }
         })
     }



    render() { 
        return ( 
            <div className='reviewContainer'>
            {!this.state.toggle ?
                <div className='reviewSubContainer'>
                    <div className='authorImageContainer'>
                        <img className='authorImage' src={this.props.authorImage}/>
                    </div>
                    <div className='reviewInfoBox'>
                        <div className='reviewInfo'>
                            <div className='reviewTopContainer'>
                                <div className='titleContainer'>
                                    <label htmlFor='title'>Title:</label>
                                    <p id='title' className='reviewText'>{this.props.title}</p>
                                </div>
                                <div className='ratingContainer'>
                                    <label htmlFor='rating'>Rating:</label>
                                    <p id='rating' className='reviewText'>{`${this.props.rating}/5`}</p>
                                </div>
                            </div>
                            <label htmlFor='body'></label>
                            <p id='body' className='reviewText'>{this.props.body}</p>
                        </div>
                        {this.props.user.id === this.props.authorId ?
                        <div className='reviewButtonCluster'>
                            <button id='trashButton' onClick={() => this.props.deleteReview(this.props.trailId, this.props.reviewId)}><i className="fas fa-trash"></i></button>
                            <button id='trashButton' onClick={() => this.handleToggle()}><i className="fas fa-edit"></i></button>
                        </div>
                        :
                        null
                        }
                    </div>
                </div>
                :
                        <>
                            <EditReviewForm />
                        </>
                        }
            </div>
         );
    }
}
 
export default EditReviewCard;
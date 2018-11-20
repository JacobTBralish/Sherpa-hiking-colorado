import React, { Component } from 'react';
import EditReviewForm from '../EditReviewForm/EditReviewForm';
import { connect } from 'react-redux';
import { deleteReview } from '../../Redux/reducer';

import './ReviewCard.scss';

class ReviewCard extends Component {
    constructor(props) {
        super(props);
        this.state = { toggle: false }
    }

    handleToggle = () => {
        this.setState((prevState) =>{
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
                        <img className='authorImage' alt='' src={this.props.authorImage}/>
                    </div>
                    <div className='reviewInfoBox'>
                        <div className='reviewInfo'>
                            <div className='reviewTopContainer'>
                                <div className='titleCluster'>
                                    <div className='titleContainer'>
                                        <label htmlFor='title'>Title:</label>
                                        <p id='title' className='reviewText'>{this.props.title}</p>
                                    </div>
                                    <div className='ratingContainer'>
                                        <label htmlFor='rating'>Rating:</label>
                                        <p id='rating' className='reviewText'>{`${this.props.rating}/5`}</p>
                                    </div>
                                </div>
                                <div className='dateContainer'>
                                    <p id='date' className='dateText'>{this.props.time}</p>
                                </div>
                            </div>
                            <label htmlFor='body'></label>
                            <p id='body' className='reviewText'>{this.props.body}</p>
                        </div>
                        {this.props.user.id === this.props.authorId ?
                        <div className='reviewButtonCluster'>
                            <button id='iconButton' onClick={() => this.props.deleteReview(this.props.trailId, this.props.reviewId)}><i className="fas fa-trash"></i></button>
                            <button id='iconButton' onClick={() => this.handleToggle()}><i className="fas fa-edit"></i></button>
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
 
const mapStateToProps = state => {
    return {
        user: state.user,
    }
} 

const mapDispatchToProps = {
    deleteReview
}

export default connect(mapStateToProps, mapDispatchToProps)(ReviewCard);
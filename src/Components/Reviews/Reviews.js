import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { getReviews, deleteReview } from "../../Redux/reducer";
import "./Reviews.scss";
import ReviewCard from "../ReviewCard/ReviewCard";

class Reviews extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: 0,
      isLoading: false,
      reviews: []
    };
  }

  async componentWillMount() {
    await this.props.getReviews(this.props.match.params.id);
  }

  render() {
    let { reviews } = this.props;

    let mappedTrailReviews = reviews.map((review, index) => {
      return (
        <ReviewCard
          key={index}
          title={review.title}
          body={review.body}
          rating={review.rating}
          reviewId={review.id}
          time={review.time}
          authorId={review.author_id}
          authorImage={review.author_image}
          authorName={review.author_name}
          trailId={review.review_trail_id}
          userSubmittedImage1={review.user_submitted_image1}
          userSubmittedImage2={review.user_submitted_image2}
          deleteReview={this.props.deleteReview}
          editReview={this.props.editReview}
          user={this.props.user}
        />
      );
    });

    return (
      <div className="reviewContainer">
        <div className="mainReviewsContainer">
          <div className="reviewsTitleContainer">
            <h1 className="reviewsTitle">
              See what others thought about the trail
            </h1>
          </div>
          <div>{mappedTrailReviews}</div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    reviews: state.reviews
  };
};

const mapDispatchToProps = {
  getReviews,
  deleteReview
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Reviews)
);

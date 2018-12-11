import React, { Component } from "react";
import TrailCard from "../TrailCard/TrailCard";
import Pagination from "react-js-pagination";
import { Link, withRouter } from "react-router-dom";
import { chooseTrail } from "../../Redux/reducer";
import LoadingSpinner from "../../LoadingSpinner";
import { connect } from "react-redux";

class GeoLocation extends Component {
  constructor() {
    super();
    this.state = {
      trailsNearBy: [],
      isLoading: true,
      error: null,
      activePage: 1,
      itemsPerPage: 26,
      latitude: "",
      longitude: ""
    };
  }

  async componentDidMount() {
    const { fetch } = this.props;
    console.log("this.props: ", this.props);
    console.log("fetch: ", fetch);
    // Nothing is in local storage, so we need to fetch
    try {
      let fetchedTrails = await fetch(
        this.props.location.state.lat,
        this.props.location.state.long
      );
      console.log("trails: ", fetchedTrails);
      this.setState({
        trailsNearBy: fetchedTrails,
        isLoading: false
      });
    } catch (error) {
      throw new Error("Cannot get trails near you!");
    }
  }

  render() {
    console.log(this.props);
    console.log("this: ", this);
    let { trailsNearBy, error, isLoading } = this.state;
    console.log("trailsNearBy: ", trailsNearBy);

    let sortedTrails = trailsNearBy.sort((a, b) => {
      var nameA = a.name.toUpperCase();
      var nameB = b.name.toUpperCase();
      return nameA < nameB ? -1 : nameA > nameB ? 1 : 0;
    });
    //handles the splicing of data for pagination
    let activePageIndex = parseInt(this.state.activePage, 10);
    let itemsPerPageIndex = parseInt(this.state.itemsPerPage, 10);

    let indexOfLastTrail = activePageIndex * itemsPerPageIndex;
    let indexOfFirstTrail = indexOfLastTrail - itemsPerPageIndex;
    let renderedTrails = sortedTrails.slice(
      indexOfFirstTrail,
      indexOfLastTrail
    );

    let mappedTrailsNearBy = renderedTrails.map((trail, i) => {
      return (
        <Link
          key={i}
          onClick={() => chooseTrail(trail.id)}
          to={`/Trail/${trail.id}`}
        >
          <TrailCard {...trail} />
        </Link>
      );
    });

    return (
      <div className="gridwallContainer">
        <div className="gridwallSubContainer">
          <div className="gridwallHeaderContainer">
            <div className="titleImageContainer">
              <img className="titleImage" alt="" src={this.props.image} />
            </div>
            <div className="gridwallTitleContainer">
              <h1 className="gridWallTitle">
                {this.props.city ? this.props.city : "All Trails"}
              </h1>
            </div>
          </div>
          {error ? (
            <div>
              {" "}
              Oh no!There was an error loading the trails.Please try again
              later.{" "}
            </div>
          ) : isLoading || !trailsNearBy.length ? (
            <LoadingSpinner />
          ) : (
            mappedTrailsNearBy
          )}
        </div>
        <div className="paginationContainer">
          <Pagination
            activePage={this.state.activePage}
            itemsCountPerPage={26}
            totalItemsCount={trailsNearBy.length}
            pageRangeDisplayed={5}
            onChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = {
  chooseTrail
};

export default withRouter(
  connect(
    null,
    mapDispatchToProps
  )(GeoLocation)
);

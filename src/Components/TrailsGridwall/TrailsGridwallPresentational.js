import React, { Component } from "react";
import TrailCard from "../TrailCard/TrailCard";
import { Link } from "react-router-dom";
import Pagination from "react-js-pagination";

class TrailsGridwallPresentational extends Component {
  render() {
    let {
      trails,
      chooseTrail,
      listLength,
      activePage,
      handlePageChange,
      city
    } = this.props;
    return (
      <div className="gridwallContainer">
        <div className="gridwallSubContainer">
          <div className="gridwallHeaderContainer">
            <div className="titleImageContainer">
              <img className="titleImage" src={this.props.image} alt="" />
            </div>
            <div className="gridwallTitleContainer">
              <h1 className="gridWallTitle">{city ? city : "All Trails"}</h1>
            </div>
          </div>

          {trails.map((trail, i) => {
            return (
              <Link
                key={i}
                onClick={() => {
                  chooseTrail(trail.id);
                }}
                to={`/Trail/${trail.id}`}
              >
                <TrailCard {...trail} />
              </Link>
            );
          })}
        </div>
        <div className="paginationContainer">
          <Pagination
            activePage={activePage}
            itemsCountPerPage={15}
            totalItemsCount={listLength}
            pageRangeDisplayed={5}
            onChange={handlePageChange}
          />
        </div>
      </div>
    );
  }
}

export default TrailsGridwallPresentational;

// ADD TO CORRECT PLACE TO BE RENDERED
// <TrailsGridwallPresentational
// trails={result}
// chooseTrail={chooseTrail}
// listLength={this.state[name].length}
// activePage={this.state.activePage}
// />

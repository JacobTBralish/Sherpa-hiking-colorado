import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";
import { logOut, getUser } from "../../Redux/reducer";

import "./Nav.scss";

class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggle: false,
      latitude: "",
      longitude: ""
    };
  }

  async componentDidMount() {
    await this.props.getUser();
    navigator.geolocation.getCurrentPosition(
      position => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null
        });
      },
      error => this.setState({ error: error.message }),
      { enableHighAccuracy: false, timeout: 200000, maximumAge: 1000 }
    );
  }

  componentWillMount() {
    window.addEventListener("mousedown", this.handleClick, false);
  }

  componentWillUnmount() {
    window.removeEventListener("mousedown", this.handleClick, false);
  }

  handleClickOutside = () => {
    this.setState({
      toggle: false
    });
  };

  handleClick = e => {
    if (this.node.contains(e.target)) {
      return;
    }
    this.handleClickOutside();
  };

  login = () => {
    const redirectUri = encodeURIComponent(
      `${window.location.origin}/auth/callback`
    );
    window.location = `https://${
      process.env.REACT_APP_AUTH0_DOMAIN
    }/authorize?client_id=${
      process.env.REACT_APP_AUTH0_CLIENT_ID
    }&scope=openid%20profile%20email&redirect_uri=${redirectUri}&response_type=code`;
  };

  logout = () => {
    axios.post("/api/logout").then(res => {
      this.props.logOut(this.props.user);
    });
  };

  render() {
    let { user } = this.props;
    console.log("this.props.history)", this.props.history);
    let { toggle, latitude, longitude } = this.state;

    return (
      <div className="navSubContainer">
        <button onClick={() => this.setState({ toggle: !toggle })}>
          <i className="fas fa-bars" />
        </button>
        <div className="logoContainer">
          <Link className="logoLink" to="/">
            <div className="logo">SHERPA</div>
          </Link>
        </div>

        <nav className={toggle ? "show" : ""}>
          <div ref={node => (this.node = node)} className="rightNavContainer">
            <ul className="rightNavList">
              <li onClick={() => this.handleClickOutside()}>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="">Trails</Link>
                <ul>
                  <li onClick={() => this.handleClickOutside()}>
                    <Link className="rightNavListItem" to="/All Trails">
                      All trails
                    </Link>
                  </li>
                  <li onClick={() => this.handleClickOutside()}>
                    <Link
                      className="rightNavListItem"
                      to={{
                        pathname: "/Trails Near Me",
                        state: { lat: latitude, long: longitude }
                      }}
                    >
                      Trails near me
                    </Link>
                  </li>
                  <li>
                    <Link className="rightNavListItem" to="">
                      Trails by city
                    </Link>

                    <ul>
                      <li
                        onClick={() => this.handleClickOutside()}
                        className="rightNavExtraListItemCities"
                      >
                        <Link to="/Trails Near Aspen">Aspen</Link>
                      </li>
                      <li
                        onClick={() => this.handleClickOutside()}
                        className="rightNavExtraListItemCities"
                      >
                        <Link to="/Trails Near Boulder">Boulder</Link>
                      </li>
                      <li
                        onClick={() => this.handleClickOutside()}
                        className="rightNavExtraListItemCities"
                      >
                        <Link to="/Trails Near Breckenridge">Breckenridge</Link>
                      </li>
                      <li
                        onClick={() => this.handleClickOutside()}
                        className="rightNavExtraListItemCities"
                      >
                        <Link to="/Trails Near Colorado Springs">
                          Colorado Springs
                        </Link>
                      </li>
                      <li
                        onClick={() => this.handleClickOutside()}
                        className="rightNavExtraListItemCities"
                      >
                        <Link to="/Trails Near Denver">Denver</Link>
                      </li>
                      <li
                        onClick={() => this.handleClickOutside()}
                        className="rightNavExtraListItemCities"
                      >
                        <Link to="/Trails Near Estes Park">Estes Park</Link>
                      </li>
                      <li
                        onClick={() => this.handleClickOutside()}
                        className="rightNavExtraListItemCities"
                      >
                        <Link to="/Trails Near Leadville">Leadville</Link>
                      </li>
                      <li
                        onClick={() => this.handleClickOutside()}
                        className="rightNavExtraListItemCities"
                      >
                        <Link to="/Trails Near Pagosa Springs">
                          Pagosa Springs
                        </Link>
                      </li>
                      <li
                        onClick={() => this.handleClickOutside()}
                        className="rightNavExtraListItemCities"
                      >
                        <Link to="/Trails Near Rifle">Rifle</Link>
                      </li>
                      <li
                        onClick={() => this.handleClickOutside()}
                        className="rightNavExtraListItemCities"
                      >
                        <Link to="/Trails Near Telluride">Telluride</Link>
                      </li>
                    </ul>
                  </li>
                </ul>
              </li>
              <li onClick={() => this.handleClickOutside()}>
                <Link to="/All Articles">Articles</Link>
              </li>
              {!user ? (
                <li onClick={() => this.login()}>Sign In</li>
              ) : (
                <li>
                  <Link to="">Account</Link>
                  <ul>
                    <li
                      onClick={() => this.handleClickOutside()}
                      className="rightNavExtraListItemCities"
                    >
                      <Link to="/Your Saved Trails">Trails to visit</Link>
                    </li>
                    <li
                      onClick={() => this.handleClickOutside()}
                      className="rightNavExtraListItemCities"
                    >
                      <Link to="/Your Visited Trails">Visited trails</Link>
                    </li>
                    <li
                      id="logoutButton"
                      className="rightNavExtraListItemCities"
                      onClick={() => {
                        this.logout();
                        this.props.history.push("/");
                      }}
                    >
                      Log out
                    </li>
                  </ul>
                </li>
              )}
            </ul>
          </div>
        </nav>
        <div className="searchContainer">
          {/* <input placeholder='Search'></input> */}
          {user ? (
            <h3 id="welcomeName">Hey, {user.first_name}!</h3>
          ) : (
            <h3>Welcome!</h3>
          )}
          <img id="navUserImage" src={user ? user.user_image : null} alt="" />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

const mapDispatchToProps = {
  logOut,
  getUser
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Nav)
);

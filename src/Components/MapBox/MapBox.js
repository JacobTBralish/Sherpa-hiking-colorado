import React, { Component } from "react";
import ReactMapboxGl, { Layer, Feature, Marker } from "react-mapbox-gl";
// import mapboxgl from 'mapbox-gl';
// import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';

const Map = ReactMapboxGl({
  accessToken: process.env.REACT_APP_MAPBOX
});

class MapBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude: "",
      longitude: "",
      error: "",
      isLoading: true
    };
  }

  async componentWillMount() {
    await navigator.geolocation.getCurrentPosition(
      position => {
        console.log("wokeeey");
        console.log(position);
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
  render() {
    const style1 = {
      textAlign: "center",
      height: "20px",
      width: "60px",
      fontSize: "8px",
      color: "red",
      backgroundColor: "rgba(255, 255, 255, 0.5)",
      borderRadius: "0px 30px 30px 30px"
    };

    const style2 = {
      textAlign: "center",
      height: "20px",
      width: "46px",
      fontSize: "10px",
      color: "red",
      backgroundColor: "rgba(255, 255, 255, 0.5)",
      borderRadius: "0px 30px 30px 30px"
    };

    return (
      <>
        <Map
          // eslint-disable-next-line
          style="mapbox://styles/mapbox/dark-v9"
          containerStyle={{
            height: "calc(80vh - 130px)",
            width: "80vw"
          }}
          center={[this.props.long, this.props.lat]}
          zoom={[6]}
        >
          {/* <MapboxDirections /> */}
          <Layer
            type="circle"
            id="marker"
            // layout={{ 'icon-image': 'nature' }}
            paint={{
              "circle-color": "#ff5200",
              "circle-stroke-width": 1,
              "circle-stroke-color": "#fff",
              "circle-stroke-opacity": 1
            }}
          >
            <Feature coordinates={[this.props.long, this.props.lat]} />
            <Feature
              coordinates={[this.state.longitude, this.state.latitude]}
            />
          </Layer>
          {/* trail location marker */}
          <Marker coordinates={[this.props.long, this.props.lat]} anchor="null">
            <div style={style2} /* src={this.props.image} */>
              <p>Trailhead</p>
            </div>
          </Marker>
          {/* current location marker */}
          <Marker
            coordinates={[this.state.longitude, this.state.latitude]}
            anchor="null"
          >
            <div style={style1} /* src={this.props.image} */>
              <p>Current location</p>
            </div>
          </Marker>
        </Map>
      </>
    );
  }
}

export default MapBox;

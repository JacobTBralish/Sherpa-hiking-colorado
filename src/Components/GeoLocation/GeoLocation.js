import React, { Component } from 'react';

class GeoLocation extends Component {
    componentDidMount() {
        navigator.geolocation.getCurrentPosition(
            (position) => {
              console.log("wokeeey");
              console.log(position);
              this.setState({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                error: null,
              });
            },
            (error) => this.setState({ error: error.message }),
            { enableHighAccuracy: false, timeout: 200000, maximumAge: 1000 },
          );
    }
    render() { 
        return ( 
            <div>
            </div>
        );
    }
}
 
export default GeoLocation;

// const GeoLocation = () => {

//     componentDidMount() {
//         navigator.geolocation.getCurrentPosition(
//             (position) => {
//               console.log("wokeeey");
//               console.log(position);
//               this.setState({
//                 latitude: position.coords.latitude,
//                 longitude: position.coords.longitude,
//                 error: null,
//               });
//             },
//             (error) => this.setState({ error: error.message }),
//             { enableHighAccuracy: false, timeout: 200000, maximumAge: 1000 },
//           );
//     }
//     return ( 
//         <div>
//         </div>
//      );
// }
 
// export default GeoLocation;
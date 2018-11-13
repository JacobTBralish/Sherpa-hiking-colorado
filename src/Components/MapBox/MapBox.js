import React from 'react';
import ReactMapboxGl, {Layer, Feature} from 'react-mapbox-gl';
const Map = ReactMapboxGl({
    accessToken: process.env.REACT_APP_MAPBOX
  });

const MapBox = (props) => {
    
    return ( 
        <>
            <Map
                style="mapbox://styles/mapbox/dark-v9"
                containerStyle={{
                height: "calc(100vh - 130px)",
                width: "50vw"
                }}
                center={[props.long, props.lat]}
                zoom={[13]}
            >
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
                <Feature coordinates={[props.long, props.lat]} />
                </Layer>
            </Map>
        </>
     );
}
 
export default MapBox;
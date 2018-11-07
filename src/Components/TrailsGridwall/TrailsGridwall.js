import React, { Component } from 'react';
import axios from 'axios';
import COLatLong from '../../data.json';
import { connect } from 'react-redux';
import TrailCard from '../TrailCard/TrailCard';
// import { getTrails } from '../../Redux/reducer';

class TrailsGridwall extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            trails: [],
            isLoading: true,
            error: null
         }
    }




    componentDidMount() {

        let loopedTrails = [];
        for(let i = 0 ; i < COLatLong.length ; i++){
            axios.get(`https://www.hikingproject.com/data/get-trails?lat=${COLatLong[i].lat}&lon=${COLatLong[i].long}&maxDistance=25&maxResults=500&key=200356963-c67e8738e2f605aeb5bcc2a5ef5f6375`).then((response)=> {
                if (response.data.trails.length > 0){
                loopedTrails.push(...response.data.trails)
                // console.log('loopedTrails: ', loopedTrails);
            }
        })
        }
        axios.all([loopedTrails]).then(axios.spread((trails) => {
            // console.log('trails: ', trails);
            // var result = trails.reduce((unique, o) => {
            //     if(!unique.some(obj => obj.id === o.id)) {
            //       unique.push(o);
            //     }
            //     // return unique;
            // },[]);
            this.setState({ trails, isLoading: false });
     
         })).catch(error => {
             console.log(error);
         })
    }


    render() { 
        const { isLoading, trails, error } = this.state;
        
        if (!trails && isLoading) {
            return <div> Loading... </div>
        }
        
        var mappedTrailCard = trails.map((trail, i) => {
            return <div>
                <p>{trail.name}</p>
            </div>
            {/* <TrailCard {...trail}/> */}
         })
         console.log('HERE IS YOUR TRAILS LIST ------------- ', trails);
        // console.log('HERE IS YOUR TRAILS LIST ------------- ', this.props.trailsList);
        return ( 
        <div>
            {/* {error
            ? <div>Oh no! There was an error loading the trails. Please try again later.</div>
            : (isLoading || !trails.length)
              ? <div>Loading...</div>
              : 
            } */}
            {mappedTrailCard}
            {/* Trails Gridwall */}
        </div> );
    }
}

const mapStateToProps = state => {
    return {
        trailsList: state.trailsList,
    }
} 

const mapDispatchToProps = {
    // getTrails,
}

export default connect(mapStateToProps, mapDispatchToProps)(TrailsGridwall);
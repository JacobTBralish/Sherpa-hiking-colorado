import React, { Component } from 'react';
import TrailCard from '../TrailCard/TrailCard';
import Pagination from 'react-js-pagination';
import {Link} from 'react-router-dom';
import {chooseTrail} from '../../Redux/reducer';
import LoadingSpinner from '../../LoadingSpinner';
import {connect} from 'react-redux';

class GeoLocation extends Component {
    constructor(){
        super();
        this.state = {
            trailsNearBy: [],
            isLoading: true,
            error: null,
            activePage: 1,
            itemsPerPage: 26,
        }
    }



    async componentDidMount() {
        let { fetch } = this.props;
        console.log('fetch: ', fetch);
        try{
            await navigator.geolocation.getCurrentPosition(
                (position) => {
                  console.log("wokeeey");
                  console.log(position);
                  let fetchedTrails = fetch(position.coords.latitude, position.coords.longitude);
                  this.setState({
                    trailsNearBy: fetchedTrails,
                    isLoading: false,
                  });
                }, (error) => this.setState({ error: error.message }),
                    { enableHighAccuracy: false, timeout: 200000, maximumAge: 1000 },
              );
            
        } catch (error) {
              throw(new Error('Cannot get trails near your location!'))
          }
    }


    render() { 
        let { trailsNearBy, error, isLoading } = this.state;
        console.log('trailsNearBy: ', trailsNearBy);

        let sortedTrails = trailsNearBy.sort((a, b) => {
            var nameA = a.name.toUpperCase();
            var nameB = b.name.toUpperCase();
            return (nameA < nameB) ? -1 : (nameA > nameB) ? 1 : 0;
        })
        //handles the splicing of data for pagination
        let activePageIndex = parseInt(this.state.activePage, 10);
        let itemsPerPageIndex = parseInt(this.state.itemsPerPage, 10);
        
        let indexOfLastTrail = activePageIndex * itemsPerPageIndex;
        let indexOfFirstTrail = indexOfLastTrail - itemsPerPageIndex;
        let renderedTrails = sortedTrails.slice(indexOfFirstTrail, indexOfLastTrail);
        
        let mappedTrailsNearBy = renderedTrails.map((trail, i) => {
            return <Link key = {i}onClick = {() => chooseTrail(trail.id)}
            to = {`/Trail/${trail.id}`}>
            <TrailCard { ...trail}/>
            </Link >

})

        return ( 
            <div className = 'gridwallContainer'>
            <div className = 'gridwallSubContainer' >
                <div className = 'gridwallHeaderContainer' >
                <div className='titleImageContainer'>
                    <img className='titleImage' src={this.props.image}></img>
                </div>
                <div className='gridwallTitleContainer'>
                    <h1 className = 'gridWallTitle' >{this.props.city ? this.props.city : "All Trails"}</h1> 
                </div>
            </div> 
                {error
                    ?
                    <div> Oh no!There was an error loading the trails.Please try again later. </div>
                    : (isLoading || trailsNearBy.length) ?
                    <LoadingSpinner />
                    : mappedTrailsNearBy
                    } 
            </div> 
            <div className = 'paginationContainer'>
            <Pagination activePage = {this.state.activePage}
            itemsCountPerPage = {26}
            totalItemsCount = {trailsNearBy.length}
            pageRangeDisplayed = {5}
            onChange = {this.handlePageChange}/>
                </div> 
            </div> 
        );
    }
}

const mapDispatchToProps = {
    chooseTrail
}

export default connect(null, mapDispatchToProps)(GeoLocation);
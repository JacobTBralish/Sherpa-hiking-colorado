import React, {Component} from 'react';
// import axios from 'axios';
// import COLatLong from '../../data.json';
import {connect} from 'react-redux';
import TrailCard from '../TrailCard/TrailCard';
import Pagination from 'react-js-pagination';
import {Link} from 'react-router-dom';
import {chooseTrail} from '../../Redux/reducer';
import LoadingSpinner from '../../LoadingSpinner';

import './Trails.scss';

class TrailsGridwall extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allTrails: JSON.parse(localStorage.getItem("allTrails")) || [],
            trailsNearEstesPark: JSON.parse(localStorage.getItem("estesPark")) || [],
            trailsNearAspen: JSON.parse(localStorage.getItem("aspen")) || [],
            trailsNearTelluride: JSON.parse(localStorage.getItem("telluride")) || [],
            trailsNearColoradoSprings: JSON.parse(localStorage.getItem("coloradoSprings")) || [],
            trailsNearAlamosa: JSON.parse(localStorage.getItem("alamosa")) || [],
            trailsNearLeadville: JSON.parse(localStorage.getItem("leadville")) || [],
            trailsNearDenver: JSON.parse(localStorage.getItem("denver")) || [],
            trailsNearBreckenridge: JSON.parse(localStorage.getItem("breckenridge")) || [],
            trailsNearRifle: JSON.parse(localStorage.getItem("rifle")) || [],
            trailsNearBoulder: JSON.parse(localStorage.getItem("boulder")) || [],
            trailsNearMe: JSON.parse(localStorage.getItem('people')) || [],
            isLoading: true,
            error: null,
            activePage: 1,
            itemsPerPage: 25
        }
    }

    async componentDidMount() {
        const {fetch, name, lat, long} = this.props;
        console.log('fetch: ', fetch);
        // Nothing is in local storage, so we need to fetch
        if (lat && long){
            try {
                let fetchedTrails = await fetch(lat, long);
                console.log('trails: ', fetchedTrails);
                this.setState({
                    [name]: fetchedTrails,
                    isLoading: false
                }, localStorage.setItem([name], JSON.stringify(fetchedTrails)))
            } catch (error) {
                throw (new Error('Cannot get trails near this city!'))
            }
        } else if (!name){
            try {
                let fetchedTrails = await fetch();
                console.log('trails: ', fetchedTrails);
                this.setState({
                    trailsNearMe: fetchedTrails,
                    isLoading: false
                })
            } catch (error) {
                throw (new Error('Cannot get trails near you!'))
            }
        } else if(!this.state[name].length) {
            try {
                let fetchedTrails = await fetch();
                console.log('trails: ', fetchedTrails);
                this.setState({
                    [name]: fetchedTrails,
                    isLoading: false
                }, localStorage.setItem([name], JSON.stringify(fetchedTrails)))
            } catch (error) {
                throw (new Error('Cannot get trails!'))
            }
        }
        // We have everything we need, toggle isLoading to false
        else {
            this.setState({ isLoading: false })
        }
    }

    async componentWillReceiveProps(nextProps) {
        const {fetch, name, lat, long} = nextProps;
        console.log('fetch: ', fetch);
        // Nothing is in local storage, so we need to fetch
        if (this.props.name !== name && lat && long){
            try {
                let fetchedTrails = await fetch(lat, long);
                console.log('fetchedTrails: ', fetchedTrails);
                this.setState({
                    [name]: fetchedTrails,
                    isLoading: false
                }, localStorage.setItem([name], JSON.stringify(fetchedTrails)))
            } catch (error) {
                throw (new Error('Cannot get trails near this city!'))
            }
        } else if (this.props.name !== name && !name){
            try {
                let fetchedTrails = await fetch();
                console.log('trails: ', fetchedTrails);
                this.setState({
                    trailsNearMe: fetchedTrails,
                    isLoading: false
                })
            } catch (error) {
                throw (new Error('Cannot get trails near you!'))
            }
        } else if (this.props.name !== name && !this.state[name].length) {
            try {
                let fetchedTrails = await fetch();
                console.log('trails: ', fetchedTrails);
                this.setState({
                    [name]: fetchedTrails,
                    isLoading: false
                }, localStorage.setItem([name], JSON.stringify(fetchedTrails)))
            } catch (error) {
                throw (new Error('Cannot get trails!'))
            }
        }
        // We have everything we need, toggle isLoading to false
        else {
            this.setState({ isLoading: false })
        }
    }

    handlePageChange = (pageNumber) => {
        console.log(`active page is ${pageNumber}`);
        this.setState({
            activePage: pageNumber
        });
        window.scrollTo(0, 0);
    }



    render() {
        console.log(JSON.parse(localStorage.getItem("allTrails")));
        const { isLoading, trails, error} = this.state;
        const { chooseTrail, name} = this.props;
        console.log('name: ', name);
        
        let sortedTrails = this.state[name].sort((a, b) => {
            var nameA = a.name.toUpperCase();
            var nameB = b.name.toUpperCase();
            return (nameA < nameB) ? -1 : (nameA > nameB) ? 1 : 0;
        })
        
        let activePageIndex = parseInt(this.state.activePage, 10);
        let itemsPerPageIndex = parseInt(this.state.itemsPerPage, 10);
        
        let indexOfLastTrail = activePageIndex * itemsPerPageIndex;
        let indexOfFirstTrail = indexOfLastTrail - itemsPerPageIndex;
        let renderedTrails = sortedTrails.slice(indexOfFirstTrail, indexOfLastTrail);
        
        let result = renderedTrails.reduce((unique, o) => {
            if (!unique.some(obj => obj.id === o.id)) {
                unique.push(o);
            }
            return unique;
        }, [])
        var mappedTrailCard = result.map((trail, i) => {
            return <Link key = {i}onClick = {() => chooseTrail(trail.id)}
            to = {`/Trail/${trail.id}`}>
            <TrailCard { ...trail}/>
            </Link >

})

console.log(this.state[name]);
        return ( 
        <div className = 'gridwallContainer'>
            <div className = 'gridwallSubContainer' >
                <div className = 'gridwallTitleContainer' >
                    <h1 className = 'gridWallTitle' > All Trails </h1> 
            </div> 
                {error
                    ?
                    <div> Oh no!There was an error loading the trails.Please try again later. </div>
                    : (isLoading || !this.state[name].length) ?
                    <LoadingSpinner />
                    : mappedTrailCard
                    } 
            </div> 
            <div className = 'paginationContainer'>
            <Pagination activePage = {this.state.activePage}
            itemsCountPerPage = {25}
            totalItemsCount = {this.state[name].length}
            pageRangeDisplayed = {5}
            onChange = {this.handlePageChange}/>
                </div> 
            </div> );
        }
    }

    const mapStateToProps = state => {
        return {
            trailsList: state.trailsList,
        }
    }

    const mapDispatchToProps = {
        chooseTrail
    }

    export default connect(mapStateToProps, mapDispatchToProps)(TrailsGridwall);
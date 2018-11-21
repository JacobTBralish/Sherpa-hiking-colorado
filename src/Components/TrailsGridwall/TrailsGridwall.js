import React, { Component } from 'react';
import { connect } from 'react-redux';
import TrailCard from '../TrailCard/TrailCard';
import PaginationContainer from '../Pagination/Pagination';
import { Link } from 'react-router-dom';
import { chooseTrail } from '../../Redux/reducer';
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
            trailsNearPagosaSprings: JSON.parse(localStorage.getItem("pagosaSprings")) || [],
            trailsNearLeadville: JSON.parse(localStorage.getItem("leadville"))  || [],
            trailsNearDenver: JSON.parse(localStorage.getItem("denver")) || [],
            trailsNearBreckenridge: JSON.parse(localStorage.getItem("breckenridge")) || [],
            trailsNearRifle: JSON.parse(localStorage.getItem("rifle")) || [],
            trailsNearBoulder: JSON.parse(localStorage.getItem("boulder")) || [],
            isLoading: true,
            error: null,
            activePage: 1,
            itemsPerPage: 26,
            latitude: '',
            longitude: ''
        }
    }

    async componentDidMount() {
        const {fetch, name, lat, long, image} = this.props;
        // Nothing is in local storage, so we need to fetch
        if (lat && long){
            try {
                let fetchedTrails = await fetch(lat, long);
                this.setState({
                    [name]: fetchedTrails,
                    isLoading: false
                }, localStorage.setItem([name], JSON.stringify(fetchedTrails)))
            } catch (error) {
                throw (new Error('Cannot get trails near this city!'))
            }
        } else if (!lat && !long && !image){
            try {
                let fetchedTrails = await fetch();
                this.setState({
                    [name]: fetchedTrails,
                    isLoading: false
                })
            } catch (error) {
                throw (new Error('Cannot get trails near you!'))
            }
        } else if(!this.state[name].length) {
            try {
                let fetchedTrails = await fetch();
                this.setState({
                    [name]: fetchedTrails,
                    isLoading: false
                }, localStorage.setItem([name], JSON.stringify(fetchedTrails)))
            } catch (error) {
                throw (new Error('Cannot get trails!'))
            }
        // We have everything we need, toggle isLoading to false
        } else {
            this.setState({ isLoading: false })
        }
    }

    async componentWillReceiveProps(nextProps) {
        const {fetch, name, lat, long} = nextProps;
        // Nothing is in local storage, so we need to fetch
        if (lat && long){
            try {
                let fetchedTrails = await fetch(lat, long);
                this.setState({
                    [name]: fetchedTrails,
                    isLoading: false
                } , localStorage.setItem([name], JSON.stringify(fetchedTrails)))
            } catch (error) {
                throw (new Error('Cannot get trails near this city!'))
            }
        } else if (this.props.name !== name && !name){
            try {
                let fetchedTrails = await fetch();
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
        this.setState({
            activePage: pageNumber
        });
        window.scrollTo(0, 0);
    }

    render() {
        const { isLoading, error } = this.state;
        const { chooseTrail, name} = this.props;

        //Sorts the trails in alphabetical order
        let sortedTrails = this.state[name].sort((a, b) => {
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
        
        //Removes the duplicated trails from overlapping radius of latitude and longitude
        let result = renderedTrails.reduce((unique, o) => {
            if (!unique.some(obj => obj.id === o.id)) {
                unique.push(o);
            }
            return unique;
        }, []);

        var mappedTrailCard = result.map((trail, i) => {
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
                        <img className='titleImage' src={this.props.image} alt=''></img>
                    </div>
                    <div className='gridwallTitleContainer'>
                        <h1 className = 'gridWallTitle' >{this.props.city ? this.props.city : "All Trails"}</h1> 
                    </div>
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
                <PaginationContainer acticePage={this.state.activePage} articles={this.state[name]} handlePageChange={this.handlePageChange}/>
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
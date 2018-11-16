import React, { Component } from 'react';
import LoadingSpinner from '../../LoadingSpinner';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import './UsersTrails.scss';

class UsersTrails extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            savedTrails: [],
            visitedTrails: [],
            error: null,
            isLoading: true
         }
    }

    async componentDidMount() {
        const {user, fetch, name} = this.props;
        console.log('name: ', name);
        console.log('fetch: ', fetch);
            try {
                let usersTrails = await fetch(user.id);
                console.log('trails: ', usersTrails);
                this.setState({
                    [name]: usersTrails,
                    isLoading: false
                })
            } catch (error) {
                throw (new Error('Cannot get trails near this city!'))
            }
    }
    componentWillReceiveProps(nextProps) {
        const { fetch, name} = nextProps;
        const { user } = this.props;
        console.log('name: ', name);
        console.log('fetch: ', fetch);
        if (this.props.name !== name){}
            try {
                let usersTrails = fetch(user.id);
                console.log('trails: ', usersTrails);
                this.setState({
                    [name]: usersTrails,
                    isLoading: false
                })
            } catch (error) {
                throw (new Error('Cannot get trails near this city!'))
            }
        }  
    
    render() { 
        console.log(this.props.location.pathname, 'this.props.location.pathname');
        console.log('this.props: ', this.props);
        let { error, isLoading } = this.state;
        const { name, user } = this.props
        const { pathname } = this.props.location
        console.log('visitedTrails: ', this.state.visitedTrails);

        let usersTrails = this.state[name].map((trail, i) => {
            console.log('trail: ', trail);
            return <Link key={i} to = {pathname === '/Your Visited Trails' ? `/Trail/${trail.saved_trail_id}` : `/Trail/${trail.visited_trail_id}`}><div className='usersTrailsTrailContainer'>
                <div className='usersTrailImageContainer'>
                    <img className='usersTrailImage' src={trail.trail_image} alt={trail.trail_name} />
                </div>
                <div className='usersTrailInfoContainer'>
                    <h2 className='trailName'>{trail.trail_name}</h2>
                    <h3 className='trailLocation'>{trail.trail_location}</h3>
                    <h3 className='trailDifficulty'>{trail.trail_difficulty}</h3>
                </div>
            </div></Link>
        })
        return ( 
            <div className='usersTrailsContainer'>
                <div className='usersTrailsSubContainer'>
                    <>
                        {error
                            ?
                            <div> Oh no!There was an error loading the trails.Please try again later. </div>
                            : (isLoading || !this.state[name].length) ?
                            <LoadingSpinner />
                            : usersTrails
                        }
                    </>
                </div>
            </div>
         );
    }
}

const mapStateToProps = state => {
    return {
        user: state.user
    }
}

export default withRouter(connect(mapStateToProps)(UsersTrails));
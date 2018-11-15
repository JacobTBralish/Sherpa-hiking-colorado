import React, { Component } from 'react';
import LoadingSpinner from '../../LoadingSpinner';
import { connect } from 'react-redux';

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
        // Nothing is in local storage, so we need to fetch
        // if (){
            try {
                let usersTrails = await fetch(user.id);
                console.log('trails: ', usersTrails);
                this.setState({
                    [name]: usersTrails,
                    isLoading: false
                }/* , localStorage.setItem([name], JSON.stringify(fetchedTrails)) */)
            } catch (error) {
                throw (new Error('Cannot get trails near this city!'))
            }
        // }  
    }
    async componentWillReceiveProps(nextProps) {
        const { fetch, name} = nextProps;
        const { user } = this.props;
        console.log('name: ', name);
        console.log('fetch: ', fetch);
        // Nothing is in local storage, so we need to fetch
        if (this.props.name !== name){}
            try {
                let usersTrails = await fetch(user.id);
                console.log('trails: ', usersTrails);
                this.setState({
                    [name]: usersTrails,
                    isLoading: false
                }/* , localStorage.setItem([name], JSON.stringify(fetchedTrails)) */)
            } catch (error) {
                throw (new Error('Cannot get trails near this city!'))
            }
        }  
    
    render() { 
        let { error, isLoading } = this.state;
        const { name, user } = this.props
        console.log('visitedTrails: ', this.state.visitedTrails);

        let usersTrails = this.state[name].map((trail, i) => {
            console.log('trail: ', trail);
            return <div className='usersTrailsTrailContainer' key={i}>
                <div className='usersTrailImageContainer'>
                    <img src={trail.trail_image} alt={trail.trail_name} />
                </div>
                <div className='usersTrailInfoContainer'>
                    <h2 className='trailName'>{trail.trail_name}</h2>
                    <h3 className='trailLocation'>{trail.trail_location}</h3>
                    <h3 className='trailDifficulty'>{trail.trail_difficulty}</h3>
                </div>
            </div>
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

export default connect(mapStateToProps)(UsersTrails);
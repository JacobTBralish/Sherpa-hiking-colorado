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
            try {
                let usersTrails = await fetch(user.id);
                if (typeof usersTrails !== 'string'){
                    this.setState({
                        [name]: usersTrails,
                        isLoading: false
                    })
                } else {
                    return this.props.history.push('/error')
                }
            } catch (error) {
                throw (new Error('Cannot get your saved trails!'))
            }
    }
    async componentWillReceiveProps(nextProps) {
        const { fetch, name} = nextProps;
        const { user } = this.props;
        if (this.props.name !== name){}
        try {
            let usersTrails = await fetch(user.id);
            if (typeof usersTrails !== 'string'){
                this.setState({
                    [name]: usersTrails,
                    isLoading: false
                })
            } else {
                return this.props.history.push('/error')
            }
        } catch (error) {
            throw (new Error('Cannot get your saved trails!'))
        }
    }  
    
    render() { 
        let { error, isLoading } = this.state;
        const { name } = this.props
        
        let usersTrails = this.state[name].map((trail, i) => {
            console.log('trail: ', trail);
            return <Link key={i} to={`/Trail/${trail.saved_trail_id || trail.visited_trail_id}`}><div className='usersTrailsTrailContainer'>
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
                            <div> Oh no! There was an error loading the trails.Please try again later. </div>
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
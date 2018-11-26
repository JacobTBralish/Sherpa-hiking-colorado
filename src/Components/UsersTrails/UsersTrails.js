import React, { Component } from 'react';
import LoadingSpinner from '../../LoadingSpinner';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { deleteUserTrail } from '../../Redux/reducer';

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
        const { name, type} = this.props;
        let { deleteUserTrail, user, location  } = this.props;
        console.log('location: ', location);
        console.log('user: ', user);
        console.log('type: ', type);
        
        let usersTrails = this.state[name].map((trail, i) => {
            console.log('trail: ', trail.id);
            return <div>
                    <div className='deleteContainer'>
                        <button style={{fontSize: "50px"}} onClick={() => {deleteUserTrail(type, trail.id, user.id)}} className='deleteButton'>X</button>
                    </div>
                <Link key={i} to={`/Trail/${trail.saved_trail_id || trail.visited_trail_id}`}><div className='usersTrailsTrailContainer'>
                <div className='usersTrailImageContainer'>
                    <img className='usersTrailImage' src={trail.trail_image} alt={trail.trail_name} />
                </div>
                <div className='usersTrailInfoContainer'>
                    <h2 className='trailName'>{trail.trail_name}</h2>
                    <h3 className='trailLocation'>{trail.trail_location}</h3>
                    <h3 className='trailDifficulty'>{trail.trail_difficulty}</h3>
                </div>
            </div>
            </Link>
            </div>
        })
        return ( 
            <div className='usersTrailsContainer'>
            {location.pathname === '/Your Saved Trails'
            ?
            <div>
                <h1 style={{fontSize:"36px", margin: "25px 0"}}>{`Trails you have saved for later`}</h1>
            </div>
            :
            <div>
                <h1 style={{fontSize:"36px", margin: "25px 0"}}>{`Trails you have visited`}</h1>
            </div>
            }
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

const mapDispatchToProps = {
    deleteUserTrail
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UsersTrails));
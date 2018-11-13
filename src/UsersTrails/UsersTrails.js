import React, { Component } from 'react';
import LoadingSpinner from '../LoadingSpinner';
import { connect } from 'react-redux';


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
            return <div>
                <div>
                    <img src={trail.trail_image} alt={trail.trail_name} />
                </div>
                <div>
                    <p>{trail.trail_name}</p>
                    <p>{trail.trail_location}</p>
                    <p>{trail.trail_difficulty}</p>
                </div>
            </div>
        })
        return ( 
            <div>
                Users Trails
                <div>
                    <img src={user.user_image} />
                    <h3>{user.name}</h3>
                </div>
                <div>
                    {error
                        ?
                        <div> Oh no!There was an error loading the trails.Please try again later. </div>
                        : (isLoading || !this.state[name].length) ?
                        <LoadingSpinner />
                        : usersTrails
                        }
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
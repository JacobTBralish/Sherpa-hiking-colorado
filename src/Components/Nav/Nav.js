import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import { logOut, getUser } from '../../Redux/reducer';
// import AccountSettings from '../AccountSettings/AccountSettings';
// import PersonalInfo from '../AccountSettings/PersonalInfo';

import './Modal.scss';
import './Nav.scss';


class Nav extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            toggle: false,
     }
    }

    componentDidMount() {
        this.props.getUser();
    }

    login = () => {
        
        const redirectUri = encodeURIComponent(`${window.location.origin}/auth/callback`);
        window.location = `https://${process.env.REACT_APP_AUTH0_DOMAIN}/authorize?client_id=${process.env.REACT_APP_AUTH0_CLIENT_ID}&scope=openid%20profile%20email&redirect_uri=${redirectUri}&response_type=code`
    }
    
    logout = () => {
        axios.post('/api/logout').then(res => {
            console.log(res.data)
            this.props.logOut(this.props.user);
        })
    }


 
    render() { 
        let { user } = this.props;
        let { toggle } = this.state;
        console.log('toggle: ', toggle);

        console.log('user: ', user);
        return ( 
                <div className='navSubContainer'>
                    <div className='logoContainer'>
                        <Link className='logoLink' to='/'><div className='logo'>SHERPA</div></Link>
                    </div>

                    <button onClick={() => this.setState({toggle: !toggle})}>
                        <i className="fas fa-bars"></i>
                    </button>
                    
                    <nav className={this.state.toggle ? 'show' : ''}>
                        <div className='rightNavContainer'>
                            <ul className='rightNavList'>
                                   <li><Link to='/'>Home</Link></li>
                                        <li id=''><Link to='/All Trails'>Trails</Link>
                                            <ul>
                                                <li><Link className='rightNavListItem' to=''>Trails near me</Link></li>
                                                <li><Link className='rightNavListItem' to=''>Trails by city</Link>
                                                    <ul>
                                                        <li className='rightNavExtraListItemCities'><Link to='/Trails Near Alamosa'>Alamosa</Link></li>
                                                        <li className='rightNavExtraListItemCities'><Link to='/Trails Near Aspen'>Aspen</Link></li>
                                                        <li className='rightNavExtraListItemCities'><Link to='/Trails Near Boulder'>Boulder</Link></li>
                                                        <li className='rightNavExtraListItemCities'><Link to='/Trails Near Breckenridge'>Breckenridge</Link></li>
                                                        <li className='rightNavExtraListItemCities'><Link to='/Trails Near Colorado Springs'>Colorado Springs</Link></li>
                                                        <li className='rightNavExtraListItemCities'><Link to='/Trails Near Denver'>Denver</Link></li>
                                                        <li className='rightNavExtraListItemCities'><Link to='/Trails Near Estes Park'>Estes Park</Link></li>
                                                        <li className='rightNavExtraListItemCities'><Link to='/Trails Near Leadville'>Leadville</Link></li>
                                                        <li className='rightNavExtraListItemCities'><Link to='/Trails Near Rifle'>Rifle</Link></li>
                                                        <li className='rightNavExtraListItemCities'><Link to='/Trails Near Telluride'>Telluride</Link></li>
                                                    </ul>
                                                </li>
                                            </ul>
                                        </li>
                                        {!user ? 
                                            <li onClick={() => this.login()}>Sign In</li>
                                            :
                                        <li><Link to='/'>Account</Link>
                                            <ul>
                                                <li className='rightNavExtraListItemCities'><Link to='/Your Saved Trails'>Trails to visit</Link></li>
                                                <li className='rightNavExtraListItemCities'><Link to='/Your Visited Trails'>Visited trails</Link></li>
                                                {/* <li id='logoutButton'  onClick={() => this.openModal()} className='rightNavExtraListItemCities'>Account Settings</li> */}
                                                <li id='logoutButton' className='rightNavExtraListItemCities' onClick={() => {this.logout(); this.props.history.push('/');}}>Log out</li>
                                            </ul>
                                        </li>
                                            }

                            </ul>
                        </div>
                    </nav>
                    <div className='searchContainer'>
                        {/* <input placeholder='Search'></input> */}
                        {user ?
                        <h3>Hey, {user.first_name}!</h3>
                            :
                            <h3>Welcome!</h3>
                        }
                        <img id='navUserImage' src={user ? user.user_image : null} alt=''></img>
                    </div>
                </div>
         );
    }
}

const mapStateToProps = state => {
    return {
        user: state.user,

    }
}

const mapDispatchToProps = {
    logOut,
    getUser

}
 
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Nav));
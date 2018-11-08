import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import { logOut, getUser } from '../../Redux/reducer';

import './Nav.scss';


class Nav extends Component {
    constructor(props) {
        super(props);
        this.state = { toggle: false }
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
        console.log('user: ', user);
        return ( 
                <div className='navSubContainer'>
                    <div className='logoContainer'>
                        <Link className='logoLink' to='/'><div className='logo'>Logo</div></Link>
                    </div>

                    <button onClick={() => this.setState({toggle: !this.state.toggle})}>
                        <i className="fas fa-bars"></i>
                    </button>
                    
                    <nav className={this.state.toggle ? 'show' : ''}>
                        <div className='rightNavContainer'>
                            <ul className='rightNavList'>
                                <li className='rightNavListItem'><Link to='/'>Home</Link></li>
                                <ul className='rightNavExtraListTrails'><Link to='/All Trails'>Trails</Link>
                                    <li className='rightNavExtraListItemTrails'><Link to=''>Trails near me</Link></li>
                                    <ul className='rightNavExtraCitiesList'><Link to=''>Trails by city</Link>
                                        <li className='rightNavExtraListItemCities'><Link to='/'>Estes Park</Link></li>
                                    </ul>
                                    {/* <li className='rightNavExtraListItem'><Link to=''></Link></li>
                                    <li className='rightNavExtraListItem'><Link to=''></Link></li>
                                    <li className='rightNavExtraListItem'><Link to=''></Link></li> */}
                                </ul>
                                {!user ? 
                                <li className='rightNavListItem' onClick={() => this.login()}>Sign In</li>
                                :
                                <ul className='rightNavExtraListAccount'><Link to='/'>Account</Link>
                                    <li className='rightNavExtraListItemAccount'><Link to='/'>Trails to visit</Link></li>
                                    <li className='rightNavExtraListItemAccount'><Link to='/'>Favorited trails</Link></li>
                                    <li className='rightNavExtraListItemAccount'><Link to='/'>Account settings</Link></li>
                                    <li className='rightNavExtraListItemAccount' onClick={() => this.logout()}>Log out</li>
                                </ul>
                                }
                            </ul>
                        </div>
                    </nav>
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
 
export default connect(mapStateToProps, mapDispatchToProps)(Nav);
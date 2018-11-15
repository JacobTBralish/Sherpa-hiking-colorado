import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

class PersonalInfo extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            firstName: '',
            lastName: '',
            email: ''
         }
    }

    handleChange = (e) => {
        this.setState({
             [e.target.name]: e.target.value  
        });
    }

    changeUserInfo = (userId, firstName, lastName, email ) => {
        axios.put(`/api/updateuser/${userId}`, { firstName, lastName, email }).then(response => {
            console.log('response: ', response);
            return response.data
        }).catch(error => {
            console.log('error: ', error);

        })
    }
    render() { 
        let { firstName, lastName, email } = this.state;
        let { user } = this.props;
        return ( 
            <div>
                <div>
                    <h3>Update User Information</h3>
                </div>
                <form>
                    <div>
                        <label htmlFor='firstName'>First Name:</label>
                        <input name='firstName' onChange={this.handleChange}></input>
                    </div>
                    <div>
                        <label htmlFor='lastName'>Last Name:</label>
                        <input name='lastName' onChange={this.handleChange}></input>
                    </div>
                    <div>
                        <label htmlFor='email'>Email:</label>
                        <input name='email' onChange={this.handleChange}></input>
                    </div>
                    <div>
                        <div onClick={() => this.changeUserInfo(user.id, firstName, lastName, email)}>Save Changes</div>
                    </div>
                </form>
            </div>
         );
    }
}

const mapStateToProps = state => {
    return {
        user: state.user,
    }
}

export default connect(mapStateToProps)(PersonalInfo);
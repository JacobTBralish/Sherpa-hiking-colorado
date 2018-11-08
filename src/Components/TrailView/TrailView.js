import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { getTrail } from '../../Redux/reducer';

class TrailView extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }

    componentDidMount() {
        axios.get(`https://www.hikingproject.com/data/get-trails-by-id?ids=${this.props.match.params.id}&key=200356963-c67e8738e2f605aeb5bcc2a5ef5f6375`).then(res => {
            this.props.getTrail(res.data.trails);
            // console.log(res.data.trails)
        }).catch(error => {
            console.log(error, 'Error getting trail.')
        })
    }
    render() { 
        let { chosenTrail } = this.props;

        let mappedChosenTrail = chosenTrail.map((trail, i) => {
            return <div>
            <div className='cardImageContainer'></div>
                <img className='cardImage' src={trail.imgSmallMed} alt=''></img>
                <div className='cardInfo'>
                    <p className='cardName'>{trail.name}</p>

                </div>
            </div>
        })
        return ( 
        <div>
            {mappedChosenTrail}
        </div> 
        );
    }
}

const mapStateToProps = state => {
    return {
        chosenTrail: state.chosenTrail,
    }
} 

const mapDispatchToProps = {
    getTrail
}

export default connect(mapStateToProps, mapDispatchToProps)(TrailView);

// axios.all([
//     axios.get("https://www.hikingproject.com/data/get-trails?lat=38.5095889&lon=-106.7324564&maxDistance=25&maxResults=500&key=200356963-c67e8738e2f605aeb5bcc2a5ef5f6375"),
//     axios.get("https://www.hikingproject.com/data/get-trails?lat=39.3916074&lon=-105.4024202&maxDistance=25&maxResults=500&key=200356963-c67e8738e2f605aeb5bcc2a5ef5f6375"),
//     axios.get("https://www.hikingproject.com/data/get-trails?lat=38.0747667&lon=-105.1121832&maxDistance=25&maxResults=500&key=200356963-c67e8738e2f605aeb5bcc2a5ef5f6375"),
//     axios.get("https://www.hikingproject.com/data/get-trails?lat=40.6783409&lon=-107.7090422&maxDistance=25&maxResults=500&key=200356963-c67e8738e2f605aeb5bcc2a5ef5f6375"),
//     axios.get("https://www.hikingproject.com/data/get-trails?lat=40.6510679&lon=-106.767139&maxDistance=25&maxResults=500&key=200356963-c67e8738e2f605aeb5bcc2a5ef5f6375"),
//     axios.get("https://www.hikingproject.com/data/get-trails?lat=40.1670308&lon=-105.9032552&maxDistance=25&maxResults=500&key=200356963-c67e8738e2f605aeb5bcc2a5ef5f6375"),
//     axios.get("https://www.hikingproject.com/data/get-trails?lat=38.7510726&lon=-105.2246079&maxDistance=25&maxResults=500&key=200356963-c67e8738e2f605aeb5bcc2a5ef5f6375"),
//     axios.get("https://www.hikingproject.com/data/get-trails?lat=37.4032218&lon=-107.644204&maxDistance=25&maxResults=500&key=200356963-c67e8738e2f605aeb5bcc2a5ef5f6375"),
//     axios.get("https://www.hikingproject.com/data/get-trails?lat=37.3706982&lon=-105.0489324&maxDistance=25&maxResults=500&key=200356963-c67e8738e2f605aeb5bcc2a5ef5f6375"),
//     axios.get("https://www.hikingproject.com/data/get-trails?lat=37.867358&lon=-108.1284938&maxDistance=25&maxResults=500&key=200356963-c67e8738e2f605aeb5bcc2a5ef5f6375"),
//     axios.get("https://www.hikingproject.com/data/get-trails?lat=38.1834715&lon=-105.9954739&maxDistance=25&maxResults=500&key=200356963-c67e8738e2f605aeb5bcc2a5ef5f6375"),
//     axios.get("https://www.hikingproject.com/data/get-trails?lat=37.8529719&lon=-106.6815248&maxDistance=25&maxResults=500&key=200356963-c67e8738e2f605aeb5bcc2a5ef5f6375"),
//     axios.get("https://www.hikingproject.com/data/get-trails?lat=40.0152902&lon=-105.1178251&maxDistance=25&maxResults=500&key=200356963-c67e8738e2f605aeb5bcc2a5ef5f6375"),
//     axios.get("https://www.hikingproject.com/data/get-trails?lat=38.9001158&lon=-106.0123268&maxDistance=25&maxResults=500&key=200356963-c67e8738e2f605aeb5bcc2a5ef5f6375"),
//     axios.get("https://www.hikingproject.com/data/get-trails?lat=39.6379613&lon=-105.9959332&maxDistance=25&maxResults=500&key=200356963-c67e8738e2f605aeb5bcc2a5ef5f6375"),
//     axios.get("https://www.hikingproject.com/data/get-trails?lat=37.4173536&lon=-108.584248&maxDistance=25&maxResults=500&key=200356963-c67e8738e2f605aeb5bcc2a5ef5f6375"),
//     axios.get("https://www.hikingproject.com/data/get-trails?lat=40.6044318&lon=-105.5755278&maxDistance=25&maxResults=500&key=200356963-c67e8738e2f605aeb5bcc2a5ef5f6375"),
//     axios.get("https://www.hikingproject.com/data/get-trails?lat=38.7233472&lon=-108.4928863&maxDistance=25&maxResults=500&key=200356963-c67e8738e2f605aeb5bcc2a5ef5f6375"),
//     axios.get("https://www.hikingproject.com/data/get-trails?lat=39.2470345&lon=-106.8377627&maxDistance=25&maxResults=500&key=200356963-c67e8738e2f605aeb5bcc2a5ef5f6375"),
//     axios.get("https://www.hikingproject.com/data/get-trails?lat=40.0721236&lon=-107.2536617&maxDistance=25&maxResults=500&key=200356963-c67e8738e2f605aeb5bcc2a5ef5f6375"),
//     axios.get("https://www.hikingproject.com/data/get-trails?lat=38.7793048&lon=-107.55587&maxDistance=25&maxResults=500&key=200356963-c67e8738e2f605aeb5bcc2a5ef5f6375")]).then(axios.spread((trails1, trails2, trails3, trails4, trails5, trails6, trails7, trails8, trails9, trails10, trails11, trails12, trails13, trails14, trails15, trails16, trails17, trails18, trails19, trails20) => {
//         let fixedTrailsArray = [...trails1.data.trails, ...trails2.data.trails, ...trails3.data.trails, ...trails4.data.trails, ...trails5.data.trails, ...trails6.data.trails, ...trails7.data.trails, ...trails8.data.trails, ...trails9.data.trails, ...trails10.data.trails, ...trails11.data.trails, ...trails12.data.trails, ...trails13.data.trails, ...trails14.data.trails, ...trails15.data.trails, ...trails16.data.trails, ...trails17.data.trails, ...trails18.data.trails, ...trails19.data.trails, ...trails20.data.trails]
//     // if(trails[0].imgMedium || trails[0].imgSmall || trails[0].imgSmallMed || trails[0].imgSqSmall){
//         this.setState({ trails: fixedTrailsArray, isLoading: false });
        
//      })).catch(error => {
//          console.log(error);
//      })
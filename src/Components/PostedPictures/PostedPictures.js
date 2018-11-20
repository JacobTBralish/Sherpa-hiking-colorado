import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom'

import './PostedPictures.scss';

class PostedPictures extends Component {
    state = { images: [] }

    componentDidMount() {
        console.log('hello before cdm');
        axios.get(`/api/getpostedimages/${this.props.match.params.id}`).then(response => {
            console.log('hello from cdm after response');
            this.setState({ images: response.data });
        }).catch('Error getting pictures in PostedPictures component')
    }
    render() { 

        let mappedImages = this.state.images.map((image, i) => {
            console.log('image: ', image);
            return<div className='userSubmittedImageSubContainer'>
                        <a href={image.user_submitted_image1}><img className='userSubmittedImage1' src={image.user_submitted_image1} alt='' /></a>
                    </div>
        })
        return ( 
            <div className='mappedImagesContainer'>
                {mappedImages}
            </div>
         );
    }
}

export default withRouter(PostedPictures);
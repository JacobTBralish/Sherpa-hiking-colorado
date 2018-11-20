import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import axios from 'axios';
import { connect } from 'react-redux';
import { editReview } from '../../Redux/reducer';

import '../Reviews/Reviews.scss';

const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/jacob-development/image/upload';

class EditReviewForm extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            title: '',
            reviewBody: '',
            userSubmittedImages: '',
            rating: 0,
            reviews: [],
            toggle: false,
            togglePhotos: false,
            filesPreview: [],
            filesToBeSent: [],
            printcount: 2,
         }
    }

    handleToggle = () => {
        this.setState((prevState) =>{
        //  console.log('prevstate', prevState)
            return {
                toggle: !prevState.toggle,
            }
         })
     }

     handlePhotoToggle = () => {
        this.setState((prevState) =>{
        //  console.log('prevstate', prevState)
            return {
                togglePhotos: !prevState.togglePhotos,
            }
         })
     }

     
     onDrop(acceptedFiles, rejectedFiles) {
         // console.log('Accepted files: ', acceptedFiles[0].name);
         var filesToBeSent=this.state.filesToBeSent;
         if(filesToBeSent.length < this.state.printcount){
             filesToBeSent.push(acceptedFiles);
          var filesPreview=[];
          for(var i in filesToBeSent){
              filesPreview.push(<div>
              {filesToBeSent[i][0].name}
              </div>
            )
        }
        this.handleImageUpload(filesToBeSent)
    }
    else{
        alert("You have reached the limit of printing files at a time")
    }
}

handleImageUpload = (file) => {
    let submittedImages= [];
    axios.get('/api/upload').then(response => {
        
       let formData = new FormData();
       formData.append('signature', response.data.signature)
       formData.append('api_key', '626685399682776');
       formData.append('timestamp', response.data.timestamp)
       formData.append('file', file[0]);

       axios.post(CLOUDINARY_UPLOAD_URL, formData).then(response => { console.log(response.data)
        if(response.data > 0){
            submittedImages.push(response.data.secure_url)
        }
           this.setState({
                userSubmittedImages: submittedImages
           })
       })
    })
}

    render() { 
        let{ editReview, user } = this.props;
        console.log('user: ', user);
        let { title, reviewBody, rating, userSubmittedImage1, userSubmittedImage2 } = this.state;
        return ( 
        <>
            <div className='reviewContainer'>
                <div className='reviewSubContainer'>
                    <div className='authorImageContainer'>
                        <img className='authorImage' alt='' src={this.props.authorImage}/>
                    </div>
                    <div className='reviewInfoBox'>
                        <div className='reviewInfo'>
                            <div className='reviewTopContainer'>
                                <div className='titleCluster'>
                                    <div className='titleContainer'>
                                        <label className='reviewLabel' htmlFor='title'>Title: </label>
                                        <input required onChange={this.handleChange} name='title'></input>
                                    </div>
                                    <div className='reviewRatingContainer'>
                                        <label className='reviewLabel' htmlFor='rating'>Rating:</label>
                                        <div className='selectContainer'>
                                            <select required className='rating' name='rating' onChange={this.handleChange}>
                                                <option>Select a rating</option>
                                                <option value={1}>1</option>
                                                <option value={1.5}>1.5</option>
                                                <option value={2}>2</option>
                                                <option value={2.5}>2.5</option>
                                                <option value={3}>3</option>
                                                <option value={3.5}>3.5</option>
                                                <option value={4}>4</option>
                                                <option value={4.5}>4.5</option>
                                                <option value={5}>5</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className='dateContainer'>
                                    <p id='date' className='dateText'>{this.props.time}</p>
                                </div>
                            </div>
                            <div className='reviewBodyContainer'>
                                <label className='reviewLabel' htmlFor='reviewBody'>Review: </label>
                                <textarea required name='reviewBody' className='reviewInput' onChange={this.handleChange} />
                            </div>
                            <div className='photoContainer'>
                                <Dropzone className='dropZone' onDrop={(files) => this.onDrop(files)}>
                                    <div>Try dropping some files here, or click to select files to upload.</div>
                                </Dropzone>
                            </div>
                            </div>
                            <div className='reviewSubmitButtonContainer'>
                                <button className='submitButton' type='submit' onClick={() => { editReview( this.props.match.params.id, (userSubmittedImage1 || null), (userSubmittedImage2 || null), title, reviewBody, rating)}}>Save changes</button>
                                <button onClick={()=> this.handleToggle()}>Cancel</button>
                            </div>
                        </div>
                        </div>
                    </div>
                </>
            );
        }
    }
  
const mapStateToProps = state => {
    return {
        user: state.user,
    }
} 

const mapDispatchToProps = {
    editReview
}

export default connect(mapStateToProps, mapDispatchToProps)(EditReviewForm);
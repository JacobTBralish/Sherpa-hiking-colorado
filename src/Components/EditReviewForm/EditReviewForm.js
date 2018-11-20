import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import axios from 'axios';
import { connect } from 'react-redux';
import { editReview } from '../../Redux/reducer';
import { withRouter } from 'react-router-dom';

import '../Reviews/Reviews.scss';

const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/jacob-development/image/upload';

class EditReviewForm extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            title: '',
            reviewBody: '',
            userSubmittedImage1: '',
            userSubmittedImage2: '',
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

     onDrop(acceptedFiles, rejectedFiles) {
        console.log('acceptedFiles: ', acceptedFiles);
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
       console.log('filesToBeSent: ', filesToBeSent);
       this.setState({ filesPreview });
       this.handleImageUpload(acceptedFiles)
   }
   else{
       alert("You may only upload one photo at a time!")
   }
}

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleEdit = (ParamsId, userSubmittedImage1, userSubmittedImage2, title, reviewBody, rating, reviewId) => {
        this.props.editReview(ParamsId, userSubmittedImage1, userSubmittedImage2, title, reviewBody, rating, reviewId);
        // this.props.history.push(`/trail/${this.props.match.params.id}`);
        window.location.reload();
    }

    handleImageUpload = async (file) => {
        console.log('file: ', file);
       let submittedImages= [];
       await axios.get('/api/upload').then(response => {
           
          let formData = new FormData();
          formData.append('signature', response.data.signature)
          formData.append('api_key', '626685399682776');
          formData.append('timestamp', response.data.timestamp)
          formData.append('file', file[0]);
          console.log('file[0]: ', file[0]);
          
          axios.post(CLOUDINARY_UPLOAD_URL, formData).then(response => {
            console.log('response: ', response);
            console.log('response.data: ', response.data);
        //    if(response.data.length > 0){
               submittedImages.push(submittedImages)
        //    }
              this.setState({
                userSubmittedImage1: response.data.secure_url
              })
          }).catch(error => console.log(error))
       })
    }


    render() { 
        let{ user } = this.props;
        console.log(this.props.chosenTrail[0].id);
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
                        <form className='reviewInfo'>
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
                                <Dropzone className='dropZone' accept={'image/*'} onDrop={(files) => this.onDrop(files)}>
                                    <div>Try dropping some files here, or click to select files to upload.</div>
                                </Dropzone>
                            </div>
                            </form>
                            <div className='reviewSubmitButtonContainer'>
                                <button className='submitButton' type='submit' onClick={() => { this.handleEdit( this.props.chosenTrail[0].id, userSubmittedImage1, userSubmittedImage2, title, reviewBody, rating, this.props.reviewId)}}>Save changes</button>
                                <button onClick={()=> window.location.reload()}>Cancel</button>
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
        chosenTrail: state.chosenTrail
    }
} 

const mapDispatchToProps = {
    editReview
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EditReviewForm));
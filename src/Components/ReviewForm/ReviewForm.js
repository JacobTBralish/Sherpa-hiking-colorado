import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Dropzone from 'react-dropzone';
import { postReview } from '../../Redux/reducer';
import '../Reviews/Reviews.scss';

const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/jacob-development/image/upload';

class ReviewForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            toggle: false,
            togglePhotos: false,
            filesPreview: [],
            filesToBeSent: [],
            printcount: 1,
            title: '',
            reviewBody: '',
            userSubmittedImage1: '',
            userSubmittedImage2: '',
        }
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    login = () => {
        const redirectUri = encodeURIComponent(`${window.location.origin}/auth/callback`);
        window.location = `https://${process.env.REACT_APP_AUTH0_DOMAIN}/authorize?client_id=${process.env.REACT_APP_AUTH0_CLIENT_ID}&scope=openid%20profile%20email&redirect_uri=${redirectUri}&response_type=code`
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
        console.log('acceptedFiles: ', acceptedFiles);
        // console.log('Accepted files: ', acceptedFiles[0].name);
        var filesToBeSent=this.state.filesToBeSent;
        // console.log('filesToBeSent: ', filesToBeSent);
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
        let { title, reviewBody, rating, userSubmittedImage1, userSubmittedImage2 } = this.state;
        console.log('userSubmittedImages: ', userSubmittedImage1);
        console.log('userSubmittedImages: ', userSubmittedImage2);
        let{ postReview, user, chosenTrail } = this.props;
        return ( 
            <div className='reviewContainer'>
                {user ?                      
                    <div className='reviewFormContainer'>   
                        <form className='reviewForm'>
                            <div className='reviewTitleContainer'>
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
                            <div className='reviewBodyContainer'>
                                <label className='reviewLabel' htmlFor='reviewBody'>Review: </label>
                                <textarea required name='reviewBody' className='reviewInput' onChange={this.handleChange} />
                            </div>
                            <div className='photoContainer'>
                                    <Dropzone className='dropZone' accept={'image/*'} onDrop={(files) => this.onDrop(files)}>
                                        <div>Drag or click to add a photo of your experience (optional)</div>
                                    </Dropzone>
                            </div>
                            {this.state.filesPreview}

                            <div className='reviewSubmitButtonContainer'>
                                <button className='submitButton' type='submit' onClick={() => { postReview( chosenTrail[0].id ,chosenTrail[0].name, chosenTrail[0].imgSmallMed, userSubmittedImage1, userSubmittedImage2, title, reviewBody, rating, user.id, user.user_image, user.name)}}>Submit</button>
                            </div>
                        </form>
                    </div>
                        :
                        <div className='reviewLoginMessageContainer'>
                            <div className='reviewLoginMessage'>Please <span style={{textDecoration: "underline", cursor: "pointer"}} onClick={() => this.login()}>log in</span> to share a review on this trail!</div>
                        </div>
                }
            </div>
         );
    }
}

const mapStateToProps = state => {
return{
    reviews: state.reviews,
    user: state.user,
    chosenTrail: state.chosenTrail,

    }
}

const mapDispatchToProps = {
postReview,

}
 
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(ReviewForm));
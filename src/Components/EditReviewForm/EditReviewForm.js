import React, { Component } from 'react';
import Dropzone from 'react-dropzone';

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
            toggle: true,
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

    // handlePhotoToggle = () => {
    //     this.setState((prevState) =>{
    //     //  console.log('prevstate', prevState)
    //         return {
    //             toggle: !prevState.toggle,
    //         }
    //      })
    //  }

    render() { 
        let{ editReview, user, chosenTrail, reviews } = this.props;
        console.log('user: ', user);
        let { title, reviewBody, rating, togglePhotos, userSubmittedImage1, userSubmittedImage2 } = this.state;
        // console.log(chosenTrail);
        return ( 
            <>
                <form className='reviewForm'>
                    <div className='reviewTitleContainer'>
                        <label className='reviewLabel' htmlFor='title'>Title: </label>
                        <input onChange={this.handleChange} name='title'></input>
                    </div>
                    
                    <div className='reviewRatingContainer'>
                        <label className='reviewLabel' htmlFor='rating'>Rating:</label>
                        <div className='selectContainer'>
                            <select className='rating' name='rating' onChange={this.handleChange}>
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
                        <textarea name='reviewBody' className='reviewInput' onChange={this.handleChange} />
                    </div>
                    {/* <div className='photoContainer'>
                    <button onClick={() => this.handlePhotoToggle()}></button>
                    {!togglePhotos ?
                        null
                    :  
                        <Dropzone onDrop={(files) => this.onDrop(files)}>
                            <div>Try dropping some files here, or click to select files to upload.</div>
                        </Dropzone>
                        {this.state.printingmessage}
                    }
                    </div> */}

                    <div className='reviewSubmitButtonContainer'>
                        <button className='submitButton' type='submit' onClick={() => { editReview( this.props.match.params.id, chosenTrail[0].id ,chosenTrail[0].name, chosenTrail[0].imgSmallMed, (userSubmittedImage1 || null), (userSubmittedImage2 || null), title, reviewBody, rating, user.id, user.user_image, user.name)}}>Submit</button>
                        <button onClick={()=> this.handleToggle()}>Cancel</button>
                    </div>
                </form>
            </>
         );
    }
}
 
export default EditReviewForm;
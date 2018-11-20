module.exports = {

    getTrailReviewById: ( req, res ) => {

        const db = req.app.get('db');
        let { id } = req.params;

        db.get_trail_review( parseInt(id) ).then(trailReview => {
            res.status(200).json(trailReview)
        }).catch(error => {
            res.status(500).json(error);
            console.log('Error in getting trail review by id in controller')
        })
    },

    getTrailsPostedPictures: (req, res) => {
        const db = req.app.get('db');
        let { id } = req.params;
        console.log('req.params: ', req.params);

        db.get_pictures_posted_by_users(parseInt(id)).then(images => {
            // console.log('images: ', images);
            res.status(200).json(images)
        }).catch(error => {
            res.status(500).json(error)
            console.log('Error getting pictures posted by users in controller ', error);
        })
    },

    postReview: (req, res) => {
        const db = req.app.get('db');
        let { trailId, trailName, trailImg , userSubmittedImage1, userSubmittedImage2, title, time, reviewBody, rating, userId, userImage, userName } = req.body;
        console.log('req.body: ', req.body);

        db.post_trail_review( { review_trail_id: trailId, trail_name: trailName, trail_image: trailImg, user_submitted_image1: userSubmittedImage1, user_submitted_image2: userSubmittedImage2, title: title, time: time, body: reviewBody, rating: parseFloat(rating), author_id: userId, author_image: userImage, author_name: userName }).then(review => {
            res.status(200).json(review)
        }).catch(error => {
            res.status(500).json(error);
            console.log(error, 'Error in posting review in controller');
        })
    },

    deleteReview: (req,res) => {
        // console.log(req.query, req.params, '------------------------------------')
        const db = req.app.get('db');
        let { id } = req.params;
        console.log('req.params: ', req.params);
        let { reviewId } = req.query;
        console.log('req.query: ', req.query);

        db.delete_review( { review_trail_id: id, id: reviewId } ).then(response => {
            res.status(200).json(response)
        }).catch(error => {
            res.status(500).json(error)
            console.log(error, 'Error with deleting your trail in controller')
        })
    },

    editReview: (req, res) => {
        const db = req.app.get('db');
        let { trailId, userSubmittedImage1, userSubmittedImage2, title, reviewBody, rating, reviewId } = req.body;
        console.log('req.body: ', req.body);

        db.edit_review({ review_trail_id:trailId, user_submitted_image1: userSubmittedImage1, user_submitted_image2: userSubmittedImage2, title, body:reviewBody, rating, id:reviewId}).then(response => {
            res.status(200).json(response)
        }).catch(error =>{
            res.status(500).json(error)
            console.log('error editing the review in controller', error);
    })
    }

}
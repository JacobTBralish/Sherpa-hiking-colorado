module.exports = {
    saveForLater: (req, res) => {
        const db = req.app.get('db');
        let { userId, trailId, trailName, trailImage, trailLocation, trailDifficulty } = req.body;

        db.post_save_for_later({user_saved_id: userId, saved_trail_id: trailId, trail_name: trailName, trail_image: trailImage, trail_location: trailLocation, trail_difficulty: trailDifficulty}).then(response => {
            res.status(200).json(response)
        }).catch(error => {
            res.status(500).json(error)
            console.log('error: ', error)
            
        })
    },
    getSavedTrails: (req, res) => {
        const db = req.app.get('db');
        let { id } = req.params;

        db.get_saved_trails(id).then(response => {
            res.status(200).json(response)
        }).catch(error => {
            console.log(error, 'Error getting saved trails')
            res.status(500).json(error);
        })
    }
}
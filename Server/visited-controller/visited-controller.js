module.exports = {
    markAsVisited: (req, res) => {
        const db = req.app.get('db');
        let { userId, trailId, trailName, trailImage, trailLocation, trailDifficulty } = req.body;
        console.log('req.body: ', req.body);
        console.log('req.params: ', req.params);

        db.post_visited_trail({user_visited_id: userId, visited_trail_id: trailId, trail_name: trailName, trail_image: trailImage, trail_location: trailLocation, trail_difficulty: trailDifficulty}).then(response => {
            db.delete_saved_when_visited([userId, trailId]).then(deleted => {
                res.status(200).json(deleted)
            }).catch(error => {
                res.status(500).json(error)
                console.log('Error with deleting from saved in controller',error);
            })
            res.status(200).json(response)
        }).catch(error => {
            res.status(500).json(error)
            console.log('Error with adding to visited in controller', error)
            
        })
    },
    getVisitedTrails: (req, res) => {
        const db = req.app.get('db');
        let { id } = req.params;
        console.log('req.params: ', req.params);

        db.get_visited_trails(id).then(response => {
            res.status(200).json(response)
        }).catch(error => {
            console.log(error, 'Error getting visited trails in controller')
            res.status(500).json(error);
        })
    }
}
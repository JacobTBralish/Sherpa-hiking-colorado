module.exports = {
    markAsVisited: (req, res) => {
        const db = req.app.get('db');
        let { userId, trailId, trailName, trailImage, trailLocation, trailDifficulty } = req.body;

        db.post_visited_trail({user_visited_id: userId, visited_trail_id: trailId, trail_name: trailName, trail_image: trailImage, trail_location: trailLocation, trail_difficulty: trailDifficulty}).then(response => {
            db.delete_saved_when_visited([userId, trailId]).then(deleted => {
                res.status(200).json(deleted)
            }).catch(error => {
                res.status(500).json(error)
                
            })
            res.status(200).json(response)
        }).catch(error => {
            res.status(500).json(error)
            
            
        })
    },
    getVisitedTrails: (req, res) => {
        const db = req.app.get('db');
        let { id } = req.params;

        db.get_visited_trails(id).then(response => {
            res.status(200).json(response)
        }).catch(error => {
            
            res.status(500).json(error);
        })
    }
}
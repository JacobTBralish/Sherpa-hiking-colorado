module.exports = {
  saveForLater: (req, res) => {
    const db = req.app.get("db");
    let {
      userId,
      trailId,
      trailName,
      trailImage,
      trailLocation,
      trailDifficulty
    } = req.body;

    db.post_save_for_later({
      user_saved_id: userId,
      saved_trail_id: trailId,
      trail_name: trailName,
      trail_image: trailImage,
      trail_location: trailLocation,
      trail_difficulty: trailDifficulty
    })
      .then(response => {
        res.status(200).json(response);
      })
      .catch(error => {
        res.status(500).json(error);
      });
  },
  getSavedTrails: (req, res) => {
    const db = req.app.get("db");
    let { id } = req.params;

    db.get_saved_trails(id)
      .then(response => {
        res.status(200).json(response);
      })
      .catch(error => {
        res.status(500).json(error);
      });
  },

  deleteSavedTrail: (req, res) => {
    const db = req.app.get("db");
    let { userId } = req.body;

    let { usersTrailId } = req.query;

    db.delete_saved_trail({ user_saved_id: userId, id: usersTrailId })
      .then(response => {
        res.status(200).json(response);
      })
      .catch(error => {
        res.status(500).json(error);
      });
  }
};

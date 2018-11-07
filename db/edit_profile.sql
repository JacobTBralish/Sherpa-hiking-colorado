UPDATE sherpa_profile SET profilePic = $2, bio = $3, city = $4, state = $5, last_name = $6, experience = $7
WHERE profile_id = $1;
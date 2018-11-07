UPDATE sherpa_users SET username = $2, password = $3, profilePic  = $4, first_name = $5, last_name = $6, experience = $7, email = $8, DOB = $9  WHERE id = $1;

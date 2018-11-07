INSERT INTO sherpa_profile (profile_id, profilePic, bio, city, state, first_name, last_name, experience) VALUES
($1,$2,$3,$4,$5,$6,$7,$8)
returning * ;
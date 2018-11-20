SELECT * FROM sherpa_users
WHERE auth0_id = $1 LIMIT 1;
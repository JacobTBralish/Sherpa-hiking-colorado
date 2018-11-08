insert into sherpa_users (auth0_id, user_image, first_name, last_name, name, email)
values ($1, $2, $3, $4, $5, $6)
returning * ;

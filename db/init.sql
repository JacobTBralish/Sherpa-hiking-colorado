CREATE TABLE sherpa_users (
    id SERIAL PRIMARY KEY NOT NULL 
    ,auth0_id text UNIQUE NOT NULL
    ,name VARCHAR(100)
    ,email VARCHAR(100)
    ,profileFinished BOOLEAN DEFAULT false
);


CREATE TABLE sherpa_profile (
    id SERIAL PRIMARY KEY NOT NULL
    ,profile_id INTEGER REFERENCES sherpa_users(id) NOT NULL
    ,profilePic TEXT
    ,bio TEXT
    ,city VARCHAR(40)
    ,state VARCHAR(15)
    ,first_name VARCHAR(18) 
    ,last_name VARCHAR(25) 
    ,experience VARCHAR(10)
);

CREATE TABLE trail_reviews (
    id SERIAL PRIMARY KEY
    ,review_trail_id INTEGER NOT NULL
    ,trail_name TEXT NOT NULL
    ,trail_Img TEXT
    ,title VARCHAR(50) NOT NULL
    ,time TEXT NOT NULL
    ,body TEXT NOT NULL
    ,rating DECIMAL NOT NULL
    ,author_id INTEGER REFERENCES sherpa_users(id) NOT NULL
);

select *
from trail_reviews tr
join sherpa_users su
on tr.author_id = su.id;
where tr.author_id = su.id;

-- CREATE TABLE sherpa_trails (
--     id SERIAL PRIMARY KEY NOT NULL
--     ,trial_id INTEGER NOT NULL
--     ,trail_name VARCHAR(30)
--     ,trail_pic TEXT NOT NULL
--     ,trail_lenth decimal NOT NULL
--     ,ascent INTEGER
--     ,decent INTEGER
--     ,high INTEGER
--     ,low INTEGER
--     ,hours_of_operation INTEGER
--     ,state CHAR(25) NOT NULL
--     ,city VARCHAR(25) NOT NULL
--     ,zip INTEGER NOT NULL
--     ,longitude DECIMAL NOT NULL
--     ,latitude DECIMAL NOT NULL
-- );


-- CREATE TABLE suggested_items (
--     id SERIAL PRIMARY KEY NOT NULL
--     ,trail INTEGER references sherpa_trails(id) NOT NULL
--     ,content text
-- );

CREATE TABLE visited (
    id SERIAL PRIMARY KEY
    ,user_visited_id INTEGER references sherpa_users(id) NOT NULL
    ,visited_trail_id INTEGER NOT NULL
    ,visit_count INTEGER
);



-- select *
-- from trail_reviews tr
-- join sherpa_profile sp
-- on tr.author_id = sp.profile_id;
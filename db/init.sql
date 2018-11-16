
CREATE TABLE sherpa_users (
    id SERIAL PRIMARY KEY NOT NULL 
    ,auth0_id TEXT UNIQUE NOT NULL
    ,user_image TEXT NOT NULL
    ,first_name VARCHAR(50)
    ,last_name VARCHAR(50)
    ,name VARCHAR(100)
    ,email VARCHAR(100)
);

CREATE TABLE visited (
    id SERIAL PRIMARY KEY
    ,user_visited_id INTEGER references sherpa_users(id) NOT NULL
    ,visited_trail_id INTEGER NOT NULL UNIQUE
    ,trail_name TEXT NOT NULL UNIQUE
    ,trail_image TEXT NOT NULL
    ,trail_location TEXT NOT NULL
    ,trail_difficulty TEXT NOT NULL
);

CREATE TABLE save_for_later (
    id SERIAL PRIMARY KEY
    ,user_saved_id INTEGER references sherpa_users(id) NOT NULL
    ,saved_trail_id INTEGER NOT NULL
    ,trail_name TEXT NOT NULL
    ,trail_image TEXT NOT NULL
    ,trail_location TEXT NOT NULL
    ,trail_difficulty TEXT NOT NULL
);

CREATE TABLE trail_reviews (
    id SERIAL PRIMARY KEY
    ,review_trail_id INTEGER NOT NULL
    ,trail_name TEXT NOT NULL
    ,trail_image TEXT
    ,title VARCHAR(50) NOT NULL
    ,time TEXT NOT NULL
    ,body TEXT NOT NULL
    ,rating DECIMAL NOT NULL
    ,author_id INTEGER REFERENCES sherpa_users(id) NOT NULL
);

/* join to find trails user has marked as visited */
select *
from visited v
join sherpa_users su
on v.user_visited_id = su.id
where v.user_visited_id = su.id;

/* join to find trails user has marked as save for later */
select *
from save_for_later sfl
join sherpa_users su
on sfl.user_saved_id = su.id
where sfl.user_saved_id = su.id;

/* conditional delete for when user already has trail in saved but marks same trail as complete */
DELETE FROM save_for_later
WHERE EXISTS
  ( SELECT 1
    FROM visited
    WHERE visited.visited_trail_id = save_for_later.saved_trail_id
AND visited.user_visited_id = $1);



















-- CREATE TABLE sherpa_users (
--     id SERIAL PRIMARY KEY NOT NULL 
--     ,auth0_id text UNIQUE NOT NULL
--     ,name VARCHAR(100)
--     ,email VARCHAR(100)
--     ,profileFinished BOOLEAN DEFAULT false
-- );


-- CREATE TABLE sherpa_profile (
--     id SERIAL PRIMARY KEY NOT NULL
--     ,profile_id INTEGER REFERENCES sherpa_users(id) NOT NULL
--     ,profilePic TEXT
--     ,bio TEXT
--     ,city VARCHAR(40)
--     ,state VARCHAR(15)
--     ,first_name VARCHAR(18) 
--     ,last_name VARCHAR(25) 
--     ,experience VARCHAR(10)
-- );

-- CREATE TABLE trail_reviews (
--     id SERIAL PRIMARY KEY
--     ,review_trail_id INTEGER NOT NULL
--     ,trail_name TEXT NOT NULL
--     ,trail_Img TEXT
--     ,title VARCHAR(50) NOT NULL
--     ,time TEXT NOT NULL
--     ,body TEXT NOT NULL
--     ,rating DECIMAL NOT NULL
--     ,author_id INTEGER REFERENCES sherpa_users(id) NOT NULL
-- );

-- select *
-- from trail_reviews tr
-- join sherpa_users su
-- on tr.author_id = su.id;
-- where tr.author_id = su.id;

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

-- CREATE TABLE visited (
--     id SERIAL PRIMARY KEY
--     ,user_visited_id INTEGER references sherpa_users(id) NOT NULL
--     ,visited_trail_id INTEGER NOT NULL
--     ,visit_count INTEGER
-- );



-- select *
-- from trail_reviews tr
-- join sherpa_profile sp
-- on tr.author_id = sp.profile_id;
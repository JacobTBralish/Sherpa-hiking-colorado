INSERT INTO trail_reviews (review_trail_id, trail_name, trail_Img, title, time, body, rating, author_id) VALUES
(${reviewTrailId}, ${trailName}, ${trailImg}, ${title}, ${time}, ${body}, ${rating}, ${authorId});
SELECT * FROM trail_reviews where review_trail_id = ${reviewTrailId};
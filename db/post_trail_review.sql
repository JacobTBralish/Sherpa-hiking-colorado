INSERT INTO trail_reviews (review_trail_id, trail_name, trail_image, title, time, body, rating, author_id) VALUES
(${review_trail_id}, ${trail_name}, ${trail_image}, ${title}, ${time}, ${body}, ${rating}, ${author_id});
SELECT * FROM trail_reviews where review_trail_id = ${review_trail_id};
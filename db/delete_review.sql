DELETE FROM trail_reviews WHERE id = $1;
SELECT * FROM trail_reviews WHERE review_trail_id = $2;
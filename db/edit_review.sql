UPDATE trail_reviews
SET user_submitted_image1 = ${user_submitted_image1},
    user_submitted_image2 = ${user_submitted_image2},
    title = ${title},
    body = ${body},
    rating = ${rating}
WHERE id = ${id};
SELECT * FROM trail_reviews WHERE review_trail_id = ${review_trail_id};
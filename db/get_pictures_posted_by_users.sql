SELECT user_submitted_image1, user_submitted_image2
FROM trail_reviews tr
WHERE tr.review_trail_id = $1;
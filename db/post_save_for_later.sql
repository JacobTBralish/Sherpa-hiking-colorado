INSERT INTO save_for_later (user_saved_id, saved_trail_id, trail_name, trail_image, trail_location, trail_difficulty)
VALUES (${user_saved_id},${saved_trail_id},${trail_name},${trail_image},${trail_location},${trail_difficulty});
-- SELECT * FROM visited where user_visited_id = ${user_visited_id};
INSERT INTO visited (user_visited_id, visited_trail_id, trail_name, trail_image, trail_location, trail_difficulty)
VALUES (${user_visited_id},${visited_trail_id},${trail_name},${trail_image},${trail_location},${trail_difficulty});
-- SELECT * FROM visited where user_visited_id = ${user_visited_id};
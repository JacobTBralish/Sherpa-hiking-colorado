UPDATE visited 
SET visit_count = visit_count + 1 
WHERE visited_trail_id =  ${visited_trail_id};
INSERT INTO visited (user_visited_id, visited_trail_id, visit_count)
SELECT ${user_visited_id}, ${visited_trail_id}, 1
WHERE NOT EXISTS (SELECT * FROM visited WHERE visited_trail_id=  ${visited_trail_id});
DELETE FROM visited 
WHERE user_visited_id = ${user_visited_id} 
and id = ${id};
SELECT * FROM visited WHERE user_visited_id = ${user_visited_id};
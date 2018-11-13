select v.visited_trail_id, v.trail_name, v.trail_image, v.trail_location, v.trail_difficulty
from visited v
join sherpa_users su
on v.user_visited_id = su.id
where v.user_visited_id = $1;
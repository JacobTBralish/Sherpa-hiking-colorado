select sfl.saved_trail_id, sfl.trail_name, sfl.trail_image, sfl.trail_location, sfl.trail_difficulty, sfl.id
from save_for_later sfl
join sherpa_users su
on sfl.user_saved_id = su.id
where sfl.user_saved_id = $1;
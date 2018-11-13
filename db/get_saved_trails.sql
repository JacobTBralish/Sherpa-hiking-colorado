select *
from save_for_later sfl
join sherpa_users su
on sfl.user_saved_id = su.id
where sfl.user_saved_id = $1;
select su.name, tr.review_trail_id, tr.title, tr.trail_Name, tr.trail_Img, tr.time, tr.body, tr.rating
from trail_reviews tr
join sherpa_users su
on tr.author_id = su.id   
join sherpa_profile sp
on sp.profile_id = su.id
where sp.profile_id = $1;
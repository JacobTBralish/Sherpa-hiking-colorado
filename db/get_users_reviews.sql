select *
from trail_reviews tr
join sherpa_users su
on tr.author_id = su.id
where tr.author_id = ${id};
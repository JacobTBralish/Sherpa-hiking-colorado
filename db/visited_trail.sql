-- UPDATE visited
-- SET visited = true
-- FROM departments
-- WHERE employees.department_id = departments.id


-- UPDATE employees
-- SET department_name = departments.name
-- FROM departments
-- WHERE employees.department_id = departments.id


select sherpa_users.id
from sherpa_users
join sherpa_trails
on sherpa_users.id = sherpa_trails;
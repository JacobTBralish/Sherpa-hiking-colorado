DELETE FROM save_for_later
WHERE EXISTS
  ( SELECT 1
    FROM visited
    WHERE save_for_later.saved_trail_id = $2
AND save_for_later.user_saved_id = $1);
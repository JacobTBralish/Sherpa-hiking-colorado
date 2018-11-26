DELETE FROM save_for_later
WHERE user_saved_id = ${user_saved_id}
and id = ${id};
SELECT * FROM save_for_later WHERE user_saved_id = ${user_saved_id};
UPDATE sherpa_users set profileFinished = true where id = $1
returning * ;
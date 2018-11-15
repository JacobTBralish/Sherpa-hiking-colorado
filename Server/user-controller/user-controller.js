
//NOT IN CODE, SAVING FOR POTENTIAL USE WITH OTHER AUTHENTICATION USES

// module.exports = {
//     changeUserInfo: (req, res) => {
//         const db = req.app.get('db');
//         const {firstName, lastName, email} = req.body;
//         const {userId} = req.params;
//         console.log('req.body: ', req.body);
//         console.log('req.params: ', req.params);

//         db.save_user_changes({id: userId, first_name: firstName, last_name: lastName, email}).then (response => {
//             res.status(200).json(response);
//             console.log('response: ', response);
//         }).catch(error => {
//             res.status(500).json(error)
//             console.log('Error updating user info in controller', error);
//         })
//     }
// }
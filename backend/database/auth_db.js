const pgPool = require('./pg_connection');

const sql = {
    REGISTER: 'INSERT INTO user_data (username, password_hash) VALUES ($1, $2) RETURNING user_id, username',
    GET_PASSWORD: 'SELECT password_hash FROM user_data WHERE username=$1',
    DELETE_USER: 'DELETE FROM user_data WHERE username = $1',
};

async function register(username, password_hash) {
    const result = await pgPool.query(
        sql.REGISTER,
        [username, password_hash]
    );
    return result.rowCount > 0 ? result.rows[0] :  null;
}

async function getPassword(username){
    const result = await pgPool.query(sql.GET_PASSWORD, [username]);
    return result.rowCount > 0 ? result.rows[0].password_hash : null;

}
async function deleteUser(username){
    await pgPool.query(sql.DELETE_USER,[username]);
}

module.exports = {register, getPassword, deleteUser};


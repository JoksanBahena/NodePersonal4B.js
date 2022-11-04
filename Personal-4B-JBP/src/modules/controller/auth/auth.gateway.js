const {query} = require ("../../../utils/mysql");
const {validatePassword} = require ("../../../utils/functions");
const {generatedToken} = require ("../../../config/jwt")

const login = async (user) => {
    if (!user.email || user.password) throw Error("Missing fields");
    const sql = `SELECT * FROM users WHERE email = ? AND status = 1;`;
    const existsUser = query (sql, [user.email]);

    if (validatePassword(user.password, existsUser[0].password))
        return generatedToken({
            id: user.id,
            email: user.email,
            role: user.role,
            isLogged: true,
        });
    throw Error("Password missmatch");

};

module.exports = {
    login
}
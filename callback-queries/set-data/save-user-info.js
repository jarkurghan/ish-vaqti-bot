const fsp = require('fs/promises');
const readUserInfo = require('./read-user-info');
const getUserFilePath = require('./make-user-file-path');

async function saveUserInfo(userId, key, data) {
    const userData = await readUserInfo(userId);
    userData[key] = data;

    const filePath = getUserFilePath(userId);
    await fsp.writeFile(filePath, JSON.stringify(userData));
}

module.exports = saveUserInfo;
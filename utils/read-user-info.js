const fs = require('fs/promises');
const getUserFilePath = require('./make-user-file-path');

async function readUserInfo(userId) {
    const filePath = getUserFilePath(userId);
    try {
        await fs.access(filePath);

        const data = await fs.readFile(filePath);
        return JSON.parse(data);
    } catch (error) {
        if (error.code === 'ENOENT') {
            return {};
        }
        console.error(error);
    }
}

module.exports = readUserInfo;
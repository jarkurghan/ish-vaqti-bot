const fs = require('fs/promises');
const getUserFilePath = require('./make-user-file-path');

async function clearInfo(userId) {
    const filePath = getUserFilePath(userId);
    await fs.unlink(filePath);
}

module.exports = clearInfo;
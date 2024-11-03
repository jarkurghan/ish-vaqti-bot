const path = require("path");

function getUserFilePath(userId) {
    return path.join(__dirname, `../data/${userId}.json`);
}

module.exports = getUserFilePath;
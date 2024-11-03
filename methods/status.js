const check = require("../utils/check-status");
const convertUTCTime = require("../utils/convert-utc-time");
const nowMinutes = require("../utils/now-minutes");
const readUserInfo = require("../utils/read-user-info");

async function status(bot, msg) {
    try {
        const chatId = msg.chat.id;

        if (msg.chat.type === 'group' || msg.chat.type === 'supergroup') {
            const admins = await bot.getChatAdministrators(chatId);

            let listString = "\n\n";

            for (let i = 0; i < admins.length; i++) {
                const user = admins[i].user;
                let name = user.first_name;
                if (user.last_name) name += " " + user.last_name;

                const data = await readUserInfo(user.id);
                let dataString = "";
                if (data.utc) {
                    dataString += ": ";

                    const now = convertUTCTime(-(new Date().getTimezoneOffset()), data.utc, nowMinutes())
                    const stat = check(now, data);
                    dataString += stat;
                }

                if (dataString) {
                    listString += name;
                    listString += dataString;
                    listString += "\n";
                }
            }

            await bot.sendMessage(chatId, `Hozirgi vaqtda:${listString}`);
        }
    } catch (error) {
        console.log(error);
    }
}

module.exports = status;
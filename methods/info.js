const convertMinutesToTime = require("../utils/convert-minut-to-time");
const readUserInfo = require("../utils/read-user-info");

async function status(bot, msg) {
    try {
        const chatId = msg.chat.id;

        if (msg.chat.type === 'group' || msg.chat.type === 'supergroup') {
            const admins = await bot.getChatAdministrators(chatId);

            for (let i = 0; i < admins.length; i++) {
                const user = admins[i].user;
                let name = user.first_name;
                if (user.last_name) name += " " + user.last_name;

                const data = await readUserInfo(user.id);
                let dataString = "";
                if (data.utc) {
                    dataString += name;
                    dataString += "\n\n";
                    if (data.ish_kunlari) {
                        dataString += "Ish kunlari: " + data.ish_kunlari.join(", ") + "\n";
                    }
                    if (data.ish_tugash_vaqti) {
                        dataString += "Ish boshlanish vaqti: " + convertMinutesToTime(data.ish_boshlanish_vaqti) + "\n";
                        dataString += "Ish tugash vaqti: " + convertMinutesToTime(data.ish_tugash_vaqti) + "\n";
                    }
                    if (data.abet_tugash_vaqti) {
                        dataString += "Abet boshlanish vaqti: " + convertMinutesToTime(data.abet_boshlanish_vaqti) + "\n";
                        dataString += "Abet tugash vaqti: " + convertMinutesToTime(data.abet_tugash_vaqti) + "\n";
                    }

                    await bot.sendMessage(chatId, dataString);
                }
            }

        }
    } catch (error) {
        console.log(error);
    }
}

module.exports = status;
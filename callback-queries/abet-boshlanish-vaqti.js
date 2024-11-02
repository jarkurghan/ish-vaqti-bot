const chunkArray = require("./set-data/chunk-inline-keyboard");
const saveUserInfo = require("./set-data/save-user-info");

async function abetBoshlanishVaqti(bot, query) {
    try {
        const chat_id = query.message.chat.id;
        const message_id = query.message.message_id;
        const selectedTime = query.data.replace('abet_start_time_', '');

        await saveUserInfo(chat_id, "abet_boshlanish_vaqti", selectedTime)
        await bot.editMessageText('Abet boshlanish vaqti nechi?\n\nJavob: ' + selectedTime, { chat_id, message_id });

        const now = new Date();
        now.setHours(7, 0, 0, 0)
        let options = [];

        for (let i = 0; i < 24; i++) {
            const date = new Date(now.getTime() + i * 60 * 60 * 1000);
            const timeString = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            options.push({ text: timeString, callback_data: `abet_end_time_${timeString}` });
        }

        await bot.sendMessage(chat_id, 'Abet tugash vaqti nechi?', {
            reply_markup: {
                inline_keyboard: chunkArray(options, 4)
            }
        });

    } catch (error) {
        console.log(error);
    }
}

module.exports = abetBoshlanishVaqti;
const saveUserInfo = require("./set-data/save-user-info");

async function abetTugashVaqti(bot, query) {
    try {
        const chat_id = query.message.chat.id;
        const message_id = query.message.message_id;
        const selectedTime = query.data.replace('abet_end_time_', '');

        await saveUserInfo(chat_id, "abet_tugash_vaqti", selectedTime)
        await bot.editMessageText('Abet tugash vaqti nechi?\n\nJavob: ' + selectedTime, { chat_id, message_id });

        await bot.sendMessage(chat_id, 'Ma\'lumotlar saqlandi ✅');

    } catch (error) {
        console.log(error);
    }
}

module.exports = abetTugashVaqti;
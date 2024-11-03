const convertMinutesToTime = require("../utils/convert-minut-to-time");
const saveUserInfo = require("../utils/save-user-info");

async function ishTugashVaqti(bot, query) {
    try {
        const chat_id = query.message.chat.id;
        const message_id = query.message.message_id;
        const selectedTime = (query.data.replace('work_end_time_', ''));
        const time = convertMinutesToTime(query.data.replace('work_end_time_', ''));

        await saveUserInfo(chat_id, "ish_tugash_vaqti", selectedTime);

        await bot.editMessageText('Ishingizning tugash vaqti nechi?\n\nJavob: ' + time, { chat_id, message_id });

        await bot.sendMessage(chat_id, 'Ishingizda abet vaqti bormi? (tanaffus hisobida)', {
            reply_markup: { inline_keyboard: [[{ text: 'Ha', callback_data: 'abet_bor' }, { text: 'Yo\'q', callback_data: 'abet_yo_q' }]] }
        });

    } catch (error) {
        console.log(error);
    }
}

module.exports = ishTugashVaqti;
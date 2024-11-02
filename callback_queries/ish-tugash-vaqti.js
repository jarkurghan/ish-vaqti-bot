const saveUserInfo = require("./set-data/save-user-info");

async function ishTugashVaqti(bot, query) {
    try {
        const chat_id = query.message.chat.id;
        const message_id = query.message.message_id;
        const selectedTime = query.data.replace('work_end_time_', '');

        await saveUserInfo(chat_id, "ish_tugash_vaqti", selectedTime);

        await bot.editMessageText('Ishingizning tugash vaqti nechi?:\n\nJavob: ' + selectedTime, { chat_id, message_id });


        const now = new Date();
        now.setHours(7, 0, 0, 0)
        let options = [];

        for (let i = 0; i < 24; i++) {
            const date = new Date(now.getTime() + i * 60 * 60 * 1000);
            const timeString = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            options.push({ text: timeString, callback_data: `work_end_time_${timeString}` });
        }

        await bot.sendMessage(chat_id, 'Ishingizda abet vaqti bormi? (tanaffus hisobida)', {
            reply_markup: { inline_keyboard: [[{ text: 'Ha', callback_data: 'abet bor' }, { text: 'Yo\'q', callback_data: 'abet yo\'q' }]] }
        });

    } catch (error) {
        console.log(error);
    }
}

module.exports = ishTugashVaqti;
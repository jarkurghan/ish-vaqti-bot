const chunkArray = require("../utils/chunk-inline-keyboard");

function ishVaqtiniKiritish(bot, query) {
    try {
        const chat_id = query.message.chat.id;
        const message_id = query.message.message_id;

        bot.editMessageText('Ish vaqtingizni kiritishni xohlaysizmi?\n\nJavob: Ha', {
            chat_id,
            message_id
        });


        const now = new Date();
        let options = [];

        for (let i = 0; i < 48; i++) {
            const date = new Date(now.getTime() + i * 30 * 60 * 1000);
            const time = date.toTimeString().slice(0, 5);
            const timeMinutes = parseInt(time.slice(0, 2)) * 60 + parseInt(time.slice(3, 5));
            options.push({ text: time, callback_data: `city_time_${timeMinutes}` });
        }

        bot.sendMessage(chat_id, 'Hozir sizda soat nechi?', {
            reply_markup: {
                inline_keyboard: chunkArray(options, 4)
            }
        });

    } catch (error) {
        console.log(error);
    }
}

module.exports = ishVaqtiniKiritish;
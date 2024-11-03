const chunkArray = require("../utils/chunk-inline-keyboard");

async function abetVaqti(bot, query) {
    try {
        const chat_id = query.message.chat.id;
        const message_id = query.message.message_id;

        await bot.deleteMessage(chat_id, message_id)

        const now = new Date();
        now.setHours(7, 0, 0, 0)
        let options = [];

        for (let i = 0; i < 24; i++) {
            const date = new Date(now.getTime() + i * 60 * 60 * 1000);
            const time = date.toTimeString().slice(0, 5);
            const timeMinutes = parseInt(time.slice(0, 2)) * 60 + parseInt(time.slice(3, 5));
            options.push({ text: time, callback_data: `abet_start_time_${timeMinutes}` });
        }

        await bot.sendMessage(chat_id, 'Abet boshlanish vaqti nechi?', {
            reply_markup: {
                inline_keyboard: chunkArray(options, 4)
            }
        });

    } catch (error) {
        console.log(error);
    }
}

module.exports = abetVaqti;
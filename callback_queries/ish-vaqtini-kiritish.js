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

        const chunkArray = (array, size) => {
            const result = [];
            for (let i = 0; i < array.length; i += size) {
                result.push(array.slice(i, i + size));
            }
            return result;
        }

        for (let i = 0; i < 48; i++) {
            const date = new Date(now.getTime() + i * 30 * 60 * 1000);
            const timeString = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            options.push({ text: timeString, callback_data: `city_time_${timeString}` });
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
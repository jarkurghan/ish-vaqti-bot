function start(bot, msg) {
    try {
        if (msg.chat.type === 'private') {
            const chatId = msg.chat.id;
            bot.sendMessage(chatId, 'Salom! Botga xush kelibsiz!');

            bot.sendMessage(chatId, 'Ish vaqtingizni kiritishni xohlaysizmi?', {
                reply_markup: {
                    inline_keyboard: [
                        [
                            { text: 'Ha', callback_data: 'Ish vaqtini kiritish' },
                            { text: 'Yo\'q', callback_data: 'Ish vaqtini kiritmaslik' }
                        ]
                    ]
                }
            });
        }

    } catch (error) {
        console.log(error);
    }
}

module.exports = start;
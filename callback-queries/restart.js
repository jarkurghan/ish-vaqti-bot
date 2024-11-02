async function restart(bot, msg) {
    try {
        if (msg.chat.type === 'private') {
            const chatId = msg.chat.id;

            await bot.sendMessage(chatId, 'Ish vaqtingizni kiritishni xohlaysizmi?', {
                reply_markup: {
                    inline_keyboard: [
                        [
                            { text: 'Ha', callback_data: 'ish-vaqtini-kiritish' },
                            { text: 'Yo\'q', callback_data: 'ish-vaqtini-kiritmaslik' }
                        ]
                    ]
                }
            });
        }

    } catch (error) {
        console.log(error);
    }
}

module.exports = restart;
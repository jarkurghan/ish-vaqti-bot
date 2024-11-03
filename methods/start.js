async function start(bot, msg) {
    try {
        if (msg.chat.type === 'private') {
            replyMenu = {
                reply_markup: {
                    keyboard: [
                        [{ text: 'Ma\'lumotlarni tozalash' }],
                    ],
                    resize_keyboard: true,
                    one_time_keyboard: true
                }
            };

            const chatId = msg.chat.id;

            await bot.sendMessage(chatId, 'Salom! Botga xush kelibsiz!', replyMenu);

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

module.exports = start;
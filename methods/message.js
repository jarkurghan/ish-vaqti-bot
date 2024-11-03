const malumotlarniTozalash = require("./ma_lumotlarni_tozalash");

async function message(bot, msg) {
    try {
        if (msg.chat.type === 'private' && !msg.text.startsWith("/")) {
            const chatId = msg.chat.id;

            switch (msg.text) {
                case 'Ma\'lumotlarni tozalash':
                    return await malumotlarniTozalash(bot, chatId);
            }

            await bot.sendMessage(chatId, 'Kerakli menyuni tanlang!');
        }

    } catch (error) {
        console.log(error);
    }
}

module.exports = message;
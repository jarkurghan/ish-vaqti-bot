async function status(bot, msg) {
    try {
        const chatId = msg.chat.id;

        if (msg.chat.type === 'group' || msg.chat.type === 'supergroup') {
            bot.sendMessage(chatId, 'Bu bot sizga hafta kunlarini tanlash, shuningdek ixtiyoriy matnlarga javob berish imkonini beradi.');
        }
    } catch (error) {
        console.log(error);
    }
}

module.exports = status;
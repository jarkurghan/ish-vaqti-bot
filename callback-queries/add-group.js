async function addGroup(bot, msg) {
    try {
        const chatId = msg.chat.id;

        bot.sendMessage(chatId, 'Quyidagi buyruqlar mavjud:\n/info - ish vaqtini ko\'rish');
    } catch (error) {
        console.log(error);
    }
}

module.exports = addGroup;
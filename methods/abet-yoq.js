async function abetYoq(bot, query) {
    try {
        const chat_id = query.message.chat.id;
        const message_id = query.message.message_id;

        await bot.editMessageText('Ishingizda abet vaqti bormi?\n\nJavob: Yo\'q', { chat_id, message_id });
        await bot.sendMessage(chat_id, 'Ma\'lumotlar saqlandi ✅');
    } catch (error) {
        console.log(error);
    }
}

module.exports = abetYoq;
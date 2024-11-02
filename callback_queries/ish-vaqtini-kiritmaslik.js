function ishVaqtiniKiritmaslik(bot, query) {
    try {
        const chat_id = query.message.chat.id;
        const message_id = query.message.message_id;

        bot.editMessageText('Ish vaqtingizni kiritishni xohlaysizmi?\n\nJavob: Yo\'q', {
            chat_id,
            message_id
        });

    } catch (error) {
        console.log(error);
    }
}

module.exports = ishVaqtiniKiritmaslik;
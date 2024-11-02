const chunkArray = require("./set-data/chunk-inline-keyboard");
const readUserInfo = require("./set-data/read-user-info");

async function ishKunlariniTanlashFinish(bot, query) {
    try {
        const chat_id = query.message.chat.id;
        const message_id = query.message.message_id;
        const selectedDays = (await readUserInfo(chat_id)).ish_kunlari || [];

        await bot.editMessageText('Quyidagi hafta kunlaridan bir nechtasini tanlang:\n\nJavob: ' + selectedDays.join(", "), {
            chat_id,
            message_id
        });


        const now = new Date();
        now.setHours(7, 0, 0, 0)
        let options = [];

        for (let i = 0; i < 24; i++) {
            const date = new Date(now.getTime() + i * 60 * 60 * 1000);
            const timeString = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            options.push({ text: timeString, callback_data: `work_start_time_${timeString}` });
        }

        await bot.sendMessage(chat_id, 'Ishingizning boshlanish vaqti nechi?', {
            reply_markup: { inline_keyboard: chunkArray(options, 4) }
        });

    } catch (error) {
        console.log(error);
    }
}

module.exports = ishKunlariniTanlashFinish;
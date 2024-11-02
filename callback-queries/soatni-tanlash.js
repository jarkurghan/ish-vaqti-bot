const chunkArray = require("./set-data/chunk-inline-keyboard");
const daysOfWeek = require("./set-data/days-of-week");
const readUserInfo = require("./set-data/read-user-info");

async function soatniTanlash(bot, query) {
    try {
        const chat_id = query.message.chat.id;
        const message_id = query.message.message_id;

        const time = query.data.slice("city_time_".length)

        await bot.editMessageText('Hozir sizda soat nechi?\n\nJavob: ' + time, { chat_id, message_id });

        const selectedDays = (await readUserInfo(chat_id)).ish_kunlari || [];
        const days = daysOfWeek.map(e => ({ ...e, text: e.text + (selectedDays.includes(e.text) ? " ✅" : "") }));

        await bot.sendMessage(chat_id, 'Quyidagi hafta kunlaridan bir nechtasini tanlang:', {
            reply_markup: { inline_keyboard: chunkArray(days, 1).concat([[{ text: 'Tayyor', callback_data: 'work_day_finish' }]]) }
        });

    } catch (error) {
        console.log(error);
    }
}

module.exports = soatniTanlash;
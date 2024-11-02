const chunkArray = require("./set-data/chunk-inline-keyboard");
const daysOfWeek = require("./set-data/days-of-week");
const readUserInfo = require("./set-data/read-user-info");
const saveUserInfo = require("./set-data/save-user-info");

async function ishKunlariniTanlash(bot, query) {
    try {
        const chatId = query.message.chat.id;
        const selectedData = query.data;
        const selectedDay = selectedData.replace('work_day_', '');
        const selectedDays = (await readUserInfo(chatId)).ish_kunlari || [];

        if (!selectedDays.includes(selectedDay)) selectedDays.push(selectedDay);
        else selectedDays.splice(selectedDays.indexOf(selectedDay), 1);
        await saveUserInfo(chatId, "ish_kunlari", selectedDays);

        const days = daysOfWeek.map(e => ({ ...e, text: e.text + (selectedDays.includes(e.text) ? " ✅" : "") }));

        await bot.editMessageText('Quyidagi hafta kunlaridan bir nechtasini tanlang:', {
            chat_id: chatId,
            message_id: query.message.message_id,
            reply_markup: {
                inline_keyboard: chunkArray(days, 1).concat([[{ text: 'Tayyor', callback_data: 'work_day_finish' }]])
            }
        });
    } catch (error) {
        console.log(error);
    }
}

module.exports = ishKunlariniTanlash;
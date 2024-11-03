const chunkArray = require("../utils/chunk-inline-keyboard");
const convertMinutesToTime = require("../utils/convert-minut-to-time");
const daysOfWeek = require("../utils/days-of-week");
const readUserInfo = require("../utils/read-user-info");
const saveUserInfo = require("../utils/save-user-info");

async function soatniTanlash(bot, query) {
    try {
        const chat_id = query.message.chat.id;
        const message_id = query.message.message_id;
        const time = convertMinutesToTime(query.data.slice("city_time_".length));
        const selectedTime = (query.data.slice("city_time_".length));

        // convert
        const userHour = Math.floor(selectedTime / 60);
        const userMinute = selectedTime % 60;

        const userDate = new Date();
        userDate.setUTCHours(userHour, userMinute, 0);

        const utcDate = new Date();
        utcDate.setUTCHours(utcDate.getUTCHours(), utcDate.getUTCMinutes(), 0);

        const timeDifference = userDate.getTime() - utcDate.getTime();
        const minutesDifference = Math.floor(timeDifference / (1000 * 60));

        await saveUserInfo(chat_id, "utc", minutesDifference);
        await bot.editMessageText('Hozir sizda soat nechi?\n\nJavob: ' + time, { chat_id, message_id });

        const selectedDays = (await readUserInfo(chat_id)).ish_kunlari || [];
        const days = daysOfWeek.map(e => ({ ...e, text: e.text + (selectedDays.includes(e.text) ? " ✅" : "") }));

        await bot.sendMessage(chat_id, 'Ish kunlaringizni belgilang:', {
            reply_markup: { inline_keyboard: chunkArray(days, 1).concat([[{ text: 'Tayyor', callback_data: 'work_day_finish' }]]) }
        });

    } catch (error) {
        console.log(error);
    }
}

module.exports = soatniTanlash;
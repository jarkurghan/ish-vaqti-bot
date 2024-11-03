const clearInfo = require("../utils/clear-info");

async function malumotlarniTozalash(bot, chat_id) {
    try {
        await clearInfo(chat_id);

        await bot.sendMessage(chat_id, 'Siz haqingizdagi barcha ma\'lumotlar o\'chirib yuborildi ✅');

        return 0;
    } catch (error) {
        console.log(error);
    }
}

module.exports = malumotlarniTozalash;
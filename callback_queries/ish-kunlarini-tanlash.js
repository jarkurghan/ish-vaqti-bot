const fs = require('fs');
const path = require('path');

const daysOfWeek = [
    { text: 'Dushanba', callback_data: 'work_day_Dushanba' },
    { text: 'Seshanba', callback_data: 'work_day_Seshanba' },
    { text: 'Chorshanba', callback_data: 'work_day_Chorshanba' },
    { text: 'Payshanba', callback_data: 'work_day_Payshanba' },
    { text: 'Juma', callback_data: 'work_day_Juma' },
    { text: 'Shanba', callback_data: 'work_day_Shanba' },
    { text: 'Yakshanba', callback_data: 'work_day_Yakshanba' },
];


function chunkArray(array, size) {
    const result = [];
    for (let i = 0; i < array.length; i += size) {
        result.push(array.slice(i, i + size));
    }
    return result;
}

function getUserFilePath(userId) {
    return path.join(__dirname, `../data/${userId}.json`);
}

// Foydalanuvchi faylini o'qish
function readUserSelections(userId) {
    const filePath = getUserFilePath(userId);
    if (fs.existsSync(filePath)) {
        const data = fs.readFileSync(filePath);
        return JSON.parse(data);
    }
    return [];
}

const fsp = require('fs/promises');

async function saveUserSelections(userId, selections) {
    const filePath = getUserFilePath(userId);
    await fsp.writeFile(filePath, JSON.stringify(selections));
}

async function ishKunlariniTanlash(bot, query) {
    try {
        const chatId = query.message.chat.id;

        const selectedData = query.data;
        let userSelections = readUserSelections(chatId);

        const selectedDay = selectedData.replace('work_day_', '');

        // yozish
        if (!userSelections.includes(selectedDay)) userSelections.push(selectedDay);
        else userSelections.splice(userSelections.indexOf(selectedDay), 1);
        await saveUserSelections(chatId, userSelections);

        const days = daysOfWeek.map(e => ({ ...e, text: e.text + (userSelections.includes(e.text) ? " ✅" : "") }));

        await bot.editMessageText('Quyidagi hafta kunlaridan bir nechtasini tanlang:', {
            chat_id: chatId,
            message_id: query.message.message_id,
            reply_markup: {
                inline_keyboard: chunkArray(days, 1).concat([[{ text: 'Tugatish', callback_data: 'work_day_finish' }]])
            }
        });
    } catch (error) {
        console.log(error);
    }
}

module.exports = ishKunlariniTanlash;
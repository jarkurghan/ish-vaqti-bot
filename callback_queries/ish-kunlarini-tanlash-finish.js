const fs = require('fs');
const path = require('path');

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


function ishKunlariniTanlashFinish(bot, query) {
    try {
        const chat_id = query.message.chat.id;
        const message_id = query.message.message_id;
        const userSelections = readUserSelections(chat_id);

        bot.editMessageText('Quyidagi hafta kunlaridan bir nechtasini tanlang:\n\nJavob: ' + userSelections.join(", "), {
            chat_id,
            message_id
        });


        const now = new Date();
        now.setHours(7, 0, 0, 0)
        let options = [];

        const chunkArray = (array, size) => {
            const result = [];
            for (let i = 0; i < array.length; i += size) {
                result.push(array.slice(i, i + size));
            }
            return result;
        }

        for (let i = 0; i < 24; i++) {
            const date = new Date(now.getTime() + i * 60 * 60 * 1000);
            const timeString = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            options.push({ text: timeString, callback_data: `work_start_time_${timeString}` });
        }

        bot.sendMessage(chat_id, 'Ishingizning boshlanish vaqti nechi?', {
            reply_markup: {
                inline_keyboard: chunkArray(options, 4)
            }
        });

    } catch (error) {
        console.log(error);
    }
}

module.exports = ishKunlariniTanlashFinish;
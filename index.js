require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');
const ishVaqtiniKiritish = require('./callback_queries/ish-vaqtini-kiritish');
const ishVaqtiniKiritmaslik = require('./callback_queries/ish-vaqtini-kiritmaslik');
const soatniTanlash = require('./callback_queries/soatni-tanlash');
const start = require('./callback_queries/start');
const ishKunlariniTanlash = require('./callback_queries/ish-kunlarini-tanlash');
const ishKunlariniTanlashFinish = require('./callback_queries/ish-kunlarini-tanlash-finish');
const ishBoshlanishVaqti = require('./callback_queries/ish-boshlanish-vaqti');
const ishTugashVaqti = require('./callback_queries/ish-tugash-vaqti');

const token = process.env.TELEGRAM_TOKEN;
const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/start/, (msg) => start(bot, msg));

bot.on('callback_query', (query) => {
    console.log(query.data);

    if (query.data === 'Ish vaqtini kiritish') ishVaqtiniKiritish(bot, query);
    else if (query.data === 'Ish vaqtini kiritmaslik') ishVaqtiniKiritmaslik(bot, query);
    else if (query.data.startsWith("city_time_")) soatniTanlash(bot, query)
    else if (query.data === 'work_day_finish') ishKunlariniTanlashFinish(bot, query);
    else if (query.data.startsWith("work_day_")) ishKunlariniTanlash(bot, query)
    else if (query.data.startsWith("work_start_time_")) ishBoshlanishVaqti(bot, query)
    else if (query.data.startsWith("work_end_time_")) ishTugashVaqti(bot, query)
    // else if (query.data.startsWith("abet bor")) ishTugashVaqti(bot, query)
    // else if (query.data.startsWith("abet yo'q")) ishTugashVaqti(bot, query)
})
require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');
const start = require('./callback-queries/start');
const ishVaqtiniKiritish = require('./callback-queries/ish-vaqtini-kiritish');
const ishVaqtiniKiritmaslik = require('./callback-queries/ish-vaqtini-kiritmaslik');
const soatniTanlash = require('./callback-queries/soatni-tanlash');
const ishKunlariniTanlash = require('./callback-queries/ish-kunlarini-tanlash');
const ishKunlariniTanlashFinish = require('./callback-queries/ish-kunlarini-tanlash-finish');
const ishBoshlanishVaqti = require('./callback-queries/ish-boshlanish-vaqti');
const ishTugashVaqti = require('./callback-queries/ish-tugash-vaqti');
const abetVaqti = require('./callback-queries/abet-vaqti');
const abetYoq = require('./callback-queries/abet-yoq');
const abetBoshlanishVaqti = require('./callback-queries/abet-boshlanish-vaqti');
const abetTugashVaqti = require('./callback-queries/abet-tugash-vaqti');
const restart = require('./callback-queries/restart');

const token = process.env.TELEGRAM_TOKEN;
const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/start/, (msg) => start(bot, msg));

bot.on('callback_query', (query) => {
    console.log(query.data);
    if (query.data === 'ish-vaqtini-kiritish') ishVaqtiniKiritish(bot, query);
    else if (query.data === 'ish-vaqtini-kiritmaslik') ishVaqtiniKiritmaslik(bot, query);
    else if (query.data.startsWith("city_time_")) soatniTanlash(bot, query)
    else if (query.data === 'work_day_finish') ishKunlariniTanlashFinish(bot, query);
    else if (query.data.startsWith("work_day_")) ishKunlariniTanlash(bot, query)
    else if (query.data.startsWith("work_start_time_")) ishBoshlanishVaqti(bot, query)
    else if (query.data.startsWith("work_end_time_")) ishTugashVaqti(bot, query)
    else if (query.data.startsWith("abet bor")) abetVaqti(bot, query)
    else if (query.data.startsWith("abet yo'q")) abetYoq(bot, query)
    else if (query.data.startsWith("abet_start_time_")) abetBoshlanishVaqti(bot, query)
    else if (query.data.startsWith("abet_end_time_")) abetTugashVaqti(bot, query)
})


bot.on('message', (msg) => restart(bot, msg));
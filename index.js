require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');
const start = require('./methods/start');
const ishVaqtiniKiritish = require('./methods/ish-vaqtini-kiritish');
const ishVaqtiniKiritmaslik = require('./methods/ish-vaqtini-kiritmaslik');
const soatniTanlash = require('./methods/soatni-tanlash');
const ishKunlariniTanlash = require('./methods/ish-kunlarini-tanlash');
const ishKunlariniTanlashFinish = require('./methods/ish-kunlarini-tanlash-finish');
const ishBoshlanishVaqti = require('./methods/ish-boshlanish-vaqti');
const ishTugashVaqti = require('./methods/ish-tugash-vaqti');
const abetVaqti = require('./methods/abet-vaqti');
const abetYoq = require('./methods/abet-yoq');
const abetBoshlanishVaqti = require('./methods/abet-boshlanish-vaqti');
const abetTugashVaqti = require('./methods/abet-tugash-vaqti');
const message = require('./methods/message');
const addGroup = require('./methods/add-group');
const info = require('./methods/info');
const status = require('./methods/status');

const token = process.env.TELEGRAM_TOKEN;
const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/start/, (msg) => start(bot, msg));
bot.on('message', (msg) => message(bot, msg));

bot.on('new_chat_members', (msg) => addGroup(bot, msg));
bot.onText(/\/info/, (msg) => info(bot, msg));
bot.onText(/\/status/, (msg) => status(bot, msg));

bot.on('callback_query', (query) => {
    console.log(query.data);
    if (query.data === 'ish-vaqtini-kiritish') ishVaqtiniKiritish(bot, query);
    else if (query.data === 'ish-vaqtini-kiritmaslik') ishVaqtiniKiritmaslik(bot, query);
    else if (query.data.startsWith("city_time_")) soatniTanlash(bot, query)
    else if (query.data === 'work_day_finish') ishKunlariniTanlashFinish(bot, query);
    else if (query.data.startsWith("work_day_")) ishKunlariniTanlash(bot, query)
    else if (query.data.startsWith("work_start_time_")) ishBoshlanishVaqti(bot, query)
    else if (query.data.startsWith("work_end_time_")) ishTugashVaqti(bot, query)
    else if (query.data.startsWith("abet_bor")) abetVaqti(bot, query)
    else if (query.data.startsWith("abet_yo_q")) abetYoq(bot, query)
    else if (query.data.startsWith("abet_start_time_")) abetBoshlanishVaqti(bot, query)
    else if (query.data.startsWith("abet_end_time_")) abetTugashVaqti(bot, query)
})

const convertTime = require("./convert-time");

function check(now, data) {
    const days = ['Yakshanba', 'Dushanba', 'Seshanba', 'Chorshanba', 'Payshanba', 'Juma', 'Shanba'];
    const offset = data.utc + (new Date().getTimezoneOffset());
    const nowTime = new Date(new Date().getTime() + offset * 60 * 1000);
    const dayIndex = nowTime.getDay();
    const ish_kunlari = data.ish_kunlari || [];
    if (!ish_kunlari.includes(days[dayIndex])) {
        return "bugun damda"
    };

    const abv = data.abet_boshlanish_vaqti;
    const atv = data.abet_tugash_vaqti;
    const abetda = abv <= now && now < atv
    if (abetda) {
        return "abetda, " + convertTime(atv - now) + "dan keyin abet vaqti tugab ishga qaytadi";
    }

    const ibv = data.ish_boshlanish_vaqti;
    const itv = data.ish_tugash_vaqti;
    const ishda = ibv <= now && now < itv
    if (ishda) {
        if (abv > now)
            return "ishda, " + convertTime(abv - now) + "dan keyin abetga chiqadi";
        return "ishda, " + convertTime(itv - now) + "dan keyin ishdan chiqadi";
    }

    if (ibv - now < 180) {
        return "damda, " + convertTime(itv - now) + "dan keyin ishi boshlanadi";
    }
    if (now - itv < 180) {
        return "damda, ishi tugaganiga " + convertTime(itv - now) + " bo'ldi";
    }

    return "damda";
}

module.exports = check;
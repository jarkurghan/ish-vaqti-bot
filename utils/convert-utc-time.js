function convertUTCTime(utc1, utc2, time) {
    // console.log(-(new Date().getTimezoneOffset()));

    // const [hours, minutes] = time.split(':').map(Number);
    const hours = Math.floor(time / 60);
    const minutes = time % 60;
    const utc1Date = new Date(Date.UTC(2000, 0, 1, hours, minutes));
    const offset = utc2 / 60 - utc1 / 60;

    const convertedDate = new Date(utc1Date.getTime() + offset * 60 * 60 * 1000);

    const convertedHours = convertedDate.getUTCHours();
    const convertedMinutes = convertedDate.getUTCMinutes();
    return convertedHours * 60 + convertedMinutes;

    // const convertedHours = String(convertedDate.getUTCHours()).padStart(2, '0');
    // const convertedMinutes = String(convertedDate.getUTCMinutes()).padStart(2, '0');
    // return `${convertedHours}:${convertedMinutes}`;
}


module.exports = convertUTCTime;
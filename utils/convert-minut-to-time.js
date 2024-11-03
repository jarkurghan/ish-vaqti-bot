function convertMinutesToTime(minutes) {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;

    const formattedTime = `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}`;

    return formattedTime;
}

module.exports = convertMinutesToTime;
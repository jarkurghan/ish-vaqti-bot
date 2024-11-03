function convertTime(minut) {
    const minutes = minut % 60;
    const hours = Math.floor(minut / 60);
    let text = "";
    if (hours > 0) text += hours + " soat";
    if (minutes > 0) text += " " + minutes + " daqiqa";
    return text;
}

module.exports = convertTime;
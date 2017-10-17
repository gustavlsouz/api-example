exports.capitalize = (string) => {
    return string.replace(/(?:^|\s)\S/g, l => l.toUpperCase());
};
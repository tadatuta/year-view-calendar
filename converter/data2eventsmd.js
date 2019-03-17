function DDMM(dateString) {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;

    return [(day < 10 ? '0' : '') + day, (month < 10 ? '0' : '') + month].join('.');
}
require('fs').writeFileSync('events.md', require('./src/data').reduce((acc, event) => {
    if (!event.start) return acc;
    const eventStartStr = DDMM(event.start);
    const eventEndStr = DDMM(event.end);

    const interval = eventStartStr === eventEndStr ? eventStartStr : `${eventStartStr}-${eventEndStr}`;

    const result = [interval];

    event.summary && result.push(!event.summary.endsWith('.') && event.description ? event.summary + '.' : event.summary);
    event.description && result.push(event.description);

    acc.push(result.join(' '));

    return acc;
}, []).join('\n'));

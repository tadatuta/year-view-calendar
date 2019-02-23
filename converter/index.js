const fs = require('fs');
const ical = require('ical');
const data = ical.parseFile('./family.ics');
// const data = ical.parseFile('./calendar.ics');

for (let event of Object.values(data)) {
    console.log(`event`, event);
}

fs.writeFile('data.json', JSON.stringify(Object.values(data), null, 2));

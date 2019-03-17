const fs = require('fs');

fs.writeFileSync('src/events.js', 'export default `' + fs.readFileSync('events.md', 'utf8') + '`');

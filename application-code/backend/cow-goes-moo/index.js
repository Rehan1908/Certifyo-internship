const os = require('os');

console.log('Platform:', os.platform()); // e.g. 'linux', 'win32'
console.log('CPU architecture:', os.arch());
console.log('Home directory:', os.homedir());

const cpus = os.cpus();
console.log(`Number of CPU cores: ${cpus.length}`);
console.log(`CPU model: ${cpus[0].model}`);

console.log(`System uptime (seconds): ${os.uptime()}`);

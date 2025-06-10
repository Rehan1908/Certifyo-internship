const path = require('path');

const fullPath = '/users/rehan/projects/index.js';

console.log(path.basename(fullPath));   
console.log(path.dirname(fullPath));    
console.log(path.extname(fullPath));    

const newPath = path.join(__dirname, 'data', 'file.txt');
console.log(newPath);

const absPath = path.resolve('data', 'file.txt');
console.log(absPath);  
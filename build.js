const fs = require('fs');

const css = fs.readFileSync('style.css', 'utf8');
const js = fs.readFileSync('script.js', 'utf8');
let html = fs.readFileSync('index.html', 'utf8');

html = html.replace('<link rel="stylesheet" href="style.css">', `<style>${css}</style>`);
html = html.replace('<script src="script.js"></script>', `<script>${js}</script>`);

fs.writeFileSync('dist/index.html', html);

console.log('Website built to dist/index.html');

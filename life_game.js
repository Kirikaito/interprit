const fs = require('fs-extra');

let k = process.argv[3];
let l = [];
let l1 = [];

const allFileContents = fs.readFileSync(process.argv[2], 'utf-8');
allFileContents.split(/\r?\n/).forEach(line =>  {
  l.push(line);
  l1.push(line);
});

const n = l.length;
const m = l[0].length;


for (let t = 0; t < k; t++) {
    for (let z = 0; z < n; z++){
        let dop = '';
        for (let x = 0; x < m; x++) {
            let s = 0;
            s += l[(z + n - 1) % n][(x + m - 1) % m] == '*';
            s += l[(z + n - 1) % n][x] == '*';
            s += l[(z + n - 1) % n][(x + m + 1) % m] == '*';
            s += l[z][(x + m - 1) % m] == '*';
            s += l[z][(x + m + 1) % m] == '*';
            s += l[(z + n + 1) % n][(x + m - 1) % m] == '*';
            s += l[(z + n + 1) % n][x] == '*';
            s += l[(z + n + 1) % n][(x + m + 1) % m] == '*';
            if (s < 2 || s>3){dop += '.';}
            if (s == 3){dop += '*';}
            if (s == 2){dop += l[z][x];}
        }
        l1[z] = dop;
    }
    for (let z = 0; z < n; z++) l[z] = l1[z]; 
}
for (let z = 0; z < n; z++) console.log(l1[z]);

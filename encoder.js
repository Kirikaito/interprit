const fs = require('fs-extra');

function writeFile(file, string) {
    fs.writeFile(file, string, 
    function(err) {
        if(err) {
            return console.log(err);
        }
        console.log("The file was saved!");
    }); 
}

if (process.argv[4] == '-e'){
    if (process.argv[3] == '-e'){encode_e(fs.readFileSync(process.argv[2], "utf8"), process.argv[2]);}
    if (process.argv[3] == '-j'){encode_j(fs.readFileSync(process.argv[2], "utf8"), process.argv[2]);}
}else if (process.argv[4] == '-d'){
    if (process.argv[3] == '-e'){decode_e(fs.readFileSync(process.argv[2], "utf8"), process.argv[2]);}
    if (process.argv[3] == '-j'){decode_j(fs.readFileSync(process.argv[2], "utf8"), process.argv[2]);}
}else{console.log('\n\tError: This option doesn\'t exist.\n');}
 
function decode_e(input, output) {
    let i = 0;
    let decoded = "";
 
    while (i < input.length) {
        if (input.charAt(i)=='#') {
            if (input.charAt(i + 1)=='#') {
                for (var p = 0; p < input.charCodeAt(i+2) + 1; p++)
                    decoded += '#';
            }
            else {
                for (var p = 0; p < input.charCodeAt(i+2) + 4; p++)
                    decoded +=(input.charAt(i+1));
            }
            i+=3;
        }
        else {
            decoded+=input.charAt(i)
            i++;
        }
    }
    writeFile(output, decoded);
}
 
function encode_e(input, output){
    let i = 0;
    let n = 1;
    let encoded = "";
    
    while (i < input.length)
    {
        while(input.charAt(i) == input.charAt(i+n)){n++;}
        n_old = n;
        
        if (input.charAt(i) == '#') {
            while (n_old>128){
                encoded += '##' +  String.fromCharCode(127);
                n_old -= 128;
            }
            encoded += '##' +  String.fromCharCode(n_old - 1);
        }else{
            while(n_old>131){
                encoded += '#' +  input.charAt(i) +  String.fromCharCode(127);
                n_old -= 131;
            }
            if (n_old > 3){encoded += '#' +  input.charAt(i) +  String.fromCharCode(n_old - 4);}
            else {encoded += input.substring(i, i + n_old);}
        }
        i += n;
        n  = 1;
    }
    writeFile(output, encoded);
}

function decode_j(input, output) {
    let i = 0;
    let x = 0;
    let decoded = "";
    while (input.charCodeAt(i)){
        if (input.charCodeAt(i)>128){
            x = input.charCodeAt(i)-128;
            for (let nj = 0;nj < x;nj++){
                decoded+=input.charAt(i+1);
                i++;
            }
            }
        else {
            x = input.charCodeAt(i);
            for (let n = 0;n<x;n++){
                decoded+=input.charAt(i+1);	
            }
            i++;	
        }
    i++;
    }

    writeFile(output, decoded);
}

function encode_j(input, output){
    let encoded = "";
    let k2 = "";
    let r = 0;
    let nr = 0;
    let i = 0;
    while (input.charCodeAt(i)){
        if (input.charCodeAt(i)==input.charCodeAt(i+1)){
            r++;
            if (nr!=0){
                encoded+=String.fromCharCode(nr+128)+k2;
                k2=new String ();
                nr=0;
            }
        }
        else {				
            if (r!=0){
                encoded+=String.fromCharCode(r+1)+input.charAt(i);
                r=0;
            }
            else {	
            nr++;
            k2+=input.charAt(i);
            }
        }
        i++;
    }
    if (nr!=0){
        encoded+=String.fromCharCode(nr+128)+k2;
    }

    writeFile(output, encoded);
}
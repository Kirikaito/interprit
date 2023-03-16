const fs = require('fs-extra');

try {
  const data = fs.readFileSync('./info.txt', 'utf8');
  try {
    let memory = fs.readFileSync(data, 'utf8').match(/\b(\w+)/g);
    const code_size = memory.length;
    memory.length = 1000;
    let mark = {};
    let pos = 0;
    let inp = 0;
    
    while(pos < code_size){
      switch (memory[pos]){
        case "in":
          inp++;
          break;
        case "mark":
          pos ++;
          mark[memory[pos]] = pos;
          break;
        
        default:
          break;
      }
      pos++;
    }
    pos = 0;
    
    let i = 0;
    let input = {};
    input.length = inp + 2;
    process.argv.forEach(function (val) {
      input[i] = val;
      i++;
    });
    i = 2;
    try {
      while(pos < code_size){
          switch (memory[pos]){

              case "in":
                memory[Number(memory[pos + 1]) + code_size] = Number(input[i]);
                i++;
                pos ++;
                break;

              case "new":
                memory[Number(memory[pos + 2]) + code_size] = memory[pos + 1];
                pos += 2;
                break;

              case "show":
                pos++;
                console.log(memory[Number(memory[pos]) + code_size]);
                break;

              case "mark":
                pos ++;
                break;

              case "jump":
                pos ++;
                pos = mark[memory[pos]];
                break;
              
              case "jumpif":
                if(Number(memory[Number(memory[pos + 1]) + code_size])){pos = mark[memory[pos + 2]];}
                else {pos += 2;}
                break;

              case "sum":
                memory[Number(memory[pos  + 1]) + code_size] = Number(memory[Number(memory[pos + 1]) + code_size]) + Number(memory[Number(memory[pos + 2]) + code_size]);
                pos += 2;
                break;
              
              case "minu":
                memory[Number(memory[pos  + 1]) + code_size] = Number(memory[Number(memory[pos + 1]) + code_size]) - Number(memory[Number(memory[pos + 2]) + code_size]);
                pos += 2;
                break;

              case "mult":
                memory[Number(memory[pos  + 1]) + code_size] = Number(memory[Number(memory[pos + 1]) + code_size]) * Number(memory[Number(memory[pos + 2]) + code_size]);
                pos += 2;
                break;
              
              case "div":
                memory[Number(memory[pos  + 1]) + code_size] = Number(memory[Number(memory[pos + 1]) + code_size]) / Number(memory[Number(memory[pos + 2]) + code_size]);
                pos += 2;
                break;

              case "ifdiv":
                if (Number(memory[Number(memory[pos + 1]) + code_size]) % Number(memory[Number(memory[pos + 2]) + code_size]) == 0){
                  memory[Number(memory[pos + 3]) + code_size] = 1;
                }else{memory[Number(memory[pos + 3]) + code_size] = 0;}
                pos += 3;
                break;

              case "more":
                if(Number(memory[Number(memory[pos + 1]) + code_size]) > Number(memory[Number(memory[pos + 2]) + code_size])){
                  memory[Number(memory[pos + 3]) + code_size] = 1;
                }else{memory[Number(memory[pos + 3]) + code_size] = 0;}
                pos += 3;
                break;

              case "eqmore":
                if(Number(memory[Number(memory[pos + 1]) + code_size]) >= Number(memory[Number(memory[pos + 2]) + code_size])){
                  memory[Number(memory[pos + 3]) + code_size] = 1;
                }else{memory[Number(memory[pos + 3]) + code_size] = 0;}
                pos += 3;
                break;
              
              case "eqless":
                if(Number(memory[Number(memory[pos + 1]) + code_size]) <= Number(memory[Number(memory[pos + 2]) + code_size])){
                  memory[Number(memory[pos + 3]) + code_size] = 1;
                }else{memory[Number(memory[pos + 3]) + code_size] = 0;}
                pos += 3;
                break;

              case "less":
                if(Number(memory[Number(memory[pos + 1]) + code_size]) < Number(memory[Number(memory[pos + 2]) + code_size])){
                   memory[Number(memory[pos + 3]) + code_size] = 1;
                }else{memory[Number(memory[pos + 3]) + code_size] = 0;}
                pos += 3;
                break;

              case "eq":
                if(Number(memory[Number(memory[pos + 1]) + code_size]) == Number(memory[Number(memory[pos + 2]) + code_size])){
                   memory[Number(memory[pos + 3]) + code_size] = 1;
                }else{memory[Number(memory[pos + 3]) + code_size] = 0;}
                pos += 3;
                break;
              
              case "noteq":
                if(Number(memory[Number(memory[pos + 1]) + code_size]) != Number(memory[Number(memory[pos + 2]) + code_size])){
                   memory[Number(memory[pos + 3]) + code_size] = 1;
                }else{memory[Number(memory[pos + 3]) + code_size] = 0;}
                pos += 3;
                break;
                
              case "and":
                if(Number(memory[Number(memory[pos + 1]) + code_size]) && Number(memory[Number(memory[pos + 2]) + code_size])){
                   memory[Number(memory[pos + 3]) + code_size] = 1;
                }else{memory[Number(memory[pos + 3]) + code_size] = 0;}
                pos += 3;
                break;
              
              case "or":
                if(Number(memory[Number(memory[pos + 1]) + code_size]) || Number(memory[Number(memory[pos + 2]) + code_size])){
                   memory[Number(memory[pos + 3]) + code_size] = 1;
                }else{memory[Number(memory[pos + 3]) + code_size] = 0;}
                pos += 3;
                break;

              case "not":
                if(Number(memory[Number(memory[pos + 1]) + code_size]) == 1){memory[Number(memory[pos + 1]) + code_size] = 0;}
                else{memory[Number(memory[pos + 1]) + code_size] = 1;}
                pos++;
                break;
              default:
                console.error(`unknown command in position ${pos}`);
                break;

          }
          pos++;
      }
    } catch (err) {
    console.error(`Code isn't working`);
    }
  } catch (err) {
    console.error(`File ${data} is missing or empty`);
  }
} catch (err) {
  console.error("File 'info.txt' is missing");
}
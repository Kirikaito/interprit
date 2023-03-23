const fs = require('fs-extra');

function getKeyByValue(object, value) {
  return Object.keys(object).find(key => object[key] === value);
}

const funcs = {"in" : 1, "new":2, "show":3,"mark":4,"jump":5,
                "jumpif":6,"sum":7,"minu":8,"mult":9,"div":10,
                "ifdiv":11,"more":12,"eqmore":13,"eqless":14,"less":15,
                "eq":16,"noteq":17,"and":18,"or":19,"not":20,"change":21};

try {
  const data = fs.readFileSync('./info.txt', 'utf8');
  try {
    let memory = fs.readFileSync(data, 'utf8').match(/\b(\w+)/g);
    const code_size = memory.length;
    for(let i = 0;i<code_size;i++){
      if(memory[i] in funcs){
        memory[i] = funcs[memory[i]];
      }else{
        if(isNaN(memory[i]) != 1){
          memory[i] = Number(memory[i]);
        }
      }
    }
    memory.length = 1000;
    let mark = {};
    let pos = 0;
    let inp = 0;
    
    while(pos < code_size){
      switch (memory[pos]){
        case 1:
          inp++;
          break;
        case 4:
          pos ++;
          mark[memory[pos]] = pos;
          break;
        
        default:
          break;
      }
      pos++;
    }
    for(let i = 0;i<code_size;i++){if(isNaN(memory[i])){memory[i] = Number(mark[memory[i]]);}}
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
          switch (getKeyByValue(funcs,memory[pos])){

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
                console.log(memory[memory[pos] + code_size]);
                break;

              case "mark":
                pos ++;
                break;

              case "jump":
                pos ++;
                pos = memory[pos];
                break;
              
              case "jumpif":
                if(Number(memory[Number(memory[pos + 1]) + code_size])){pos = memory[pos + 2];}
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

              case "change":
                pos++
                memory[memory[pos] + code_size] = memory[memory[pos] + code_size] * (-1);
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
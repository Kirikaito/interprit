const fs = require('fs');
var input = fs.readFileSync(process.argv[2], "utf8");

class HuffmanNode {
    constructor(ch,  frequency,  left,   right) {
        this.ch = ch;
        this.frequency = frequency;
        this.left = left;
        this.right = right;
    }  
}
    
function createCodeRec(node, map,  s){
	if (node.left == null && node.right == null){
		map.set(node.ch, s);
        return;
    }    
	createCodeRec(node.left, map, s + '0');
	createCodeRec(node.right, map, s + '1' );
}

function encode(codeMap, input) {
        var s = ""
        for (let i = 0; i < input.length; i++) {
            s += codeMap.get(input.charAt(i));
        }
        s+=codeMap.get("bolt1");
        s+=codeMap.get("bolt2");
        while(s.length % 8 != 0){s+="0";}
        return s;
}
function decode(codeMap, input) {
    var code = input
    var s = ""
    var simb = ""
    while(code != "") {
      while(! simb in codeMap) {
        simb += code.shift;
      }
      if (simb == codeMap["bolt1"] || simb == codeMap["bolt2"]){ break;}
      for( let i in codeMap){
        if (codeMap[i] == simb) {s += i}
      }
    }
    return s;
}

 var map = new Map();
    for (let i = 0; i < input.length; i++) {
        let ch = input.charAt(i);
            if (!map.has(ch)) {
                map.set(ch, 1);
        } else {
            let val = map.get(ch);
            map.set(ch, ++val);
        }
    }
  map.set("bolt1",1);
  map.set("bolt2",1);

var nodeQueue = [];
    for (let entry of map.entries()){nodeQueue.push(new HuffmanNode(entry[0], entry[1], null, null));}
    queue.sort((a,b) => a.frequency - b.frequency )

while (nodeQueue.length > 1) {
        let node1 = nodeQueue.shift();
        let node2 = nodeQueue.shift();
        let node = new HuffmanNode('', node1.frequency + node2.frequency, node1, node2);  
        nodeQueue.push(node);
        nodeQueue.sort((a,b) => a.frequency - b.frequency );
    }
root = nodeQueue.shift();
var codeMap = createHuffmanCode(root);
var codeMap = new Map();
createCodeRec(root, codeMap, "");

if (process.argv[3] == '-e'){
  console.log(encode(codeMap, input));
  console.log(decode(codeMap, (encode(codeMap, input)))) ;
}
else if(process.argv[3] == '-m'){console.log(codeMap)}

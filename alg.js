const fs = require('fs-extra');
var input = fs.readFileSync(process.argv[2], "utf8");

class HuffmanNode {
    constructor(ch,  frequency,  left,   right) {
        this.ch = ch;
        this.frequency = frequency;
        this.left = left;
        this.right = right;
    }  
}

function buildFrequencyMap(input) {
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
    return map;
}
    
function sortByFrequence(map){
    var queue = [];
    for (let entry of map.entries()){queue.push(new HuffmanNode(entry[0], entry[1], null, null));}
    queue.sort((a,b) => a.frequency - b.frequency )
    return queue;
}  
    
function buildTree(nodeQueue){
    while (nodeQueue.length > 1) {
        let node1 = nodeQueue.shift();
        let node2 = nodeQueue.shift();
        let node = new HuffmanNode('', node1.frequency + node2.frequency, node1, node2);  
        nodeQueue.push(node);
    }
    return nodeQueue.shift();
}
    
function createHuffmanCode(node){
	var map = new Map();
	createCodeRec(node, map, "");
	return map;
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


var freqMap = buildFrequencyMap(input); 
var nodeQueue = sortByFrequence(freqMap);
root = buildTree(nodeQueue);
var codeMap = createHuffmanCode(root);
if (process.argv[3] == '-e'){console.log(encode(codeMap, input));}
else if(process.argv[3] == '-m'){console.log(codeMap)}

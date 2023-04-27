const fs = require('fs-extra');
try{
    let main_str = fs.readFileSync(process.argv[2], 'utf8');
    let sub_str = process.argv[3];
    let fir = 0;
    let flag = 0;
    if(process.argv[4] == '-b'){
        if(main_str.length  >= sub_str.length){
            let j = 0;  
            for(let i = 0;i < main_str.length;i++){
                while(j < sub_str.length){
                    if(main_str[i + j] != sub_str[j]){
                        flag = 1;
                        break;
                    }
                    j++;
                }
                if(flag == 0){
                    fir = i;
                    break;
                }
                j = 0;
                flag = 0;
            }
        }else{
            console.log('Substring is longer then main string.');
        }
    }

    if(process.argv[4] == '-h'){
        let p = 1000;
        var main_Hash = 0;
        var sub_Hash = 0;
        let pn = 1;
        for(let i = 0;i<sub_str.length;i++){
            main_Hash = main_Hash * p + main_str.charCodeAt(i);
            sub_Hash = sub_Hash * p + sub_str.charCodeAt(i);
            pn *= p;
        }
        pn /= p;
        for(let n = sub_str.length; n < main_str.length;n++){
            if(main_Hash == sub_Hash){
                for(let i = 0;i<sub_str.length;i++){
                    if(main_str[i + n - sub_str.length] != sub_str[i]){
                        flag = 1;
                        break;
                    }
                }
                if(flag == 0){
                    fir = n - sub_str.length;
                    break;
                }
                flag = 0;
            }

            main_Hash -= pn * main_str.charCodeAt(n - sub_str.length);
            main_Hash = main_Hash * p + main_str.charCodeAt(n);
        }
    }

    console.log(fir);
    console.log(fir + sub_str.length);
    
} catch (err) {
    console.error(`File ${process.argv[2]} is missing or empty`);
}
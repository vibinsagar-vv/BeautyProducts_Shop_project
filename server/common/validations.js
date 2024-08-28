


function validateName(key,value){

    let nameRegExp=/^[a-zA-Z]{2,10}(\.)*$/

    if(value==''||value==undefined||!value){
        return [false,`${key} should not be Empty`]
    }
    else if(value.length<2){
        return [false,`${key} need to be more than 2 Characters`]
    }else if(value.length>10){
        return [false,`${key} Exceeds more than 10 Character`]    
    }else if(!nameRegExp.test(value)){
        return [false,`${key} needs to be Character`]
    }else{
        return [true,'name submitted'];
    }
}

function validatePhone(key,value){
    let phnRegEx=/^\+([0-9]{12})$/
    // console.log(value,key);
    if(value==''||value==undefined||!value){
        return [false,`${key} should not be Empty`]
    }
    else if(value.length<13||value.length>13){
        return [false,`${key} need to be 13 digits with country code`]
    }else if(!phnRegEx.test(value)){
        return [false,`${key} need to be digits`]
    }else{
        return [true,'phno submited'];
    }
}

// console.log(validatePhone('phone','+9197464832091'))

function validateAge(value){
    let DateOfBrth=new Date(value)
        let Today=new Date()
        // let age=(Today.getFullYear()-DateOfBrth.getFullYear())

        let age=Math.floor((Today-DateOfBrth)/(1000*60*60*24*30*12))
    console.log(age);

        if(age>22){
            return true
        }else {
            return false
        }
         
}

function validateGender(value){
    if(value=='Female'){
        return true
    }else{
        return false
    } 
}

function validateQualification(value){
    (typeof(value)=='string')?value=[].push(value):
    
    console.log(validateArr([10,12],value),value);
    if(validateArr(['10'],value)){
        return [true,`<h1>You Have to Pay 1500</h1>`]
    }else if(validateArr(['10','12'],value)){
        return [true,`<h1>You Have to Pay 1000</h1>`]
    }
}

function validateArr(value1,value2){
    let temArr=[]

    // console.log(['10','12'].find('10'));
    if(value1.length==value2.length){
        value2.forEach(element => {
            // console.log('d',typeof(element));
           if(value1.includes(element)){
            temArr.push('t')
           }else{
            temArr.push('f')
           }
        });
        // console.log([1,2].find(e=> e==1))
        // console.log('k',temArr.find(e=> e== 'f'));
        if(temArr.find(e=> e== 'f')){
            return false
        }else{
            return true
        }
    }else{
        return false
    }
}

// console.log(validateArr([10,20,'UG'],[10, 20,'UG']))

// if(' '){
// console.log('l');
// }else{
// console.log('g');
// }

function validatefullname(key,value){
    const RegEx=/^[a-zA-Z ]*$/
if(value==''||value==undefined||!value)return [false,`${key} cannot be empty`]
if(!RegEx.test(value)){
    return [false,`${key} must be only contain characters`]
}
return [true]
    // console.log(RegEx.test(value));
}
// console.log(validatefullname('fulname','Sri kanth p1'))

function validateEmail(key,value){
    const RegEx=/^[a-zA-Z0-9_.]+\@([a-z]{4,7})\.([a-z]{2,3})$/
    if(value==''||value==undefined||!value)return [false,`${key} cannot be empty`]
    if(!RegEx.test(value)){
        return [false,`invalid ${key}`]
    }
    return [true]
}
// console.log(validateEmail('email','Srikanth2207@gmail.com'))
module.exports={validateName,
    validatePhone,
    validateAge,
    validateGender,
    validateArr,
    validateQualification,
    validatefullname,
    validateEmail,
}
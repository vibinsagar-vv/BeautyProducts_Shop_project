const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).+$/

const  handleEmailRegEx =(value)=>{
    if(!value){
        return [false,"Please provide a email address"]
    }
    else if(!emailRegex.test(value)){
        return [false,"Invalid Email!"]
    }else{
        return [true]
    }
}

const handlePasswordRegEx =(value)=>{
    if(!value){
        return [false,"Please provide Password!"]
    }
    else if(value.length<6){
        return [false,"Password is too Short!"]
    }
    else if(value.length>12){
        return [false,"Password is too Long!"]
    }
    else if(!passwordRegex.test(value)){
        return [false,"Password should Contain Capital letter,small letter and atleast one special Character"]
    }
    else {
        return [true]
    }
}

export{handleEmailRegEx,handlePasswordRegEx}
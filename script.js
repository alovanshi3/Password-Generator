const inputSlider=document.querySelector("[data-lengthSlider]")   //custom attribute getting method
const lengthDisplay=document.querySelector("[data-lengthNumber]") 

const passwordDisplay = document.querySelector("[data-passwordDisplay]");
const copyBtn = document.querySelector("[data-copy]");
const copyMsg = document.querySelector("[data-copyMsg]");
const uppercaseCheck = document.querySelector("#uppercase");
const lowercaseCheck = document.querySelector("#lowercase");
const numbersCheck = document.querySelector("#numbers");
const symbolsCheck = document.querySelector("#symbols");
const indicator = document.querySelector("[data-indicator]");
const generateBtn = document.querySelector(".generateButton");
const allCheckBox = document.querySelectorAll("input[type=checkbox]");
const symbols = '~`!@#$%^&*()_-+={[}]|:;"<,>.?/';


//starting
let password="";
let passwordLength=10;
let checkCount=0;
handleSlider();
setIndicator("#ccc");
//set circle color to grey
                                 
//set pswd length
function handleSlider(){
    inputSlider.value=passwordLength;
    lengthDisplay.innerText=passwordLength;              // work to display length of pswd on display
     //or kuch bhi karna chahiye ? - HW
     const min=inputSlider.min;
     const max=inputSlider.max;
     inputSlider.style.backgroundSize=((passwordLength-min)*100/(max-min))+"%100%"
}


function setIndicator(color){
    indicator.style.backgroundColor=color;              
    //shadow
    indicator.style.boxShadow = `0px 0px 12px 1px ${color}`;
}



function getRndInteger(min,max){
   return Math.floor(Math.random()*(max-min))+min;
}



function generateRandomNumber(){
    return getRndInteger(0,9);
}



function generateLowerCase(){
     return String.fromCharCode(getRndInteger(97,123));
}



function generateUpperCase(){
    return String.fromCharCode(getRndInteger(65,91));
}



function generateSymbol(){
    const randNum=getRndInteger(0,symbols.length);
    return symbols.charAt(randNum);
}



function calcStrength(){
    let hasUpper = false;
    let hasLower = false;
    let hasNum = false;
    let hasSym = false;
    if (uppercaseCheck.checked) hasUpper = true;
    if (lowercaseCheck.checked) hasLower = true;
    if (numbersCheck.checked) hasNum = true;
    if (symbolsCheck.checked) hasSym = true;
  
    if (hasUpper && hasLower && (hasNum || hasSym) && passwordLength >= 8) {
      setIndicator("#0f0");
    } else if (
      (hasLower || hasUpper) &&
      (hasNum || hasSym) &&
      passwordLength >= 6
    ) {
      setIndicator("#ff0");
    } else {
      setIndicator("#f00");
    }
}



async function copyContent(){
    try{
        await navigator.clipboard.writeText(passwordDisplay.value);
        copyMsg.innerText="Copied";
    }
    catch(e){
        copyMsg.innerText="Failed";
    }
    //to make copied visible
    copyMsg.classList.add("active");
    setTimeout(()=>{
        copyMsg.classList.remove("active");
    },1000);
}


function handleCheckBoxChange(){
    checkCount=0;
    allCheckBox.forEach((checkbox)=>{
    if(checkbox.checked) checkCount++;
});
    //condition
    if(passwordLength<checkCount){
        passwordLength=checkCount;
        handleSlider();
    }
}



    allCheckBox.forEach((checkbox)=>{
        checkbox.addEventListener('change',handleCheckBoxChange);
    })



inputSlider.addEventListener('input',(e)=>{
    passwordLength=e.target.value;
    handleSlider();
})  



copyBtn.addEventListener('click',()=>{
    if(passwordDisplay.value) copyContent();
})

function shufflePassword(array){
    //Fisher Yates Method
    for (let i = array.length - 1; i > 0; i--) {
        //random J, find out using random function
        const j = Math.floor(Math.random() * (i + 1));
        //swap number at i index and j index
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }
    let str = "";
    array.forEach((el) => (str += el));
    return str;
}

generateBtn.addEventListener('click',()=>{
    //no checkbox is selected
    if(checkCount<=0) return;

    if(passwordLength<checkCount){
        passwordLength=checkCount;
        handleSlider();
    }
    // to find new pswd
    console.log("Starting the Journey");
    //remove old pswd
    password="";

    //fulfill condition
    // if(uppercaseCheck.Checked){
    //     password+=generateUpperCase();
    // }
    
    // if(lowercaseCheck.Checked){
    //     password+=generateLowerCase();
    // }

    // if(numbersCheck.Checked){
    //     password+=generateRandomNumber();
    // }

    // if(symbolsCheck.Checked){
    //     password+=generateSymbol();
    // }

    let funcArr=[];

    if(uppercaseCheck.checked){
        funcArr.push(generateUpperCase);
    }
    if(lowercaseCheck.checked){
        funcArr.push(generateLowerCase);
    }
    if(numbersCheck.checked){
        funcArr.push(generateRandomNumber);
    }
    if(symbolsCheck.checked){
        funcArr.push(generateSymbol);
    }

    //compulsory
    for(let i=0;i<funcArr.length;i++){
        password+=funcArr[i]();
    }
    console.log("Compulsory adddition done");
    //remaining length

    for(let i=0;i<passwordLength-funcArr.length;i++){
        let randIndex=getRndInteger(0,funcArr.length);
        console.log("randIndex" + randIndex);
        password+=funcArr[randIndex]();
    }
    console.log("Remaining adddition done");
    //shuffle the pswd 

    password=shufflePassword(Array.from(password));
    console.log("Shuffling done"); 
    //show on screen
    passwordDisplay.value=password;
    console.log("UI adddition done");
    calcStrength();

});




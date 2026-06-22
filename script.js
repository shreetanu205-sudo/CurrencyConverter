const base_url = "https://api.frankfurter.dev/v1/latest";

const dropdowns=document.querySelectorAll(".dropdown select");

const btn=document.querySelector(".rate");

const fromCurr=document.querySelector(".from-drop select");
const toCurr=document.querySelector(".to-drop select");

const mesg=document.querySelector(".final-msg");


for(let select of dropdowns){
  for(let currCode in countryList){
    let newOption=document.createElement("option");
    newOption.innerText=currCode;
    newOption.value=currCode;
    select.append(newOption);
    
    if(select.name==="from" && currCode==="USD"){
        newOption.selected="selected";
    }
    else if(select.name==="to" && currCode==="INR"){
        newOption.selected="selected";
    }
   }
   select.addEventListener("change",(evt)=>{
    updateFlag(evt.target);
    });
}

const updateFlag=(element)=>{
    let currCode=element.value;
    let countryCode=countryList[currCode];
    let newSrc=`https://flagsapi.com/${countryCode}/flat/64.png`;
    let img=element.parentElement.querySelector("img");
    img.src=newSrc;
}

btn.addEventListener("click",(evt)=>{
    evt.preventDefault();
    updateExchangeRate();
})

updateExchangeRate=async()=>{
    let amt=document.querySelector(".amount input");
    let amtVal=amt.value;
    if(amtVal<1 || amtVal===""){
        amtVal=1;
        amt.value="1";
    }
    const url =`${base_url}?amount=${amtVal}&from=${fromCurr.value}&to=${toCurr.value}`;
    let response=await fetch(url);
    let data=await response.json();
    let rate=data.rates[toCurr.value]

    let finalAmt=rate;
    mesg.innerText=`${amtVal} ${fromCurr.value} = ${finalAmt} ${toCurr.value}`;
}

window.addEventListener("load",()=>{
    updateExchangeRate();
})
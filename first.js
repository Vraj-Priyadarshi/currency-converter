const base_url = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";
const dropdowns = document.querySelectorAll(".dropdown select");
const button = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");




for(let select of dropdowns){
    for(currcode in countryList){
        let newOption = document.createElement("option");
        newOption.innerText = currcode;
        newOption.value = currcode;
        if(select.name == "from" && currcode ==="USD"){
            newOption.selected = "selected";
        }
        else if(select.name == "to" && currcode ==="INR"){
            newOption.selected = "selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change",(evt) =>{
        updateFlag(evt.target);
    });
}

const updateFlag = (element) =>{
    let currcode = element.value;
    let countrycode = countryList[currcode];
    let newsrc = `https://flagsapi.com/${countrycode}/flat/64.png`;
    console.log(newsrc);
    let img = element.parentElement.querySelector("img");
    img.src = newsrc;
}


button.addEventListener("click", (evt) =>{
    evt.preventDefault();
    updateexchangerate();

});


const updateexchangerate = async() =>{
    let amount = document.querySelector(".amount input");
    let amtval = amount.value;
    if(amtval ===""  || amtval < 1){
        amtval = 1;
        amount.value = "1";
    }
    
    const url = `${base_url}/${fromCurr.value.toLowerCase()}.json`
    let response = await  fetch(url);
    let data = await response.json();
    let tocurrent = toCurr.value.toLowerCase();
    let fromcurrent = fromCurr.value.toLowerCase();
    let rate = data[fromcurrent][tocurrent];
    
    let finalAmount = amtval * rate;
    msg.innerText = `${amtval} ${fromCurr.value} = ${finalAmount} ${toCurr.value} `;
}

window.addEventListener("load" ,() =>{
    updateexchangerate();
})

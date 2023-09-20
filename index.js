//Input borders on active
let inputBorders = document.querySelectorAll("input")

inputBorders.forEach((e)=>{
    e.addEventListener("focus", ()=>{
        e.style.borderColor = "hsl(259, 100%, 65%)";
    })
    e.addEventListener("blur", ()=>{
        e.style.borderColor = "hsl(0, 0%, 86%)";
    })
})
// Reciving Input
let days = document.querySelector(".days");
let months = document.querySelector(".months");
let years = document.querySelector(".years");

let inputSubmit = document.querySelector(".icon")

inputSubmit.addEventListener("click", ()=>{
    let d = days.value, m = months.value, y = years.value;
    if(isNotEmpty(d, m, y) && validate(d, m, y)){
        showResult(d, m, y);
    }
})

//Input validation
function validate(d, m, y){
    let inputDate = new Date(`${m}-${d}-${y}`);
    let nowDate = new Date();

    document.querySelectorAll(".error").forEach((e) => {e.style.display = "none"});
    if(isNotEmpty(d, m, y)){
        if(inputDate instanceof Date && nowDate >= inputDate && inputDate.getMonth()+1 === +m){
            return true;
        }
        else{
            if(d <= 31 && d > 0 && m <= 12 && m > 0 && y < nowDate.getFullYear()){
                document.querySelector(".invalid-input").style.display = "block";
            }
            else{
                if(d > 31 || d <= 0){
                    document.querySelector(".day .invalid-day").style.display = "block";
                    document.querySelector(".day .days").style.borderColor = "hsl(0, 100%, 67%)";
                    document.querySelector(".day .title").style.color = "hsl(0, 100%, 67%)";
                }
                if(m > 12 || m <= 0){
                    document.querySelector(".month .invalid-month").style.display = "block";
                    document.querySelector(".month .months").style.borderColor = "hsl(0, 100%, 67%)";
                    document.querySelector(".month .title").style.color = "hsl(0, 100%, 67%)";
                }
                if(y > nowDate.getFullYear()){ 
                    document.querySelector(".year .invalid-year").style.display = "block";
                    document.querySelector(".year .years").style.borderColor = "hsl(0, 100%, 67%)";
                    document.querySelector(".year .title").style.color = "hsl(0, 100%, 67%)";
                }
            }
        } 
    }
    return false;
}

function isNotEmpty(d, m, y){
    document.querySelectorAll(".no-input").forEach((e) => {e.style.display = "none"});
    document.querySelectorAll(".input .title").forEach((e) => {e.style.color = "hsl(0, 1%, 44%)"});
    if(d === "" ){
        document.querySelector(".day .no-input").style.display = "block";
        document.querySelector(".day .days").style.borderColor = "hsl(0, 100%, 67%)";
        document.querySelector(".day .title").style.color = "hsl(0, 100%, 67%)";
    }
    if(m === "" ){
        document.querySelector(".month .no-input").style.display = "block";
        document.querySelector(".month .months").style.borderColor = "hsl(0, 100%, 67%)";
        document.querySelector(".month .title").style.color = "hsl(0, 100%, 67%)";
    }
    if(y === "" ){
        document.querySelector(".year .no-input").style.display = "block";
        document.querySelector(".year .years").style.borderColor = "hsl(0, 100%, 67%)";
        document.querySelector(".year .title").style.color = "hsl(0, 100%, 67%)";
    }
    return d !== "" && m !== "" && y !== "";
}

// Show result
function showResult(d, m, y){
    let resultSpans = document.querySelectorAll(".result span");

    let inputDate = new Date(`${m}-${d}-${y}`);
    let nowDate = new Date()
    let date = Date.UTC(inputDate.getFullYear(), inputDate.getMonth(), inputDate.getDate());
    let now = Date.UTC(nowDate.getFullYear(), nowDate.getMonth(), nowDate.getDate());

    let result = Math.floor((now - date) / 1000 / 60 / 60 / 24);
    let years  = Math.floor(result / 365);
    let months = Math.floor((result / 30.44) % 12);
    let days = result  - (years * 365) - (Math.floor(months * 30.44)) -1;

    resultSpans[0].textContent = years;
    resultSpans[1].textContent = months;
    resultSpans[2].textContent = days;
}
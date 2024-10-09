
let searchInput = document.getElementById("searchInput");

let todayName = document.getElementById("todayDateName");
let todayNumber = document.getElementById("todayDateNumber");
let todayMonth = document.getElementById("todayDateMonth")
let todayLocation = document.getElementById("todayLocation");
let todayTemperature = document.getElementById("todayTemp");
let todayConditionImg = document.getElementById("todayImg");
let todayConditionText = document.getElementById("todayText");
let humidity= document.getElementById("humidity");
let windSpeed= document.getElementById("windSpeed");
let windDirection= document.getElementById("windDirection");


let nextDayName = document.getElementsByClassName("nextDayName");
let nextConditionImg = document.getElementsByClassName("nextConditionImg");
let nextMaxTemp = document.getElementsByClassName("nextMaxTemp");
let nextMinTemp = document.getElementsByClassName("nextMinTemp");
let nextConditionText = document.getElementsByClassName("nextConditionText");



async function getAllWetherData(countryname='london'){
   let request= await fetch(`https://api.weatherapi.com/v1/forecast.json?key=9afddb68584f4efcb61143211240610&q=${countryname}&days=3`)
let response= await request.json()
// console.log(response);
if(!response.error){
    displayTodayData(response)
    displayNextData(response)

}
    
}
getAllWetherData()


function displayTodayData(arr){
   
    todayLocation.innerHTML=arr.location.name
    todayTemperature.innerHTML=arr.current.temp_c
    todayConditionImg.setAttribute("src",arr.current.condition.icon)
    todayConditionText.innerHTML=arr.current.condition.text
    humidity.innerHTML=arr.current.humidity+'%'
    windSpeed.innerHTML=arr.current.wind_mph+'km/h'
    windDirection.innerHTML=arr.current.wind_dir
    let date = new Date()
    todayName.innerHTML=date.toLocaleDateString("en-US",{weekday:'long'})
    todayNumber.innerHTML=date.getDate()
    todayMonth.innerHTML=date.toLocaleDateString("en-US",{month:'long'})
}


function displayNextData(arr){
    
for(let i =0 ; i<nextMaxTemp.length ; i++){
    let nextDate= new Date(arr.forecast.forecastday[i+1].date)
    console.log(nextDate);
    nextMaxTemp[i].innerHTML=arr.forecast.forecastday[i+1].day.maxtemp_c
    nextMinTemp[i].innerHTML=arr.forecast.forecastday[i+1].day.mintemp_c
    nextConditionText[i].innerHTML=arr.forecast.forecastday[i+1].day.condition.text
    nextConditionImg[i].setAttribute('src',arr.forecast.forecastday[i+1].day.condition.icon)
    nextDayName[i].innerHTML=nextDate.toLocaleDateString("en-US",{weekday:'long'})
}

}

searchInput.addEventListener('input',function(){
    getAllWetherData(searchInput.value)
})












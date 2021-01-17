const cityName = document.getElementById("cityName");
const submitButton = document.getElementById("submitButton");
const city_name = document.getElementById("city_name");
const temp_status = document.getElementById("temp_status");
const temp = document.getElementById("temp_real_val");

const dataHide = document.querySelector('.middle_layer');

const getInfo = async (event) => {
    event.preventDefault();
    let city = cityName.value;
    if (city === "") {
        city_name.innerText = "Please write city name before search";
        dataHide.classList.add('data_hide');
    } else {
        try {
            let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=9c322865629092f462a44cb0e4ac4174`;
            const response = await fetch(url);
            const data = await response.json();
            const arrData = [data];

            city_name.innerText = `${arrData[0].name}, ${arrData[0].sys.country}`;
            temp.innerText = arrData[0].main.temp;

            const tempMood = arrData[0].weather[0].main;

            if (tempMood === "Clear") {
                temp_status.innerHTML =
                    '<i class="fas fa-sun" style="color: #eccc68"></i>';
            } else if (tempMood === "Clouds") {
                temp_status.innerHTML =
                    '<i class="fas fa-cloud" style="color: #f1f2f6"></i>';
            } else if(tempMood==="Rain"){
                temp_status.innerHTML = 
                '<i class="fas fa-cloud-rain" style="color: #a4b0be"></i>';
            }else{
                temp_status.innerHTML = 
                '<i class="fas fa-cloud" style="color: #f1f2f6"></i>';
            }

            dataHide.classList.remove("data_hide");

        } catch {
            city_name.innerText = "Please write proper city name";
            dataHide.classList.add('data_hide');
        }

    }
}

submitButton.addEventListener("click", getInfo);
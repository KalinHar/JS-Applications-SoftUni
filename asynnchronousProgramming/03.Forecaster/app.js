function attachEvents() {
    document.querySelector('#submit').addEventListener('click', getForecast);
}

async function getForecast(e) {
    e.target.value = 'Loading...';
    e.target.disabled = true;
    const forecast = document.querySelector('#forecast');
    const location = document.querySelector('#location');
    forecast.innerHTML = '';
    if (location.value == '') {
        viewError('Error: Empty Location!');
    } else {
        const locations = await getLocations();
        const loc = locations.find(l => l.name.toLowerCase() == location.value.toLowerCase());
        if (loc) {
            const [today, upcoming] = await Promise.all([
                getToday(loc.code),
                getUpcoming(loc.code)
            ]);
            location.value = '';
            viewForecast(today, upcoming);
        } else {
            viewError('Error: Not Info for this Location!');
        }
    }
    e.target.value = 'Get Weather';
    e.target.disabled = false;
}
function viewForecast(to, up) {
    const forecast = document.querySelector('#forecast');
    forecast.style.display = 'block';
    const dict = {
        'Sunny': '&#x2600', // ☀
        'Partly sunny': '&#x26C5', // ⛅
        'Overcast': '&#x2601', // ☁
        'Rain': '&#x2614', // ☂
        'Degrees': '&#176'  // °
    }
    const name = to.name;
    const todayCond = to.forecast.condition;
    const todayCondS = dict[todayCond];
    const todayHi = to.forecast.high + dict['Degrees'];
    const todayLow = to.forecast.low + dict['Degrees'];

    const current = document.createElement('div');
    current.id = "current";
    current.innerHTML = `<div class="label">Curent conditions</div>
<div class="forecasts">
    <span class="condition symbol">${todayCondS}</span>
    <span class="condition">
        <span class="forecast-data">${name}</span>
        <span class="forecast-data">${todayLow}/${todayHi}</span>
        <span class="forecast-data">${todayCond}</span>
    </span>
</div>`;
    forecast.appendChild(current);

    const afterDay = document.createElement('div');
    afterDay.id = "upcoming";
    afterDay.innerHTML = `<div class="label">Three-day forecast</div>
<div class="forecast-info">
    <span class="upcoming"></span>
</div>`;
    forecast.appendChild(afterDay);
    up.forecast.forEach(d => {
        const span = document.createElement('span');
        span.className = 'upcoming';
        span.innerHTML = `<span class="symbol">${dict[d.condition]}</span>
<span class="forecast-data">${d.low}${dict['Degrees']}/${d.high}${dict['Degrees']}</span>
<span class="forecast-data">${d.condition}</span>`;
        afterDay.lastChild.appendChild(span);
    });
    
}

function viewError(msg) {
    forecast.style.display = 'block';
    forecast.textContent = msg;
    document.querySelector('#location').value = '';
}
async function getLocations() {
    try {
        const res = await fetch('http://localhost:3030/jsonstore/forecaster/locations');
        if (res.status != 200) {
            throw new Error('Error: Main server error!')
        }
        const data = await res.json();
        return data;
    } catch(err) {
        viewError(err.message);
    }
}
async function getToday(town) {
    try {
        const res = await fetch('http://localhost:3030/jsonstore/forecaster/today/' + town);
        if (res.status != 200) {
            throw new Error('Error: Today Info server error!')
        }
        const data = await res.json();
        return data;
    } catch(err) {
        viewError(err.message);
    }
}
async function getUpcoming(town) {
    try {
        const res = await fetch('http://localhost:3030/jsonstore/forecaster/upcoming/' + town);
        if (res.status != 200) {
            throw new Error('Error: Three-day Info server error!')
        }
        const data = await res.json();
        return data;
    } catch(err) {
        viewError(err.message);
    }
}
attachEvents();
async function getInfo() {
    const stopID = document.querySelector('#stopId').value;
    const baseUrl = `http://localhost:3030/jsonstore/bus/businfo/${stopID}`;
    const stName = document.querySelector('#stopName');
    const buses = document.querySelector('#buses');

    try {
        stName.textContent = 'Loading...'
        const res = await fetch(baseUrl);
        if (res.status != 200) {
            throw new Error('Error');
        }
        const data = await res.json();
        stName.textContent = `${data.name}`;
        buses.replaceChildren();
        Object.entries(data.buses).forEach(b => {
            let li = document.createElement('li');
            li.textContent = `Bus ${b[0]} arrives in ${b[1]} minutes`;
            buses.appendChild(li);
        });


    } catch (err) {
        buses.replaceChildren();
        stName.textContent = `${err.message}`;
    }
    
}
function solve() {
    let busStop = {
        next:'depot'
    };
    const baseUrl = `http://localhost:3030/jsonstore/bus/schedule/`
    const departBtn = document.querySelector('#depart');
    const arriveBtn = document.querySelector('#arrive');
    const info = document.querySelector('#info span');

    
    async function depart() {
        departBtn.disabled = true;
        
        const res = await fetch(baseUrl + busStop.next);
        busStop = await res.json();

        info.textContent = `Next stop ${busStop.name}`

        arriveBtn.disabled = false;
    }

    function arrive() {
        arriveBtn.disabled = true;
        departBtn.disabled = false;
        
        info.textContent = `Arriving at ${busStop.name}`;
    }

    return {
        depart,
        arrive
    };
}

let result = solve();
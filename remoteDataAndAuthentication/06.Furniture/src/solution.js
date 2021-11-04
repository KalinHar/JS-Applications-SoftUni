const userData = JSON.parse(localStorage.getItem('data'));
const buyBtn = document.querySelector('#buyBtn');
buyBtn.addEventListener('click', buyProduct);
const totalField = document.querySelector('.orders');
totalField.querySelector('button').addEventListener('click', sumOrders);
const table = document.querySelector('.table tbody');
const logoutBtn = document.querySelector('#logoutBtn');
logoutBtn.addEventListener('click', logOut);

if (!userData) {
    document.querySelector('#guest').style.display = 'block';
    document.querySelector('#user').style.display = 'none';
    buyBtn.style.display = 'none';
    totalField.style.display = 'none';
} else {
    document.querySelector('#guest').style.display = 'none';
    document.querySelector('#user').style.display = 'block';
}

loadItems();

async function sumOrders() {
    try {
        // THIS SORT BY OWNER ID DON'T WORK AS EXPECTED ! => SOLVED: GET ALL ORDERS AND SORT MANUALY.
        // const res = await fetch(`http://localhost:3030/data/orders?where=_ownerId%3D${userData.id}`, {
        //     headers: {'X-Authorization': userData.token}
        // });
        const res = await fetch('http://localhost:3030/data/orders');
        if (res.ok != true) {
            const error = await res.json();
            throw new Error(error.message);
        }
        let orders = await res.json();
        console.log(orders);
        orders = orders.filter(o => o._ownerId == userData.id);
        console.log(orders)
        let orderSum = 0;
        const totalProds = [] 
        Object.values(orders).forEach(o => {
            Object.keys(o).forEach(k => {
                if (!k.startsWith('_')) {
                    totalProds.push(k);
                    orderSum += Number(o[k]);
                }
            });
        });
        document.querySelector('#BoughtFurn').textContent = totalProds.join(', ');
        document.querySelector('#totalSum').textContent = `${orderSum} $`;
    }catch (err) {
        alert(err.message);
    }
}

// If need remove product from store after buy it.

// async function dellPoduct(id) {
//     console.log(id)
//     try {
//         const res = await fetch('http://localhost:3030/data/furniture/' + id, {
//             method: 'delete',
//             headers: {
//                 'X-Authorization': userData.token
//             }
//         });
//         if (res.ok != true) {
//             const error = await res.json();
//             throw new Error(error.message)
//         }
//     } catch (err) {
//         alert(err.message);
//     }
// }

async function buyProduct() {
    const products = [...table.children].filter(c => c.lastChild.firstChild.checked);
    
    const order = {};
    products.forEach(p => {
        order[p.children[1].textContent] = p.children[2].textContent;
    });
    
    try {
        if (Object.keys(order).length == 0) {
            throw new Error('Check one ore more products!')
        }
        const res = await fetch('http://localhost:3030/data/orders', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': userData.token
            },
            body: JSON.stringify(order)
        });
        if (res.ok != true) {
            const error = await res.json();
            throw new Error(error.message);
        }
        window.location = './home.html';
    }catch (err) {
        alert(err.message);
    }
    
// If need remove product from store after buy it.

    // const prodIds = products.map(p => p.id); // if need remove product from store.
    // for (let id of prodIds) {
    //     await dellPoduct(id)
    // };
    // products.forEach(p => p.remove())
}

function logOut() {
    localStorage.clear();
    window.location = './home.html';
}

function createRow(i) {
    const row = document.createElement('tr');
    row.id = i._id;
    row.innerHTML = `<td><img src="${i.img}"></td>
<td><p>${i.name}</p></td>
<td><p>${i.price}</p></td>
<td><p>${i.decFactor}</p></td>
<td><input type="checkbox"${userData ? '' : 'disabled'}/></td>`;
    return row;
}

async function loadItems() {
    try {
        const res = await fetch('http://localhost:3030/data/furniture');
        if (res.ok != true) {
            const error = await res.json();
            throw new Error(error.message);
        }
        const data = await res.json();
        data.map(i => table.appendChild(createRow(i)));
    } catch (err) {
        alert(err.message);
    }
}

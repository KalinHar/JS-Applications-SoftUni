async function lockedProfile() {
    const main = document.querySelector('main');
    const profilCard = document.querySelector('#main div');
    const res = await fetch('http://localhost:3030/jsonstore/advanced/profiles');
    const data = await (res.json());
    
    Object.values(data).forEach(d => {
        let newProfilCard = profilCard.cloneNode(true);
        main.appendChild(newProfilCard);

        const [lock, unlock, name, email, age] = Array.from(newProfilCard.querySelectorAll('input'));
        name.value = d.username;
        email.value = d.email;
        age.value = d.age;
        lock.name = d.username;
        lock.checked = true;
        unlock.name = d.username;

        newProfilCard.querySelector('button').addEventListener('click', (e) => {
            if (e.target.parentElement.children[4].checked) {
                if (e.target.textContent == 'Show more') {
                    e.target.textContent = 'Show less';
                    e.target.previousElementSibling.style.display = 'block';
                } else {
                    e.target.textContent ='Show more';
                    e.target.previousElementSibling.style.display = 'none';
                }
            }
        })
    });
    profilCard.style.display = 'none';
}
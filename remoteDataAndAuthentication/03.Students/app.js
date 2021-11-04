const url = 'http://localhost:3030/jsonstore/collections/students';
document.querySelector('#submit').addEventListener('click', submitStudent);
const form = document.querySelector('#form')
const tBody = document.querySelector('#results tbody');

function loadStudent(s) {
    const row = document.createElement('tr');
    row.innerHTML = `<td>${s.firstName}</td><td>${s.lastName}</td><td>${s.facultyNumber}</td><td>${s.grade}</td>`;
    tBody.appendChild(row);
}
async function getStudents() {
    const res = await fetch(url);
    const data = await res.json();
    Object.values(data).map(loadStudent);
}
async function submitStudent(e) {
    e.preventDefault();
    const data = new FormData(form);
    const firstName = data.get('firstName').trim();
    const lastName = data.get('lastName').trim();
    const facultyNumber = data.get('facultyNumber').trim();
    const grade = data.get('grade').trim();

    if (firstName != '' && lastName != '' && Number(grade) > 0 && Number(grade) <= 6 && Number(facultyNumber) > 0) {
        student = { firstName, lastName, facultyNumber, grade: Number(grade) }
        const options = {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(student)
        }
        try {
            const res = await fetch(url, options);
            if (res.ok != true) {
                throw new Error(res.statusText);
            }
            const result = await res.json();
            loadStudent(student);
            form.reset();
        } catch (err) {
            alert(err)
        }
    }
}
getStudents()
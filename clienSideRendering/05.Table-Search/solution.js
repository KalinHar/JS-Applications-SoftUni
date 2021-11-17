import { html, render } from "./node_modules/lit-html/lit-html.js";

const row = (st) => html`
<tr class=${st.match ? 'select' : '' }>
   <td>${st.firstName} ${st.lastName}</td>
   <td>${st.email}</td>
   <td>${st.course}</td>
</tr>`;

const table = document.querySelector('tbody');
let allStudents = await getStudentsData();

resetStudents();
function resetStudents() {
   allStudents.forEach(s => s.match = false);
}

update();
function update() {
   render(allStudents.map(row), table)
}

document.querySelector('#searchBtn').addEventListener('click', onSearch);
const searchText = document.querySelector('#searchField');

function onSearch() {
   resetStudents();

   if (!searchText.value.trim()) {
      resetStudents();
      update()
      return;
   }

   allStudents.forEach(st => {
      if (compare(st.firstName) || compare(st.lastName) || compare(st.email) || compare(st.course)) {
         st.match = true;
      }
   });
   update()
   searchText.value = "";

   function compare(text) {
      return text.toLocaleLowerCase().includes(searchText.value.trim().toLocaleLowerCase());
   }
}

async function getStudentsData() {
   const res = await fetch('http://localhost:3030/jsonstore/advanced/table');
   const stData = await res.json();
   return Object.values(stData);
}
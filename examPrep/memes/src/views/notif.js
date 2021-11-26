const element = document.querySelector('#errorBox');
const otput = element.querySelector('span');

export function notify(msg) {
    otput.textContent = msg;
    element.style.display = 'block';

    setTimeout(() => element.style.display = 'none', 3000)
}
function attachEvents() {
    const url = 'http://localhost:3030/jsonstore/messenger';
    const messages = document.getElementById('messages');
    const [name, content, sendBtn, refreshBtn] = document.querySelectorAll('input');
    getData();
    sendBtn.addEventListener('click', postData);
    refreshBtn.addEventListener('click', getData);
 
    async function postData() {
        if (name.value.trim() != '' && content.value.trim() != '') {
            const data = {
                author: name.value,
                content: content.value
            } 
            const options = {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)    
            };
            try {
                const res = await fetch(url, options);
                if (res.ok != true) {
                    throw new Error(res.statusText);
                }
                const result = await res.json();
    
                console.log(result);
            } catch (err) {
    
            }
        }
        getData()
        content.value = '';
    }
    async function getData() {
        const res = await fetch(url);
        const data = await res.json();

        const result = Object.values(data).map(v => `${v.author}: ${v.content}`).join('\n');
        messages.value = result;
        
        return data;
    }
}

attachEvents();
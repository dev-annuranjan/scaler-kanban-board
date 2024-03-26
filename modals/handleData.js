const state = {
    db: null
}
const request = indexedDB.open("kanban");

request.onupgradeneeded = e => {
    const db = e.target.result();
    state.db = db;
    db.createObjectStore('app-data', {keyPath: 'id'});
}

request.onsuccess = e => {
    const db = e.target.result;
    state.db = db;
}

request.onerror = e => {
    console.log(e);
}

function saveAppData(data){
    const db = state.db;
    const transaction = db.transaction('app-data', 'readwrite');
    transaction.objectStore('app-data').delete("");
    transaction.objectStore('app-data').add(data);
}

function getDataFromDB(){
    
}
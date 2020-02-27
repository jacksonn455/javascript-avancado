class ConnectionFactory{


    constructor(){
        throw new Error("Não é possivel criar instancia de ConnectionFactory")
    }

    static getConnection(){
        return new Promise((resolve, reject) => {
            let openRequest = window.indexedDB.open('aluraframe', 5);

            openRequest.onupgradeneeded = e => {

            };

            onpenRequest.onsucess = e => {

            };

            openRequest.onerror = e => {
                
            }
        })
    }
}

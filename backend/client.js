

const axios = require('axios');

//Get

async function getTarefas() {

    try {

        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: 'http://localhost:4002/tarefas',
            headers: { }
        };
          
        axios.request(config)
          .then((response) => {
            console.log(JSON.stringify(response.data));
        })
          .catch((error) => {
            console.log(error);
        });



    } catch (error) {}

}




//post

async function atualizarTarefa(id) {
    try {

        const data = {
            descricao: "Ir ao ginasio", // Altere aqui para o texto da tarefa que quiser
            feita: false
        };
          
        axios.post('http://localhost:4002/tarefas', data, {
        headers: { 'Content-Type': 'application/json' }
        })
        .then(response => {
            console.log('Resposta do POST:', response.data);
        })
        .catch(error => {
            console.error('Erro ao criar tarefa:', error.message);
        });

    } catch (error) {}

}

//delete
async function deleteTarefa(id) {
    try {
        let config = {
            method: 'delete',
            maxBodyLength: Infinity,
            url: 'http://localhost:4002/tarefas/yx7bd6JzfgvTOs21qsnz', // Substituir o x pelo id da tarefa
            headers: { }
          };
          
          axios.request(config)
          .then((response) => {
            console.log(JSON.stringify(response.data));
          })
          .catch((error) => {
            console.log(error);
          });


    } catch (error){}
}

async function atualizarTarefa(id) {
    try {
        
        let data = JSON.stringify({    // info que queremos atualizar
            "descricao": "Comprar 3 paºes",
            "feita": true
        });
          
        let config = {
            method: 'put',
            maxBodyLength: Infinity,
            url: 'http://localhost:4002/tarefas/iExSaCP5vf3B3rDp3rTv',// Substituir o x pelo id da tarefa
            headers: { 
              'Content-Type': 'application/json'
            },
            data : data
        };
          
        axios.request(config)
          .then((response) => {
            console.log(JSON.stringify(response.data));
          })
          .catch((error) => {
            console.log(error);
        });
          
        
    } catch (error) {
        console.error('Erro ao atualizar tarefa:', error.message);
    }
}





//getTarefas();
//atualizarTarefa();
//deleteTarefa(); 
atualizarTarefa();


const axios = require('axios');

//Get

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

atualizarTarefa();
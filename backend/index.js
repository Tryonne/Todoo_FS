const express = require('express');
const admin = require('firebase-admin');
const bodyParser = require('body-parser');
const cors = require('cors');


const app = express();
const port = 4002;

const serviceAccount = require('./todoo-gui-firebase-adminsdk-fbsvc-78e6679830.json');

app.use(cors());

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
})

const db = admin.firestore();

app.use(bodyParser.json());




app.get('/', (req, res) => {
    return res.status(200).json({ message: 'Welcome Boboo!' });
});



app.get('/tarefas', async (req, res) => {
    
    
    try {

        const tarefasSnapshot = await db.collection('tarefas').get();
        console.log('Tarefas:', tarefasSnapshot); // Vai mostrar quantos documentos foram encontrados
        const data = tarefasSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        res.status(200).json(data);
        
        
            
        const tarefasSnapshot1 = await db.collection('tarefas').get();
        console.log('Tarefas:', tarefasSnapshot.docs.length); // Vai mostrar quantos documentos foram encontrados
        

    } catch (error) {
        console.error("Error fetching tasks:", error);
        res.status(500).send("Error fetching tasks");
    }
})


app.post('/tarefas', async (req, res) => {
    
    const { descricao, feita } = req.body;
  
    if (!descricao) {
      return res.status(400).json({ error: 'Descrição obrigatória' });
    }
  
    try {
      const novaTarefa = {
        descricao,
        feita: false,
      };
  
      const docRef = await db.collection('tarefas').add(novaTarefa);
      res.status(201).json({ id: docRef.id, ...novaTarefa });
    } catch (error) {

        
      res.status(500).json({ error: 'Erro ao criar tarefa' });
    }

    console.log('Tarefa criada:', { descricao });
});

app.delete('/tarefas/:id', async (req, res) => {
    const { id } = req.params;
  
    try {
      await db.collection('tarefas').doc(id).delete();
      res.status(200).json({ message: 'Tarefa apagada com sucesso' });
    } catch (error) {
      res.status(500).json({ error: 'Erro ao apagar tarefa' });
    }
});


app.put('/tarefas/:id', async (req, res) => {
    const { id } = req.params;
    const { descricao, feita } = req.body;
  
    try {
      const tarefaRef = db.collection('tarefas').doc(id);
      const tarefa = await tarefaRef.get();
  
      if (!tarefa.exists) {
        return res.status(404).json({ error: 'Tarefa não encontrada' });
      }
  
      await tarefaRef.update({ ...(descricao && { descricao }), ...(feita !== undefined && { feita }) });
      res.status(200).json({ message: 'Tarefa atualizada com sucesso' });
    } catch (error) {
      res.status(500).json({ error: 'Erro ao atualizar tarefa' });
    }
});
  
  

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
})



const express = require('express');
const admin = require('firebase-admin');
const bodyParser = require('body-parser');

const app = express();
const port = 4002;

const serviceAccount = require('./todoo-gui-firebase-adminsdk-fbsvc-63da9d5845.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
})



app.get('/', (req, res) => {
    return res.status(200).json({ message: 'Welcome Boboo!' });
});





app.get('/tarefas', async (req, res) => {
    const db = admin.firestore();
    
    try {

        const tarefasSnapshot = await db.collection('tarefasTeste').get();
        console.log('Tarefas:', tarefasSnapshot); // Vai mostrar quantos documentos foram encontrados
        const data = tarefasSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        res.status(200).json(data);
        
        
            
        const tarefasSnapshot1 = await db.collection('tarefaTeste').get();
        console.log('Tarefas:', tarefasSnapshot.docs.length); // Vai mostrar quantos documentos foram encontrados
        

    } catch (error) {
        console.error("Error fetching tasks:", error);
        res.status(500).send("Error fetching tasks");
    }x 
})



app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
})



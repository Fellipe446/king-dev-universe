const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// Rota Principal (Home de Elite)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Rota do Editor (The Forge)
app.get('/editor', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'editor.html'));
});

// Simulação de Salvamento API
app.post('/api/save', (req, res) => {
    console.log("💾 Dados recebidos do King Builder:", req.body);
    res.json({ success: true, message: "Projeto armazenado na nuvem King!" });
});

app.listen(PORT, () => {
    console.log(`🚀 King Dev Universe rodando em http://localhost:${PORT}`);
});

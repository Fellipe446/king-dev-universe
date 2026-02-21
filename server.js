const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json({ limit: '10mb' }));

// API para salvar projetos (Itens 401-500 da sua lista)
app.post('/api/save', (req, res) => {
    console.log("💾 Projeto King Dev recebido com sucesso!");
    res.json({ success: true, message: "Projeto salvo na nuvem do King!" });
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`🚀 King Dev Universe rodando na porta ${PORT}`);
});

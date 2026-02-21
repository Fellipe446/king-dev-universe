const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json({ limit: '10mb' })); // Permite projetos grandes

// Rota para Salvar o Projeto (Itens 401-500)
app.post('/api/save', (req, res) => {
    const projectData = req.body;
    // No futuro, aqui conectamos ao MongoDB ou PostgreSQL
    console.log("📌 Recebido do King Dev Builder:", projectData.elements.length, "elementos.");
    res.json({ success: true, message: "Projeto armazenado na nuvem." });
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`🚀 King Dev Academy ONLINE na porta ${PORT}`);
});

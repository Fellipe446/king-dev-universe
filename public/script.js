lucide.createIcons();
let project = { elements: [], selectedId: null };

function addElement(type) {
    const el = {
        id: 'king-' + Date.now(),
        name: type.toUpperCase() + ' #' + (project.elements.length + 1),
        type: type,
        text: type === 'button' ? 'Clique Aqui' : (type === 'form' ? 'Seu Nome' : 'Novo Título'),
        x: 40, y: 100, w: 280, h: 50,
        bg: type === 'button' ? '#4c97ff' : (type === 'form' ? '#ffffff' : 'transparent'),
        color: type === 'button' ? '#ffffff' : '#1e293b',
        radius: 12,
        fontSize: 16,
        zIndex: 10,
        action: 'none',
        actionVal: ''
    };
    project.elements.push(el);
    render();
    select(el.id);
}

function render() {
    const canvas = document.getElementById('canvas');
    const layerList = document.getElementById('layer-list');
    canvas.innerHTML = '';
    layerList.innerHTML = '';

    // Ordenar por Z-Index para renderizar corretamente
    project.elements.sort((a, b) => a.zIndex - b.zIndex).forEach(el => {
        const dom = document.createElement(el.type === 'button' ? 'button' : 'div');
        dom.innerText = el.text;
        dom.id = el.id;
        dom.className = `absolute flex items-center justify-center cursor-move transition-shadow ${project.selectedId === el.id ? 'element-selected' : ''}`;
        
        dom.style.cssText = `
            left: ${el.x}px; top: ${el.y}px; width: ${el.w}px; height: ${el.h}px;
            background: ${el.bg}; color: ${el.color}; border-radius: ${el.radius}px;
            font-size: ${el.fontSize}px; z-index: ${el.zIndex}; font-weight: bold;
            box-shadow: 0 4px 10px rgba(0,0,0,0.1);
        `;

        // Lógica de Movimentação
        dom.onmousedown = (e) => startDrag(e, el);
        canvas.appendChild(dom);

        // Renderizar Lista de Camadas
        const li = document.createElement('div');
        li.className = `text-[10px] p-2 mb-1 rounded flex justify-between cursor-pointer ${project.selectedId === el.id ? 'bg-blue-100 font-bold' : 'bg-white hover:bg-gray-100'}`;
        li.innerHTML = `<span>${el.name}</span> <i data-lucide="eye" class="w-3 h-3 text-gray-400"></i>`;
        li.onclick = () => select(el.id);
        layerList.prepend(li); // Elemento mais alto no topo da lista
    });
    lucide.createIcons();
}

function startDrag(e, el) {
    select(el.id);
    const canvasRect = document.getElementById('canvas').getBoundingClientRect();
    let shiftX = e.clientX - canvasRect.left - el.x;
    let shiftY = e.clientY - canvasRect.top - el.y;

    document.onmousemove = (ev) => {
        el.x = Math.max(0, Math.min(ev.clientX - canvasRect.left - shiftX, 375 - el.w));
        el.y = Math.max(0, Math.min(ev.clientY - canvasRect.top - shiftY, 812 - el.h));
        render();
    };
    document.onmouseup = () => document.onmousemove = null;
}

function select(id) {
    project.selectedId = id;
    const el = project.elements.find(e => e.id === id);
    document.getElementById('no-sel').classList.add('hidden');
    document.getElementById('inspector-ui').classList.remove('hidden');

    document.getElementById('prop-text').value = el.text;
    document.getElementById('prop-action').value = el.action;
    document.getElementById('prop-action-val').value = el.actionVal;
    render();
}

function update() {
    const el = project.elements.find(e => e.id === project.selectedId);
    el.text = document.getElementById('prop-text').value;
    el.action = document.getElementById('prop-action').value;
    el.actionVal = document.getElementById('prop-action-val').value;
    render();
}

function changeZ(dir) {
    const el = project.elements.find(e => e.id === project.selectedId);
    el.zIndex += (dir === 'up' ? 1 : -1);
    render();
}

// INTEGRAÇÃO COM BACK-END (RENDER)
async function saveOnRender() {
    const statusIA = document.getElementById('status-ia');
    statusIA.innerText = "IA: SALVANDO PROJETO NO RENDER...";
    
    try {
        const response = await fetch('/api/save', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(project)
        });
        const result = await response.json();
        alert("✅ Projeto King Dev Academy salvo com sucesso!");
    } catch (err) {
        console.log("Erro ao salvar:", err);
        alert("⚠️ Erro de conexão com o servidor.");
    } finally {
        statusIA.innerText = "IA ANALISANDO LAYOUT...";
    }
}

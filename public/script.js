lucide.createIcons();
let project = { elements: [], selectedId: null };

function addElement(type) {
    const el = {
        id: 'king-' + Date.now(),
        type: type,
        text: type === 'img' ? 'https://via.placeholder.com/300' : 'Novo Elemento',
        x: 40, y: 100, w: 280, h: type === 'video' ? 160 : 50,
        bg: type === 'button' ? '#4c97ff' : (type === 'div' ? '#e2e8f0' : 'transparent'),
        color: '#1e293b',
        radius: 8,
        fontSize: 16,
        opacity: 100
    };
    project.elements.push(el);
    render();
    select(el.id);
}

function render() {
    const canvas = document.getElementById('canvas');
    canvas.innerHTML = '';
    project.elements.forEach(el => {
        let dom;
        if (el.type === 'img') {
            dom = document.createElement('img');
            dom.src = el.text;
            dom.style.objectFit = 'cover';
        } else if (el.type === 'video') {
            dom = document.createElement('div');
            dom.innerHTML = `<iframe class="w-full h-full pointer-events-none" src="${el.text.replace('watch?v=', 'embed/')}"></iframe>`;
            dom.style.background = '#000';
        } else if (el.type === 'input') {
            dom = document.createElement('input');
            dom.placeholder = el.text;
            dom.className = "px-4 border border-gray-300";
        } else {
            dom = document.createElement(el.type === 'button' ? 'button' : (el.type === 'h1' ? 'h1' : 'div'));
            dom.innerText = el.text;
            if (el.type === 'h1') dom.style.fontSize = (el.fontSize * 1.5) + 'px';
        }

        dom.id = el.id;
        dom.className += ` absolute flex items-center justify-center cursor-move transition-all ${project.selectedId === el.id ? 'element-selected' : ''}`;
        dom.style.cssText += `
            left: ${el.x}px; top: ${el.y}px; width: ${el.w}px; height: ${el.h}px;
            background: ${el.bg}; color: ${el.color}; border-radius: ${el.radius}px;
            font-size: ${el.fontSize}px; opacity: ${el.opacity / 100}; font-weight: bold; overflow: hidden;
        `;

        dom.onmousedown = (e) => {
            select(el.id);
            let canvasRect = canvas.getBoundingClientRect();
            let shiftX = e.clientX - canvasRect.left - el.x;
            let shiftY = e.clientY - canvasRect.top - el.y;

            document.onmousemove = (ev) => {
                el.x = Math.round((ev.clientX - canvasRect.left - shiftX) / 10) * 10; // Snap 10px
                el.y = Math.round((ev.clientY - canvasRect.top - shiftY) / 10) * 10;
                render();
            };
            document.onmouseup = () => document.onmousemove = null;
        };
        canvas.appendChild(dom);
    });
}

function select(id) {
    project.selectedId = id;
    const el = project.elements.find(e => e.id === id);
    document.getElementById('no-sel').classList.add('hidden');
    document.getElementById('inspector-ui').classList.remove('hidden');

    document.getElementById('prop-text').value = el.text;
    document.getElementById('prop-bg').value = el.bg;
    document.getElementById('prop-color').value = el.color;
    document.getElementById('prop-fontsize').value = el.fontSize;
    document.getElementById('prop-radius').value = el.radius;
    document.getElementById('prop-opacity').value = el.opacity;
    render();
}

function update() {
    const el = project.elements.find(e => e.id === project.selectedId);
    el.text = document.getElementById('prop-text').value;
    el.bg = document.getElementById('prop-bg').value;
    el.color = document.getElementById('prop-color').value;
    el.fontSize = parseInt(document.getElementById('prop-fontsize').value);
    el.radius = document.getElementById('prop-radius').value;
    el.opacity = document.getElementById('prop-opacity').value;
    render();
}

function remove() {
    project.elements = project.elements.filter(e => e.id !== project.selectedId);
    project.selectedId = null;
    document.getElementById('inspector-ui').classList.add('hidden');
    document.getElementById('no-sel').classList.remove('hidden');
    render();
}

function resize(mode) {
    const c = document.getElementById('canvas');
    c.className = `bg-white shadow-2xl relative border-[10px] border-slate-900 overflow-hidden transition-all duration-500 ${mode === 'mobile' ? 'canvas-mobile' : 'canvas-desktop'}`;
}

function exportProject() {
    console.log("Exportando JSON do Projeto:", JSON.stringify(project.elements));
    alert("Código compilado no console! Pronto para o próximo nível.");
}

const API_PESSOAS = '/pessoas';
const API_CARROS = '/carros';
const API_ASSOCIACOES = '/associacoes';
const API_TELEFONES = '/telefones';

const pessoaForm = document.getElementById('pessoaForm');
const carroForm = document.getElementById('carroForm');
const associacaoForm = document.getElementById('associacaoForm');
const telefoneForm = document.getElementById('telefoneForm');

const pessoaList = document.getElementById('pessoaList');
const carroList = document.getElementById('carroList');
const associacaoList = document.getElementById('associacaoList');
const telefoneList = document.getElementById('telefoneList');

const selectPessoa = document.getElementById('selectPessoa');
const selectCarro = document.getElementById('selectCarro');
const selectPessoaTelefone = document.getElementById('selectPessoaTelefone');

async function loadAll() {
    await Promise.all([loadPessoas(), loadCarros(), loadAssociacoes(), loadTelefones()]);
}

async function loadPessoas() {
    const res = await fetch(API_PESSOAS);
    const pessoas = await res.json();
    
    pessoaList.innerHTML = "";
    selectPessoa.innerHTML = '<option value="">Selecione a Pessoa</option>';
    selectPessoaTelefone.innerHTML = '<option value="">Selecione a Pessoa</option>';
    
    pessoas.forEach(p => {
        const li = document.createElement("li");
        li.innerHTML = `
            <span>${p.nome}</span>
            <div class="actions">
                <button onclick="editPessoa(${p.idpessoa}, '${p.nome}')">Editar</button>
                <button onclick="deletePessoa(${p.idpessoa})">Excluir</button>
            </div>`;
        pessoaList.appendChild(li);
        
        selectPessoa.add(new Option(p.nome, p.idpessoa));
        selectPessoaTelefone.add(new Option(p.nome, p.idpessoa));
    });
}

async function loadCarros() {
    const res = await fetch(API_CARROS);
    const carros = await res.json();
    
    carroList.innerHTML = "";
    selectCarro.innerHTML = '<option value="">Selecione o Carro</option>';
    
    carros.forEach(c => {
        const li = document.createElement("li");
        li.innerHTML = `
            <span>${c.modelo}</span>
            <div class="actions">
                <button onclick="editCarro(${c.idcarro}, '${c.modelo}')">Editar</button>
                <button onclick="deleteCarro(${c.idcarro})">Excluir</button>
            </div>`;
        carroList.appendChild(li);
        
        const opt = new Option(c.modelo, c.idcarro);
        selectCarro.add(opt);
    });
}

async function loadAssociacoes() {
    const res = await fetch(API_ASSOCIACOES);
    const data = await res.json();
    
    associacaoList.innerHTML = "";
    data.forEach(as => {
        const li = document.createElement("li");
        li.innerHTML = `
            <span><strong>${as.pessoa.nome}</strong> ↔ ${as.carro.modelo}</span>
            <div class="actions">
                <button onclick="deleteAssociacao(${as.idpessoa}, ${as.idcarro})">Remover</button>
            </div>`;
        associacaoList.appendChild(li);
    });
}

async function loadTelefones() {
    const res = await fetch(API_TELEFONES);
    const telefones = await res.json();
    
    telefoneList.innerHTML = "";
    telefones.forEach(t => {
        const li = document.createElement("li");
        li.innerHTML = `
            <span><strong>${t.pessoa.nome}:</strong> ${t.numero}</span>
            <div class="actions">
                <button onclick="editTelefone(${t.idtelefone}, '${t.numero}')">Editar</button>
                <button onclick="deleteTelefone(${t.idtelefone})">Excluir</button>
            </div>`;
        telefoneList.appendChild(li);
    });
}

pessoaForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const nome = document.getElementById('nomePessoa').value;
    await fetch(API_PESSOAS, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ nome })
    });
    pessoaForm.reset();
    loadPessoas();
});

carroForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const modelo = document.getElementById('modeloCarro').value;
    await fetch(API_CARROS, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ modelo })
    });
    carroForm.reset();
    loadCarros();
});

associacaoForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const idpessoa = parseInt(selectPessoa.value);
    const idcarro = parseInt(selectCarro.value);
    
    await fetch(API_ASSOCIACOES, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ idpessoa, idcarro })
    });
    loadAssociacoes();
});

telefoneForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const idpessoa = parseInt(selectPessoaTelefone.value);
    const numero = document.getElementById('numeroTelefone').value;
    
    await fetch(API_TELEFONES, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ numero, idpessoa })
    });
    
    telefoneForm.reset();
    loadTelefones();
});

async function deletePessoa(id) {
    await fetch(`${API_PESSOAS}/${id}`, { method: "DELETE" });
    loadAll();
}

async function deleteCarro(id) {
    await fetch(`${API_CARROS}/${id}`, { method: "DELETE" });
    loadAll();
}

async function deleteTelefone(id) {
    await fetch(`${API_TELEFONES}/${id}`, { method: "DELETE" });
    loadTelefones();
}

async function deleteAssociacao(idPessoa, idCarro) {
    await fetch(`${API_ASSOCIACOES}/${idPessoa}/${idCarro}`, { method: "DELETE" });
    loadAssociacoes();
}

async function editPessoa(id, oldNome) {
    const novoNome = prompt("Novo nome:", oldNome);
    if (novoNome) {
        await fetch(`${API_PESSOAS}/${id}`, {
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({ nome: novoNome })
        });
        loadPessoas();
        loadAssociacoes();
        loadTelefones();
    }
}

async function editCarro(id, oldModelo) {
    const novoModelo = prompt("Novo modelo:", oldModelo);
    if (novoModelo) {
        await fetch(`${API_CARROS}/${id}`, {
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({ modelo: novoModelo })
        });
        loadCarros();
        loadAssociacoes();
    }
}

async function editTelefone(id, oldNumero) {
    const novoNumero = prompt("Novo número:", oldNumero);
    if (novoNumero) {
        await fetch(`${API_TELEFONES}/${id}`, {
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({ numero: novoNumero })
        });
        loadTelefones();
    }
}

loadAll();
const tarefaInput = document.getElementById('tarefa-input');
const enviarBtn = document.querySelector('.enviar');
const tarefas = document.querySelector('.tarefas');

let listaTarefas = [];

function criarTarefa(texto , id) {
  return `
    <div class="tarefa" data-id="${id}">
      <input type="checkbox" class="concluido" name="concluido">
      <p class="descricao">${texto}</p>
      <div class="button">
       <button type="button" class="acao-b">
         <i class="fa-regular fa-pen-to-square"></i>
       </button>
       <button type="button" class="acao-b deletarBtn">
         <i class="fa-regular fa-trash-can"></i>        
       </button>
      </div>
    </div>
  `;
};
function exibirTarefa(tarefa) {
 tarefas.innerHTML += criarTarefa(tarefa.descricao, tarefa.id);
};

//mensagem de alerta 
const alerta = () => {
 const mensagemAlerta = document.querySelector('#alerta');
 mensagemAlerta.textContent = "Por favor, preencha o campo antes de continuar.";

 setTimeout(() => {
    mensagemAlerta.textContent = "";
  }, 3000); 
};

// adicionar nova tarefa
function adicionarTarefa() {
 const descricao = tarefaInput.value.trim();

 if (descricao === "") {
   alerta();
   return;
  }

 const tarefa = {
   descricao : descricao,
   id : Date.now(),
   status : false,
  };

 listaTarefas.push(tarefa);
 tarefaInput.value = '';
 exibirTarefa(tarefa);
};

enviarBtn.addEventListener('click',adicionarTarefa);
tarefaInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    adicionarTarefa();
  } 
});

// botão deletar tarefa
tarefas.addEventListener('click', function(event) {
 if (event.target.classList.contains('deletarBtn')) {
    const tarefaDiv = event.target.closest('.tarefa');
    const id = tarefaDiv.dataset.id;
  
    listaTarefas = listaTarefas.filter(t => t.id != id);
    
    tarefaDiv.remove();
  }
});
 
// campo tarefa concluida
function atualizarEstilo(tarefaDiv,status){
 tarefaDiv.classList.toggle('tarefaConcluida', status);
};

function atualizarTarefa(id, status) {
  const tarefa = listaTarefas.find(t => t.id === id);
  if (tarefa) {
    tarefa.status = status;
  }
}

tarefas.addEventListener('click', (event) => {
  if (event.target.type === 'checkbox') {
    const tarefaDiv = event.target.closest('.tarefa');
    const id = Number(tarefaDiv.dataset.id);
    const status = event.target.checked;

    atualizarTarefa(id, status);
    atualizarEstilo(tarefaDiv, status);
  }
});
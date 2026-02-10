const addTarefa = document.getElementById('add-tarefa');
const enviarBtn = document.querySelector('.enviar');
const tarefas = document.querySelector('.tarefas');

let listaTarefas = [];

function criarTarefa(texto , id) {
  return `
    <div class="tarefa" data-id="${id}">
      <input type="checkbox" id="concluido" name="concluido">
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
enviarBtn.addEventListener('click', function() {
 const tarefa = {
 descricao : addTarefa.value,
 id : Date.now(),
 status : false,
 };

 listaTarefas.push(tarefa);
 exibirTarefa(tarefa);
 
 addTarefa.value = '';
 console.log(tarefa);
});

tarefas.addEventListener('click', function(event) {
 if (event.target.classList.contains('deletarBtn')) {
    const tarefaDiv = event.target.closest('.tarefa');
    const id = tarefaDiv.dataset.id;
  
    listaTarefas = listaTarefas.filter(t => t.id != id);
    
    tarefaDiv.remove();
  }
});
 
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
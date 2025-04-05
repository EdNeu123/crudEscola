/*  Funções de LocalStorage - Necessário devido a organização das pastas e arquivos */
function getProfessors() {
    var data = localStorage.getItem("professors");
    return data ? JSON.parse(data) : [];
  }
  function saveProfessors(profs) {
    localStorage.setItem("professors", JSON.stringify(profs));
  }
  function getMaterias() {
    var data = localStorage.getItem("materias");
    return data ? JSON.parse(data) : [];
  }
  function saveMaterias(mats) {
    localStorage.setItem("materias", JSON.stringify(mats));
  }
  function getAlunos() {
    var data = localStorage.getItem("alunos");
    return data ? JSON.parse(data) : [];
  }
  function saveAlunos(alus) {
    localStorage.setItem("alunos", JSON.stringify(alus));
  }
  
  /* Cadastro de Professor */
  function addOrUpdateProfessor() {
    var nome = document.getElementById("professor-nome").value.trim();
    var materiaMinistra = document.getElementById("professor-materia").value.trim();
    var index = document.getElementById("professor-index").value;
    
    if (nome === "" || materiaMinistra === "") {
      alert("Preencha todos os campos!");
      return;
    }
    
    var profs = getProfessors();
    if (index === "") {
      profs.push({ nome: nome, materiaMinistra: materiaMinistra });
    } else {
      profs[index] = { nome: nome, materiaMinistra: materiaMinistra };
    }
    saveProfessors(profs);
    clearProfessorForm();
    renderProfessors();
  }
  function renderProfessors() { // mostrar  a lista de professores
    var list = document.getElementById("lista-professores");
    list.innerHTML = "";
    var profs = getProfessors();
    for (var i = 0; i < profs.length; i++) {
      var li = document.createElement("li");
      li.textContent = "Nome: " + profs[i].nome + " | Ministra: " + profs[i].materiaMinistra;
      
      var btnEdit = document.createElement("button");
      btnEdit.textContent = "Editar";
      btnEdit.onclick = (function(i) { return function() { editProfessor(i); }; })(i);
      
      var btnDelete = document.createElement("button");
      btnDelete.textContent = "Excluir";
      btnDelete.onclick = (function(i) { return function() { deleteProfessor(i); }; })(i);
      
      li.appendChild(btnEdit);
      li.appendChild(btnDelete);
      list.appendChild(li);
    }
  }
  function editProfessor(i) {
    var profs = getProfessors();
    document.getElementById("professor-index").value = i;
    document.getElementById("professor-nome").value = profs[i].nome;
    document.getElementById("professor-materia").value = profs[i].materiaMinistra;
  }
  function deleteProfessor(i) {
    if (confirm("Deseja excluir este professor?")) {
      var profs = getProfessors();
      profs.splice(i, 1);
      saveProfessors(profs);
      renderProfessors();
    }
  }
  function clearProfessorForm() {
    document.getElementById("professor-index").value = "";
    document.getElementById("professor-nome").value = "";
    document.getElementById("professor-materia").value = "";
  }
  
  /* Cadastro de Matéria */
  function addOrUpdateMateria() {
    var nome = document.getElementById("materia-nome").value.trim();
    var professorIndex = document.getElementById("materia-professor").value;
    var index = document.getElementById("materia-index").value;
    
    if (nome === "" || professorIndex === "") {
      alert("Preencha todos os campos!");
      return;
    }
    
    var mats = getMaterias();
    if (index === "") {
      mats.push({ nome: nome, professor: professorIndex });
    } else {
      mats[index] = { nome: nome, professor: professorIndex };
    }
    saveMaterias(mats);
    clearMateriaForm();
    renderMaterias();
  }
  function renderMaterias() {
    var list = document.getElementById("lista-materias");
    list.innerHTML = "";
    var mats = getMaterias();
    var profs = getProfessors();
    for (var i = 0; i < mats.length; i++) {
      var li = document.createElement("li");
      var professorNome = (profs[mats[i].professor] ? profs[mats[i].professor].nome : "N/A");
      li.textContent = "Matéria: " + mats[i].nome + " | Professor: " + professorNome;
      
      var btnEdit = document.createElement("button");
      btnEdit.textContent = "Editar";
      btnEdit.onclick = (function(i) { return function() { editMateria(i); }; })(i);
      
      var btnDelete = document.createElement("button");
      btnDelete.textContent = "Excluir";
      btnDelete.onclick = (function(i) { return function() { deleteMateria(i); }; })(i);
      
      li.appendChild(btnEdit);
      li.appendChild(btnDelete);
      list.appendChild(li);
    }
  }
  function editMateria(i) {
    var mats = getMaterias();
    document.getElementById("materia-index").value = i;
    document.getElementById("materia-nome").value = mats[i].nome;
    document.getElementById("materia-professor").value = mats[i].professor;
  }
  function deleteMateria(i) {
    if (confirm("Deseja excluir esta matéria?")) {
      var mats = getMaterias();
      mats.splice(i, 1);
      saveMaterias(mats);
      renderMaterias();
    }
  }
  function clearMateriaForm() {
    document.getElementById("materia-index").value = "";
    document.getElementById("materia-nome").value = "";
    document.getElementById("materia-professor").value = "";
  }
  function updateMateriaProfessorOptions() {
    var select = document.getElementById("materia-professor");
    if (!select) return;
    select.innerHTML = '<option value="">Selecione um Professor</option>';
    var profs = getProfessors();
    for (var i = 0; i < profs.length; i++) {
      var option = document.createElement("option");
      option.value = i;
      option.textContent = profs[i].nome;
      select.appendChild(option);
    }
  }
  
  /*  Cadastro de Aluno  */
  function addOrUpdateAluno() {
    var nome = document.getElementById("aluno-nome").value.trim();
    var materiaIndex = document.getElementById("aluno-materia").value;
    var index = document.getElementById("aluno-index").value;
    
    if (nome === "" || materiaIndex === "") {
      alert("Preencha todos os campos!");
      return;
    }
    
    var alus = getAlunos();
    if (index === "") {
      alus.push({ nome: nome, materia: materiaIndex });
    } else {
      alus[index] = { nome: nome, materia: materiaIndex };
    }
    saveAlunos(alus);
    clearAlunoForm();
    renderAlunos();
  }
  function renderAlunos() {
    var list = document.getElementById("lista-alunos");
    list.innerHTML = "";
    var alus = getAlunos();
    var mats = getMaterias();
    for (var i = 0; i < alus.length; i++) {
      var li = document.createElement("li");
      var materiaNome = (mats[alus[i].materia] ? mats[alus[i].materia].nome : "N/A");
      li.textContent = "Aluno: " + alus[i].nome + " | Matéria: " + materiaNome;
      
      var btnEdit = document.createElement("button");
      btnEdit.textContent = "Editar";
      btnEdit.onclick = (function(i) { return function() { editAluno(i); }; })(i);
      
      var btnDelete = document.createElement("button");
      btnDelete.textContent = "Excluir";
      btnDelete.onclick = (function(i) { return function() { deleteAluno(i); }; })(i);
      
      li.appendChild(btnEdit);
      li.appendChild(btnDelete);
      list.appendChild(li);
    }
  }
  function editAluno(i) {
    var alus = getAlunos();
    document.getElementById("aluno-index").value = i;
    document.getElementById("aluno-nome").value = alus[i].nome;
    document.getElementById("aluno-materia").value = alus[i].materia;
  }
  function deleteAluno(i) {
    if (confirm("Deseja excluir este aluno?")) {
      var alus = getAlunos();
      alus.splice(i, 1);
      saveAlunos(alus);
      renderAlunos();
    }
  }
  function clearAlunoForm() {
    document.getElementById("aluno-index").value = "";
    document.getElementById("aluno-nome").value = "";
    document.getElementById("aluno-materia").value = "";
  }
  function updateAlunoMateriaOptions() {
    var select = document.getElementById("aluno-materia");
    if (!select) return;
    select.innerHTML = '<option value="">Selecione uma Matéria</option>';
    var mats = getMaterias();
    for (var i = 0; i < mats.length; i++) {
      var option = document.createElement("option");
      option.value = i;
      option.textContent = mats[i].nome;
      select.appendChild(option);
    }
  }
  
// pega endereço da api
const API_URL = 'http://127.0.0.1:5000/users';

// pega formularios e tabela do html
const userForm = document.getElementById('userForm');
const updateForm = document.getElementById('updateForm');
const userTable = document.getElementById('userTable');
 
// funcao para pegar usuarios da api e colocar na tabela html
async function fetchUsers() {
 
    // fetch vai gerar uma promise para acessar a API
    // traduzindo: fetch pede informacoes da api
    const response = await fetch(API_URL);
    // pega o corpo da api, onde ficam os dados que o front precisa
    const users = await response.json();
    // apaga o que tem na tabela e insere os usuarios um por um
    userTable.innerHTML = '';
    users.forEach(user => {
        userTable.innerHTML += `
            <tr>
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td>${user.age}</td>
                <td>
                    <button onclick="editUser(${user.id}, '${user.name}', '${user.email}', ${user.age})">Edit</button>
                    <button onclick="deleteUser(${user.id})">Delete</button>
                </td>
            </tr>
        `;
    });
}
 
// add novo usuario
userForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const user = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        age: parseInt(document.getElementById('age').value)
    };
    // acessa a api, mas com o metodo POST (que insere dados, ao inves de pegar)
    // headers tem informacoes sobre a requisicao (nesse caso, que ela e um json)
    // body tem a requisicao em si (nesse caso, os dados do usuario que vai ser inserido)
    await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    });
    fetchUsers();
    userForm.reset();
});
 
// deletar usuario
async function deleteUser(id) {
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    fetchUsers();
}
 
// mostrar campo para editar usuario
function editUser(id, name, email, age) {
    updateForm.style.display = 'block';
    document.getElementById('updateId').value = id;
    document.getElementById('updateName').value = name;
    document.getElementById('updateEmail').value = email;
    document.getElementById('updateAge').value = age;
}
 
// editar usuario
updateForm.addEventListener('submit', async (e) => {
    e.preventDefault();
 
    const id = document.getElementById('updateId').value;
 
    const updatedUser = {
        name: document.getElementById('updateName').value,
        email: document.getElementById('updateEmail').value,
        age: parseInt(document.getElementById('updateAge').value)
    };
 
 
    await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedUser)
    });
    fetchUsers();
    updateForm.reset();
 
    // esconder campo de atualizacao novamente
    updateForm.style.display = 'none';
});
 
// fetch inicial
fetchUsers();

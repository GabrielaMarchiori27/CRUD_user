// Configuração do Axios
const api = axios.create({
    baseURL: '/api',
    timeout: 5000
});

// Variáveis globais
let editandoUsuario = false;
let usuarioEditandoId = null;

// Elementos do DOM
const userForm = document.getElementById('user-form');
const formTitle = document.getElementById('form-title');
const submitText = document.getElementById('submit-text');
const cancelBtn = document.getElementById('cancel-btn');
const alertContainer = document.getElementById('alert-container');
const usersContainer = document.getElementById('users-container');

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    carregarUsuarios();
    
    userForm.addEventListener('submit', handleSubmit);
    cancelBtn.addEventListener('click', cancelarEdicao);
});

// Função para mostrar alertas
function mostrarAlerta(mensagem, tipo = 'success') {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${tipo} alert-dismissible fade show`;
    alertDiv.innerHTML = `
        <i class="fas fa-${tipo === 'success' ? 'check-circle' : 'exclamation-triangle'}"></i>
        ${mensagem}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    alertContainer.appendChild(alertDiv);
    
    // Remove o alerta após 5 segundos
    setTimeout(() => {
        if (alertDiv.parentNode) {
            alertDiv.remove();
        }
    }, 5000);
}

// Função para carregar usuários
async function carregarUsuarios() {
    try {
        const response = await api.get('/usuarios');
        
        if (response.data.success) {
            renderizarUsuarios(response.data.data);
        } else {
            mostrarAlerta('Erro ao carregar usuários', 'danger');
        }
    } catch (error) {
        console.error('Erro ao carregar usuários:', error);
        mostrarAlerta('Erro ao conectar com o servidor', 'danger');
    }
}

// Função para renderizar usuários
function renderizarUsuarios(usuarios) {
    if (usuarios.length === 0) {
        usersContainer.innerHTML = `
            <div class="col-12 text-center">
                <div class="alert alert-info">
                    <i class="fas fa-info-circle"></i>
                    Nenhum usuário encontrado. Adicione o primeiro usuário!
                </div>
            </div>
        `;
        return;
    }

    usersContainer.innerHTML = usuarios.map(usuario => `
        <div class="col-md-6 col-lg-4 mb-3">
            <div class="card user-card h-100">
                <div class="card-body">
                    <h6 class="card-title">
                        <i class="fas fa-user"></i> ${usuario.nome}
                    </h6>
                    <p class="card-text">
                        <small class="text-muted">
                            <i class="fas fa-envelope"></i> ${usuario.email}<br>
                            <i class="fas fa-birthday-cake"></i> ${usuario.idade} anos
                        </small>
                    </p>
                    <div class="d-flex gap-2">
                        <button class="btn btn-warning btn-sm" onclick="editarUsuario(${usuario.id})">
                            <i class="fas fa-edit"></i> Editar
                        </button>
                        <button class="btn btn-danger btn-sm" onclick="excluirUsuario(${usuario.id}, '${usuario.nome}')">
                            <i class="fas fa-trash"></i> Excluir
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

// Função para lidar com o submit do formulário
async function handleSubmit(event) {
    event.preventDefault();
    
    const nome = document.getElementById('nome').value.trim();
    const email = document.getElementById('email').value.trim();
    const idade = parseInt(document.getElementById('idade').value);
    
    if (!nome || !email || !idade) {
        mostrarAlerta('Todos os campos são obrigatórios', 'warning');
        return;
    }
    
    const userData = { nome, email, idade };
    
    try {
        let response;
        
        if (editandoUsuario) {
            response = await api.put(`/usuarios/${usuarioEditandoId}`, userData);
        } else {
            response = await api.post('/usuarios', userData);
        }
        
        if (response.data.success) {
            mostrarAlerta(response.data.message, 'success');
            limparFormulario();
            carregarUsuarios();
        } else {
            mostrarAlerta(response.data.message, 'danger');
        }
    } catch (error) {
        console.error('Erro ao salvar usuário:', error);
        
        if (error.response && error.response.data && error.response.data.message) {
            mostrarAlerta(error.response.data.message, 'danger');
        } else {
            mostrarAlerta('Erro ao salvar usuário', 'danger');
        }
    }
}

// Função para editar usuário
async function editarUsuario(id) {
    try {
        const response = await api.get(`/usuarios/${id}`);
        
        if (response.data.success) {
            const usuario = response.data.data;
            
            document.getElementById('user-id').value = usuario.id;
            document.getElementById('nome').value = usuario.nome;
            document.getElementById('email').value = usuario.email;
            document.getElementById('idade').value = usuario.idade;
            
            editandoUsuario = true;
            usuarioEditandoId = id;
            
            formTitle.innerHTML = '<i class="fas fa-user-edit"></i> Editar Usuário';
            submitText.textContent = 'Atualizar';
            cancelBtn.style.display = 'inline-block';
            
            // Scroll para o formulário
            document.getElementById('user-form').scrollIntoView({ behavior: 'smooth' });
        }
    } catch (error) {
        console.error('Erro ao carregar usuário:', error);
        mostrarAlerta('Erro ao carregar dados do usuário', 'danger');
    }
}

// Função para cancelar edição
function cancelarEdicao() {
    limparFormulario();
}

// Função para limpar formulário
function limparFormulario() {
    userForm.reset();
    document.getElementById('user-id').value = '';
    
    editandoUsuario = false;
    usuarioEditandoId = null;
    
    formTitle.innerHTML = '<i class="fas fa-user-plus"></i> Adicionar Usuário';
    submitText.textContent = 'Salvar';
    cancelBtn.style.display = 'none';
}

// Função para excluir usuário
async function excluirUsuario(id, nome) {
    if (!confirm(`Tem certeza que deseja excluir o usuário "${nome}"?`)) {
        return;
    }
    
    try {
        const response = await api.delete(`/usuarios/${id}`);
        
        if (response.data.success) {
            mostrarAlerta(response.data.message, 'success');
            carregarUsuarios();
            
            // Se estava editando este usuário, cancelar edição
            if (editandoUsuario && usuarioEditandoId === id) {
                cancelarEdicao();
            }
        } else {
            mostrarAlerta(response.data.message, 'danger');
        }
    } catch (error) {
        console.error('Erro ao excluir usuário:', error);
        mostrarAlerta('Erro ao excluir usuário', 'danger');
    }
}

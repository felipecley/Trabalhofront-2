const nome = document.querySelector('#nome');
const sobrenome = document.querySelector('#sobrenome');
const email = document.querySelector('#email');
const idade = document.querySelector('#idade');
const form = document.querySelector('#registro');  

function validarFormulario() {
    let isValid = true;

    //Função auxiliar para verificar se um campo esta vazio
    function campoVazio(campo) {
        return campo.value.trim() === '';
    }
    
    // Validação do nome
    if (campoVazio(nome)) {
        exibirErro(nome, 'O nome é obrigatório.')
        isValid = false
    } else if (nome.value.length < 3 || nome.value.length > 50) {
        exibirErro(nome, 'O nome deve ter entre 3 e 50 caracteres.');
        isValid = false;
    } else {
        removeErro(nome);
    }

    // Validação do sobrenome
    if (campoVazio(sobrenome)) {
        exibirErro(sobrenome, 'O sobrenome é obrigatório.')
    } else if (sobrenome.value.length < 3 || sobrenome.value.length > 50) {
        exibirErro(sobrenome, 'O sobrenome deve ter entre 3 e 50 caracteres.');
        isValid = false;
    } else {
        removeErro(sobrenome);
    }

    // Validação do email com regex
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (campoVazio(email)) {
        exibirErro(email,'O email é obrigatório.')
        isValid = false
    } else if (!emailRegex.test(email.value)) {
        exibirErro(email, 'Digite um email válido.');
        isValid = false;
    } else {
        removeErro(email);
    }

    // Validação da idade
    if (campoVazio(idade)) {
        exibirErro(idade, 'A idade é obrigatória.')
        isValid = false
    } else if (idade.value <= 0 || idade.value >= 120 || isNaN(idade.value)) {
        exibirErro(idade, 'A idade deve ser um número positivo menor que 120.');
        isValid = false;
    } else {
        removeErro(idade);
        
    }

    return isValid;
}

function exibirErro(campo, mensagem) {
    const small = campo.nextElementSibling;
    small.innerText = mensagem;
    campo.classList.add('erro');
    campo.classList.remove('valido');
}

function removeErro(campo) {
    const small = campo.nextElementSibling;
    small.innerText = '';
    campo.classList.remove('erro');
    campo.classList.add('valido')
}

// Adicionando evento de foco para remover o erro e validar ao mudar de campo
const campos = [nome, sobrenome, email, idade];

campos.forEach(campo => {
    campo.addEventListener('blur', function() {
        if (validarFormulario()) {
            campo.classList.add('valido');
        }
    });
});

form.addEventListener('submit', function (e) {
    e.preventDefault();

    if (validarFormulario()) {
        // Armazena os dados no localStorage para exibir na página de confirmação
        localStorage.setItem('nome', nome.value);
        localStorage.setItem('sobrenome', sobrenome.value);
        localStorage.setItem('email', email.value);
        localStorage.setItem('idade', idade.value);

        form.submit();  // Envia o formulário se for válido
    }
});

function toggleCard() {
    const card = document.getElementById("infoCard");
    card.classList.toggle("show"); // Adiciona ou remove a classe 'show' para exibir ou ocultar o card
}


function tratarTexto(texto) {
    return texto
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, "") // Remove acentos
    .replace(/\s+/g, ' '); // Remove espaços extras
}



// Lista de estados válidos
const estadosValidos = ['sao paulo', 'rio de janeiro', 'minas gerais']; 

// Selecionando os elementos DOM
const entradaEstado = document.getElementById('entrada-estado');
const btn = document.getElementById('btn-teste');
const mensagem = document.getElementById('mensagem');

// Código que roda quando clica no botão
btn.addEventListener('click', function() {
    console.log('Botão clicado');
    console.log('Valor do input:', entradaEstado.value);

    mensagem.textContent = 'Você digitou: ' + entradaEstado.value;
    
    const textoDigitado = tratarTexto(entradaEstado.value);

    if (estadosValidos.includes(textoDigitado)) {
        mensagem.textContent = 'Estado Válido!';
    } else {
        mensagem.textContent = 'Estado Inválido!';
    }
});

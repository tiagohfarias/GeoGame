// 1. MAPEAMENTO DE ESTADOS
// Objeto de estados válidos --- chave: nome do estado, Valor: id do elemento SVG correspondente 
const mapaEstados = {
    'sao paulo': 'sp',
    'rio de janeiro': 'rj',
    // Adicione outros estados conforme necessário
}

//2.ELEMENTOS DOM
// Selecionando os elementos DOM
const entradaEstado = document.getElementById('entrada-estado');
const btn = document.getElementById('btn-teste');
const mensagem = document.getElementById('mensagem');

//3. FUNÇÃO AUXILIAR 
function tratarTexto(texto) {
    return texto
    .trim() //remove espaços no início e no final
    .toLowerCase() //converte para minúsculo
    .normalize('NFD') //normaliza o texto, removendo acentos  
    .replace(/[\u0300-\u036f]/g, "") // Remove acentos
    .replace(/\s+/g, ' '); // Remove espaços extras
}

//4. EVENTO DE CLIQUE
// Código que roda quando clica no botão
btn.addEventListener('click', function() {
    console.log('Botão clicado');
    console.log('Valor do input:', entradaEstado.value);
    const textoLimpo = tratarTexto(entradaEstado.value);

    //busca Id no mapeamento de estados
    const idEstado = mapaEstados[textoLimpo];

    // Verifica se o estado é válido
    if(idEstado) {
        const elementoSvg = document.getElementById(idEstado);
        elementoSvg.classList.add('descoberto');

        mensagem.textContent = 'Parabéns! Você acertou o estado!';
        entradaEstado.value = ''; // Limpa o campo de entrada
    } else {
        mensagem.textContent = 'Estado inválido. Tente novamente.';
    }
});

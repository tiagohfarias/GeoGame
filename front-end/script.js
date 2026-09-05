// 1. MAPEAMENTO DE ESTADOS
// Objeto de estados válidos --- chave: nome do estado, Valor: id do elemento SVG correspondente 
const mapaEstados = {
    "acre": "ac",
    "alagoas": "al",
    "amapa": "ap",
    "amazonas": "am",
    "bahia": "ba",
    "ceara": "ce",
    "distrito federal": "df",
    "espirito santo": "es",
    "goias": "go",
    "maranhao": "ma",
    "mato grosso": "mt",
    "mato grosso do sul": "ms",
    "minas gerais": "mg",
    "para": "pa",
    "paraiba": "pb",
    "parana": "pr",
    "pernambuco": "pe",
    "piaui": "pi",
    "rio de janeiro": "rj",
    "rio grande do norte": "rn",
    "rio grande do sul": "rs",
    "rondonia": "ro",
    "roraima": "rr",
    "santa catarina": "sc",
    "sao paulo": "sp",
    "sergipe": "se",
    "tocantins": "to"
};

const totalEstados = Object.keys(mapaEstados).length;


const estadosDescobertos = [];
let acertos = 0;

//2.ELEMENTOS DOM
// Selecionando os elementos DOM
const entradaEstado = document.getElementById('entrada-estado');
const btn = document.getElementById('button');
const mensagem = document.getElementById('mensagem');
const cronometro = document.getElementById('cronometro');
const btnIniciar = document.getElementById('btnIniciar');
const displayCronometro = document.getElementById('cronometro');

//variáveis de controle de tempo
let tempoSegundos = 0;
let intervaloTempo = null;

//3. FUNÇÃO AUXILIAR 
function tratarTexto(texto) {
    return texto
    .trim() //remove espaços no início e no final
    .toLowerCase() //converte para minúsculo
    .normalize('NFD') //normaliza o texto, removendo acentos  
    .replace(/[\u0300-\u036f]/g, "") // Remove acentos
    .replace(/\s+/g, ' '); // Remove espaços extras
}

// Função para converter segundos puros em min:seg -> 75 seg em 1:15
function formatarTempo(segundos) {
    const minutos = Math.floor(segundos / 60);
    const segundosRestantes = segundos % 60;

    //pagStart (2, '0') garante que sempre terá 2 dígitos, adicionando 0 à esquerda se necessário
    const minFormatado = String(minutos).padStart(2, '0');
    const segFormatado = String(segundosRestantes).padStart(2, '0');
    return `${minFormatado}:${segFormatado}`;
}

//Função para iniciar o cronômetro
function iniciarCronometro() {
    tempoSegundos = 0;
    displayCronometro.textContent = "00:00";
    clearInterval(intervaloTempo); // Limpa qualquer intervalo existente

    //Inicia o intervalo de tempo
    intervaloTempo = setInterval(function() {
        tempoSegundos++;
        console.log('Tempo em segundos:', tempoSegundos);
        displayCronometro.textContent = formatarTempo(tempoSegundos);
    }, 1000); // Atualiza a cada segundo(1000ms)
}



//4. EVENTO DE CLIQUE
// Código que roda quando clica no botão
// Libera o campo de texto e coloca o cursor nele, além de iniciar o cronômetro
btnIniciar.addEventListener('click',function() {
    entradaEstado.disabled = false;
    entradaEstado.focus();
    entradaEstado.value = '';

    //Reseta o placar e lista de acertos
    acertos = 0;
    estadosDescobertos.length = 0; // Limpa a lista de estados descobertos
    mensagem.textContent = 'Jogo iniciado! Boa sorte!';

    //Remove a cor verde de todos os estados
    const estadosPintados = document.querySelectorAll('.descoberto');
    estadosPintados.forEach(function(estado) {
        estado.classList.remove('descoberto');
    });

    //Inicia o cronômetro
    iniciarCronometro();
    btnIniciar.textContent = 'Reiniciar Jogo'; //Muda o texto do botão para reiniciar
});
    
btn.addEventListener('click', function() {
    console.log('Botão clicado');
    console.log('Valor do input:', entradaEstado.value);
    const textoLimpo = tratarTexto(entradaEstado.value);

    //busca Id no mapeamento de estados
    const idEstado = mapaEstados[textoLimpo];

    // Verifica se o estado é válido e se ja foi descoberto.
    if(idEstado && !estadosDescobertos.includes(idEstado)) {
        //pinta o estado no mapa
        const elementoSvg = document.getElementById(idEstado);
        elementoSvg.classList.add('descoberto');

        //adiciona o estado à lista de descobertos
        estadosDescobertos.push(idEstado);
        acertos++; 

        const totalEstados = Object.keys(mapaEstados).length;

        mensagem.textContent = `Parabéns! ${acertos} / ${totalEstados} estados descobertos.`;
        entradaEstado.value = ''; // Limpa o campo de entrada
    
    } else if (estadosDescobertos.includes(idEstado)) {
        mensagem.textContent = 'Você ja descobriu esse estado. Tente outro.';
        entradaEstado.value = '';
    
    } else {
        mensagem.textContent = 'Estado inválido. Tente novamente.';
    }
});
     
    //Escuta a tecla pressionada dentro do campo
    entradaEstado.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            btn.click(); //Simula o clique no botão com a tecla Enter
        }
});

// Checagem de fim de jogo
if (acertos === totalEstados) {
    // Para de contar o tempo
    clearInterval(intervaloTempo);
    
    //Bloqueia a entrada de texto
    entradaEstado.disabled = true;

    //Exibe mensagem de vitória com o tempo final
    mensagem.textContent = `Parabéns! Você descobriu todos os estados em ${formatarTempo(tempoSegundos)}!`;
} else {
    //Mensagem padrão durante o jogo
    mensagem.textContent = `${acertos} / ${totalEstados} estados descobertos.`;
}

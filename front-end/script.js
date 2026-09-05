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

    // Verifica se o estado é válido e se ja foi descoberto.
    if(idEstado && !estadosDescobertos.includes(idEstado)) {
        //pinta o estado no mapa
        const elementoSvg = document.getElementById(idEstado);
        elementoSvg.classList.add('descoberto');

        //adiciona o estado à lista de descobertos
        estadosDescobertos.push(idEstado);
        acertos++; 

        mensagem.textContent = `Parabéns! ${acertos} / ${Object.keys(mapaEstados).length} estados descobertos.`;
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

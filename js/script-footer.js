// Obter o elemento onde a data será exibida
const dataElement = document.getElementById('data');

// Obter a data atual
const dataAtual = new Date();

// Formatando a data
let dia = dataAtual.getDate();
let mes = dataAtual.getMonth() + 1; // Mês é indexado a partir de zero
let ano = dataAtual.getFullYear();

// Adicionando um zero à esquerda se for menor que 10
if (dia < 10) {
    dia = '0' + dia;
}
if (mes < 10) {
    mes = '0' + mes;
}

// Exibir a data formatada no elemento HTML
dataElement.textContent = dia + '/' + mes + '/' + ano;
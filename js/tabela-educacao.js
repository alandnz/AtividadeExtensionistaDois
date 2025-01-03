// Dados da tabela
const contratos = [
    ["760/2024", "20/12/2024", "19/12/2026", "Prestação de Serviço", "LE CARD ADMINISTRADORA DE CARTOES LTDA", "88.432.738,08"],
    ["408/2024", "25/06/2024", "11/03/2027", "Obra", "M.T.F.CONSTRUCOES E MONTAGENS LTDA", "30.143.388,89"],
    ["339/2024", "20/05/2024", "03/02/2027", "Prestação de serviços de engenharia", "CONSORCIO IN-VAR", "24.049.991,25"],
    ["340/2024", "20/05/2024", "03/02/2027", "Prestação de serviços de engenharia", "CONSORCIO IN-VAR", "16.800.000,00"],
    ["452/2024", "03/07/2024", "21/09/2026", "Obra", "ENGESAN ENGENHARIA E SANEAMENTO LTDA", "15.948.527,01"],
    ["674/2024", "27/11/2024", "14/08/2027", "Obra", "C A J CONSTRUCOES E SERVICOS EIRELI", "11.550.000,00"],
    ["072/2024", "29/01/2024", "27/01/2027", "Fornecimento de Material com Serviço", "NET SERVICE TECNOLOGIA LTDA", "8.716.740,75"],
    ["214/2024", "01/04/2024", "31/03/2025", "Fornecimento de Material", "JRS COMERCIO E ALIMENTACAO LTDA", "6.999.568,00"],
    ["778/2024", "20/12/2024", "19/12/2025", "Fornecimento de Material", "VISA INDUSTRIA ATACADISTA LTDA", "6.585.576,17"],
    ["1001/2024", "01/11/2024", "31/10/2034", "Locação", "UFES - UNIVERSIDADE FEDERAL DO ESPIRITO SANTO", "4.293.981,60"],
];

// Preencher a tabela
const tabelaCorpo = document.querySelector("#tabela-educacao tbody");

contratos.forEach(contrato => {
    const linha = document.createElement("tr");
    contrato.forEach(dado => {
        const celula = document.createElement("td");
        celula.textContent = dado;
        linha.appendChild(celula);
    });
    tabelaCorpo.appendChild(linha);
});
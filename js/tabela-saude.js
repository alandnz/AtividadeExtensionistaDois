// Dados da tabela
const contratos = [
    ["757/2024", "20/12/2024", "19/12/2026", "Prestação de Serviço", "LE CARD ADMINISTRADORA DE CARTOES LTDA", "40.596.870,96"],
    ["709/2023", "01/01/2024", "31/12/2025", "Prestação de Serviço", "CONSTRUTORA FERREIRA SANTOS LTDA", "10.008.674,40"],
    ["250/2024", "19/04/2024", "08/07/2026", "Obra", "CONSORCIO THERVAR", "6.845.000,00"],
    ["647/2024", "14/10/2024", "13/10/2026", "Prestação de Serviço", "CLINICA VETERINARIA RBV LTDA ME", "4.875.620,00"],
    ["417/2024", "25/06/2024", "24/06/2026", "Fornecimento de Material", "UL QUÍMICA E CIENTÍFICA LTDA", "4.851.630,00"],
    ["085/2024", "31/01/2024", "29/01/2026", "Prestação de Serviço", "GVBUS SINDICATO DAS EMPRESAS DE TRANSPORTE METROPOLITANO DA GRANDE VITORIA", "4.772.568,00"],
    ["035/2024", "17/01/2024", "14/07/2025", "Prestação de Serviço", "APAE - ASSOCIACAO DE PAIS E AMIGOS DOS EXCEPCIONAIS DE VITORIA", "3.590.997,00"],
    ["257/2024", "19/04/2024", "18/04/2027", "Fornecimento de Material com Serviço", "NET SERVICE TECNOLOGIA LTDA", "3.165.451,68"],
    ["580/2024", "28/08/2024", "27/08/2025", "Prestação de Serviço", "DIGITALMEDICINA SERVICOS MEDICOS LTDA", "3.137.460,00"],
    ["320/2024", "14/05/2024", "13/05/2025", "Prestação de Serviço", "CLINICA ORTHOS LTDA", "2.969.419,50"],
];

// Preencher a tabela
const tabelaCorpo = document.querySelector("#tabela-saude tbody");

contratos.forEach(contrato => {
    const linha = document.createElement("tr");
    contrato.forEach(dado => {
        const celula = document.createElement("td");
        celula.textContent = dado;
        linha.appendChild(celula);
    });
    tabelaCorpo.appendChild(linha);
});

// Dados dos gastos mensais (Exemplo)
const meses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
const gastosEducacao = [35797333.30, 39237394.34, 62816595.48, 70669978.77, 69634658.68, 66812900.92, 86368317.35, 62441364.83, 66185643.45, 80666277.61, 95917716.14, 70227806.54];
let detalhes = {}; // Usa-se let para permitir atualização


// Configuração do gráfico
const ctx = document.getElementById('gastosEducacao').getContext('2d');
const graficoGastos = new Chart(ctx, {
    type: 'bar', // Tipo de gráfico (barras)
    data: {
        labels: meses, // Meses como rótulos
        datasets: [{
            label: 'Gastos em R$',
            data: gastosEducacao, // Dados dos gastos
            backgroundColor: 'rgba(54, 162, 235, 0.6)', // Cor das barras
            borderColor: 'rgba(54, 162, 235, 1)', // Cor da borda
            borderWidth: 1 // Espessura da borda
        }]
    },
    options: {
        responsive: true, // Ajusta para telas menores
        plugins: {
            title: {
                display: true,
                text: 'Gastos Mensais da Prefeitura com Educação em 2024',
                font: {
                    size: 20
                }
            }
        },
        scales: {
            y: {
                beginAtZero: true, // Inicia o eixo Y no zero
                title: {
                    display: true,
                    text: 'Valor em R$'
                }
            },
            x: {
                title: {
                    display: true,
                    text: 'Meses'
                }
            }
        }
    }
});

// Carrega os dados JSON
fetch('data/detalhes-educacao.json')
    .then(response => response.json())
    .then(data => {
        detalhes = data;
    });

// Adiciona o listener para interatividade
document.getElementById('gastosEducacao').onclick = function (evt) {
    const points = graficoGastos.getElementsAtEventForMode(evt, 'nearest', { intersect: true }, true);

    if (points.length) {
        const firstPoint = points[0];
        const label = graficoGastos.data.labels[firstPoint.index]; // Rótulo (mês)
        const value = graficoGastos.data.datasets[firstPoint.datasetIndex].data[firstPoint.index]; // Valor (gasto)

        const detalhe = detalhes[label];
        if (!detalhe) {
            alert('Detalhes não disponíveis para este mês.');
            return;
        }

        // Converte os detalhes para uma lista com estrutura HTML
        const detalheHTML = detalhe.detalhes.map(item => `<li>${item}</li>`).join('');

        // Altera a cor da barra clicada
        graficoGastos.data.datasets[firstPoint.datasetIndex].backgroundColor = Array(gastosEducacao.length).fill('rgba(54, 162, 235, 0.6)');
        graficoGastos.data.datasets[firstPoint.datasetIndex].backgroundColor[firstPoint.index] = 'rgba(255, 99, 132, 0.6)';
        graficoGastos.update(); // Atualiza o gráfico

        // Exibe informações na página
        const infoDiv = document.getElementById('info-educacao');
        infoDiv.innerHTML = `
             <h3>Detalhes de ${label}</h3>
            <p>Valor total pago no mês: R$ ${value.toLocaleString()}</p>
            <p><strong>Detalhes:</strong></p>
            <ul>${detalheHTML}</ul>`; // Exibe os detalhes antes do resumo
    }
};

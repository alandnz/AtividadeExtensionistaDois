// Dados dos gastos mensais (Exemplo)
const meses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
const gastos = [12000, 15000, 13000, 14000, 16000, 14500, 13500, 15000, 17000, 15500, 16500, 18000];
let detalhes = {}; // Usa-se let para permitir atualização


// Configuração do gráfico
const ctx = document.getElementById('gastosSaude').getContext('2d');
const graficoGastos = new Chart(ctx, {
    type: 'bar', // Tipo de gráfico (barras)
    data: {
        labels: meses, // Meses como rótulos
        datasets: [{
            label: 'Gastos em R$',
            data: gastos, // Dados dos gastos
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
                text: 'Gastos com Saúde Pública em 2024',
                font: {
                    size: 18
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
fetch('detalhes-saude.json')
    .then(response => response.json())
    .then(data => {
        detalhes = data;
    });

// Adiciona o listener para interatividade
document.getElementById('gastosSaude').onclick = function (evt) {
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
        graficoGastos.data.datasets[firstPoint.datasetIndex].backgroundColor = Array(gastos.length).fill('rgba(54, 162, 235, 0.6)');
        graficoGastos.data.datasets[firstPoint.datasetIndex].backgroundColor[firstPoint.index] = 'rgba(255, 99, 132, 0.6)';
        graficoGastos.update(); // Atualiza o gráfico

        // Exibe informações na página
        const infoDiv = document.getElementById('info');
        infoDiv.innerHTML = `
            <h3>Detalhes de ${label}</h3>
            <p>Gasto: R$ ${value.toLocaleString()}</p>
            <p><strong>Resumo:</strong> ${detalhe.resumo}</p>
            <p><strong>Detalhes:</strong></p>
            <ul>${detalheHTML}</ul>`; // Exibe os detalhes como uma lista
    }
};

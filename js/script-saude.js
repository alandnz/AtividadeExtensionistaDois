// Dados dos gastos mensais
const meses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
const gastosSaude = [21264133.16, 33487975.33, 32217052.57, 38251124.44, 40196458.31, 49642912.24, 45232918.62, 44067009.36, 38827239.42, 46224012.52, 62645854.99, 33279907.08];
let detalhes = {}; // Usa-se let para permitir atualização


// Configuração do gráfico
const ctx = document.getElementById('gastosSaude').getContext('2d');
const graficoGastos = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: meses,
        datasets: [{
            label: 'Gastos em R$',
            data: gastosSaude,
            backgroundColor: 'rgba(54, 162, 235, 0.6)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1 // Espessura da borda
        }]
    },
    options: {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: 'Gastos com Saúde em 2024',
                font: {
                    size: 20
                }
            }
        },
        scales: {
            y: {
                beginAtZero: true,
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
fetch('data/detalhes-saude.json')
    .then(response => response.json())
    .then(data => {
        detalhes = data;
    });

// Adiciona o listener para interatividade
document.getElementById('gastosSaude').onclick = function (evt) {
    const points = graficoGastos.getElementsAtEventForMode(evt, 'nearest', { intersect: true }, true);

    if (points.length) {
        const firstPoint = points[0];
        const label = graficoGastos.data.labels[firstPoint.index];
        const value = graficoGastos.data.datasets[firstPoint.datasetIndex].data[firstPoint.index];

        const detalhe = detalhes[label];
        if (!detalhe) {
            alert('Detalhes não disponíveis para este mês.');
            return;
        }

        // Converte os detalhes para uma lista com estrutura HTML
        const detalheHTML = detalhe.detalhes.map(item => `<li>${item}</li>`).join('');

        // Altera a cor da barra clicada
        graficoGastos.data.datasets[firstPoint.datasetIndex].backgroundColor = Array(gastosSaude.length).fill('rgba(54, 162, 235, 0.6)');
        graficoGastos.data.datasets[firstPoint.datasetIndex].backgroundColor[firstPoint.index] = 'rgba(255, 99, 132, 0.6)';
        graficoGastos.update(); // Atualiza o gráfico

        // Exibe informações na página
        const infoDiv = document.getElementById('info-saude');
        infoDiv.innerHTML = `
             <h3>Detalhes de ${label}</h3>
            <p>Valor total pago no mês: R$ ${value.toLocaleString()}</p>
            <p><strong>Detalhes:</strong></p>
            <ul>${detalheHTML}</ul>`;
    }
};

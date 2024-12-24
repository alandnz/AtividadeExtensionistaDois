// Dados das receitas mensais
const mesesReceitas = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
const receitas = [15000, 18000, 22000, 20000, 25000, 30000, 35000, 40000, 45000, 42000, 38000, 50000]; // Exemplo de dados

// Configuração do gráfico de receitas
const ctxReceitas = document.getElementById('receitas').getContext('2d');
const graficoReceitas = new Chart(ctxReceitas, {
    type: 'bar',
    data: {
        labels: mesesReceitas,
        datasets: [{
            label: 'Receita em R$',
            data: receitas,
            backgroundColor: 'rgba(54, 162, 235, 0.6)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
        }]
    },
    options: {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: 'Receita Total em 2024',
                font: {
                    size: 18
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

// Interatividade do gráfico de receitas
document.getElementById('receitas').onclick = function (evt) {
    const points = graficoReceitas.getElementsAtEventForMode(evt, 'nearest', { intersect: true }, true);
    if (points.length) {
        const firstPoint = points[0];
        const label = graficoReceitas.data.labels[firstPoint.index];
        const value = graficoReceitas.data.datasets[firstPoint.datasetIndex].data[firstPoint.index];

        const infoDiv = document.getElementById('info-receitas');
        infoDiv.innerHTML = `
            <h3>Detalhes de ${label}</h3>
            <p>Receita total no mês: R$ ${value.toLocaleString()}</p>`;
    }
};

// Dados das receitas mensais
const mesesReceitas = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
const receitas = [234184988.05, 222594378.01, 314079148.33, 268134131.92, 236119159.00, 244015435.27, 258356987.46, 243892875.88, 267961274.37, 242939179.52, 244656061.83, 258168222.82]; // Exemplo de dados

// Configuração do gráfico de receitas
const ctxReceitas = document.getElementById('receita').getContext('2d');
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
document.getElementById('receita').onclick = function (evt) {
    const points = graficoReceitas.getElementsAtEventForMode(evt, 'nearest', { intersect: true }, true);

    if (points.length) {
        const firstPoint = points[0];
        const label = graficoReceitas.data.labels[firstPoint.index];
        const value = graficoReceitas.data.datasets[firstPoint.datasetIndex].data[firstPoint.index];


        // Altera a cor da barra clicada
        graficoReceitas.data.datasets[firstPoint.datasetIndex].backgroundColor = Array(receitas.length).fill('rgba(54, 162, 235, 0.6)');
        graficoReceitas.data.datasets[firstPoint.datasetIndex].backgroundColor[firstPoint.index] = 'rgba(255, 99, 132, 0.6)';
        graficoReceitas.update(); // Atualiza o gráfico

        const infoDiv = document.getElementById('info-receita');
        infoDiv.innerHTML = `
            <h3>Detalhes de ${label}</h3>
            <p>Receita total no mês: R$ ${value.toLocaleString()}</p>`;
    }
};

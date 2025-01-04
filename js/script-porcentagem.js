function criarGraficoPorcentagem(idCanvas, idInfo, tituloGrafico, labelDataset, dados, receitas, meses) {
    const porcentagens = dados.map((gasto, index) => ((gasto / receitas[index]) * 100).toFixed(2));

    const ctx = document.getElementById(idCanvas).getContext('2d');
    const grafico = new Chart(ctx, {
        type: 'line', // Tipo de gráfico linha
        data: {
            labels: meses,
            datasets: [{
                label: labelDataset,
                data: porcentagens, // Dados das porcentagens
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 2,
                tension: 0.4 // Curvatura da linha
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: tituloGrafico,
                    font: {
                        size: 20
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true, // Começa do zero
                    title: {
                        display: true,
                        text: 'Porcentagem (%)'
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

    document.getElementById(idCanvas).onclick = function (evt) {
        const points = grafico.getElementsAtEventForMode(evt, 'nearest', { intersect: true }, true);

        if (points.length) {
            const firstPoint = points[0];
            const label = grafico.data.labels[firstPoint.index];
            const value = grafico.data.datasets[firstPoint.datasetIndex].data[firstPoint.index];

            // Exibe informações na página
            const infoDiv = document.getElementById(idInfo);
            infoDiv.innerHTML = `
                <h3>Detalhes de ${label}</h3>
                <p>${labelDataset}: ${value}%</p>`;
        }
    };
}

// Chamadas para saúde e educação
// Verifica se o canvas para saúde existe antes de criar o gráfico
if (document.getElementById('porcentagensSaude')) {
    criarGraficoPorcentagem(
        'porcentagensSaude',
        'info-porcentagensSaude',
        'Porcentagem de Gastos com Saúde em Relação à Receita Total (2024)',
        'Gastos com Saúde (% da Receita)',
        gastosSaude, // Dados de saúde
        receitas,
        mesesReceitas
    );
}

// Verifica se o canvas para educação existe antes de criar o gráfico
if (document.getElementById('porcentagensEducacao')) {
    criarGraficoPorcentagem(
        'porcentagensEducacao',
        'info-porcentagensEducacao',
        'Porcentagem de Gastos com Educação em Relação à Receita Total (2024)',
        'Gastos com Educação (% da Receita)',
        gastosEducacao, // Dados de educação
        receitas,
        mesesReceitas
    );
}




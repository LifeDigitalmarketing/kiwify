const ctx = document.getElementById('salesChart').getContext('2d');

new Chart(ctx, {
  type: 'line',
  data: {
    labels: ['Ago 15, 0:00', 'Ago 15, 3:00', 'Ago 15, 6:00', 'Ago 15, 9:00', 'Ago 15, 12:00', 'Ago 15, 23:59'],
    datasets: [{
      label: 'Vendas',
      data: [0, 13.49, 0, 0, 0, 0],
      borderColor: '#006d3b',
      backgroundColor: 'rgba(0, 109, 59, 0.1)',
      tension: 0.4,
      pointRadius: 6,
      pointHoverRadius: 8,
      pointBackgroundColor: '#006d3b',
      pointBorderColor: '#ffffff',
      pointBorderWidth: 2,
      fill: false
    }]
  },
  options: {
    responsive: true,
    plugins: {
      tooltip: {
        backgroundColor: '#ffffff',
        borderColor: '#eee',
        borderWidth: 1,
        titleColor: '#000',
        bodyColor: '#333',
        titleFont: { size: 13, weight: 'bold' },
        bodyFont: { size: 13 },
        padding: 10,
        displayColors: false,
        callbacks: {
          title: (tooltipItems) => tooltipItems[0].label,
          label: (tooltipItem) => `R$ ${tooltipItem.formattedValue}`,
          afterLabel: () => 'Vendas: 1',
        }
      },
      legend: {
        display: false
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function(value) {
            return 'R$ ' + value;
          }
        }
      }
    },
    animation: {
      duration: 800,
    },
    hover: {
      mode: 'nearest',
      intersect: true
    },
    elements: {
      point: {
        hoverBorderColor: '#006d3b',
        hoverBackgroundColor: '#2ee59d'
      }
    },
    onHover: (e) => {
      const points = chart.getElementsAtEventForMode(e, 'nearest', { intersect: true }, true);
      e.native.target.style.cursor = points.length ? 'pointer' : 'default';
    }
  },
  plugins: [{
    id: 'customTrianglePlugin',
    afterDatasetsDraw(chart, args, options) {
      const { ctx } = chart;
      const dataset = chart.data.datasets[0];
      const meta = chart.getDatasetMeta(0);

      meta.data.forEach((point, index) => {
        if (dataset.data[index] !== 0) {
          const x = point.x;
          const y = point.y;

          // Triângulo invertido
          ctx.save();
          ctx.beginPath();
          ctx.moveTo(x, y + 10);
          ctx.lineTo(x - 6, y + 20);
          ctx.lineTo(x + 6, y + 20);
          ctx.closePath();
          ctx.fillStyle = '#006d3b';
          ctx.fill();

          // Linha pontilhada vertical animada
          ctx.setLineDash([5, 5]);
          ctx.lineDashOffset = -performance.now() / 50; // animação contínua
          ctx.beginPath();
          ctx.moveTo(x, y + 20);
          ctx.lineTo(x, chart.chartArea.bottom);
          ctx.strokeStyle = '#ccc';
          ctx.lineWidth = 1;
          ctx.stroke();
          ctx.restore();
        }
      });
    }
  }]
});

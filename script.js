const ctx = document.getElementById('salesChart').getContext('2d');

const chart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: ['Ago 15, 0:00', 'Ago 15, 3:00', 'Ago 15, 6:00', 'Ago 15, 9:00', 'Ago 15, 12:00', 'Ago 15, 23:59'],
    datasets: [{
      label: 'Vendas',
      data: [0, 13.49, 0, 0, 0, 0],
      borderColor: '#4a4fff',
      backgroundColor: 'rgba(74, 79, 255, 0.1)',
      tension: 0.3,
      pointRadius: 6,
      pointHoverRadius: 8,
      pointBackgroundColor: '#4a4fff',
      pointBorderColor: '#ffffff',
      pointBorderWidth: 3,
      fill: false
    }]
  },
  options: {
    responsive: true,
    plugins: {
      tooltip: {
        backgroundColor: '#ffffff',
        borderColor: '#e5e7eb',
        borderWidth: 1,
        titleColor: '#000000',
        bodyColor: '#4b5563',
        titleFont: { size: 13, weight: 'bold' },
        bodyFont: { size: 13 },
        padding: 12,
        cornerRadius: 6,
        displayColors: false,
        callbacks: {
          title: (items) => items[0].label,
          label: (item) => `R$ ${item.formattedValue}`,
          afterLabel: () => 'Vendas: 1'
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
          callback: (value) => `R$ ${value}`
        },
        grid: {
          color: '#f0f0f0'
        }
      },
      x: {
        grid: {
          display: false
        }
      }
    },
    animation: {
      duration: 600
    },
    hover: {
      mode: 'nearest',
      intersect: true
    }
  },
  plugins: [{
    id: 'customVisualPlugin',
    afterDatasetsDraw(chart, args, pluginOptions) {
      const { ctx } = chart;
      const meta = chart.getDatasetMeta(0);
      const dataset = chart.data.datasets[0];

      meta.data.forEach((point, index) => {
        const valor = dataset.data[index];
        if (valor > 0) {
          const x = point.x;
          const y = point.y;
          const now = performance.now();

          // Linha pontilhada animada
          ctx.save();
          ctx.beginPath();
          ctx.setLineDash([4, 6]);
          ctx.lineDashOffset = -now / 30;
          ctx.moveTo(x, y + 6);
          ctx.lineTo(x, chart.chartArea.bottom);
          ctx.strokeStyle = '#d1d5db';
          ctx.lineWidth = 1;
          ctx.stroke();
          ctx.restore();

          // Triângulo invertido
          ctx.save();
          ctx.beginPath();
          ctx.moveTo(x, y + 8);
          ctx.lineTo(x - 5, y + 18);
          ctx.lineTo(x + 5, y + 18);
          ctx.closePath();
          ctx.fillStyle = '#4a4fff';
          ctx.fill();
          ctx.restore();

          // Efeito "pulse" ponto azul (extra opcional)
          const pulseRadius = 3 + Math.abs(Math.sin(now / 200)) * 2;
          ctx.beginPath();
          ctx.arc(x, y, pulseRadius, 0, Math.PI * 2);
          ctx.strokeStyle = 'rgba(74, 79, 255, 0.3)';
          ctx.lineWidth = 3;
          ctx.stroke();
        }
      });
    }
  }]
});

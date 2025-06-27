const ctx = document.getElementById('salesChart').getContext('2d');

const chart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: ['00:00', '03:00', '06:00', '09:00', '12:00', '15:00', '18:00', '21:00', '23:59'],
    datasets: [{
      label: 'Vendas',
      data: [0, 13.49, 0, 0, 0, 0, 0, 0, 0],
      backgroundColor: 'rgba(0, 108, 57, 0.1)',
      borderColor: '#006c39',
      borderWidth: 2,
      fill: true,
      tension: 0.4,
      pointRadius: 4,
      pointBackgroundColor: '#006c39'
    }]
  },
  options: {
    responsive: true,
    plugins: {
      legend: { display: false }
    },
    scales: {
      y: { beginAtZero: true }
    }
  }
});

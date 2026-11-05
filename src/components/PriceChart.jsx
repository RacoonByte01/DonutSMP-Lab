import Chart from "chart.js/auto";
import { useEffect, useRef } from "react";

const COLORS = { sell: "#0d6efd", buy: "#198754" };

function label(t, interval) {
  const date = new Date(t);
  return interval === "hour"
    ? date.toLocaleString(undefined, {
        day: "2-digit",
        month: "short",
        hour: "2-digit",
      })
    : date.toLocaleDateString(undefined, {
        day: "2-digit",
        month: "short",
        year: "2-digit",
      });
}

function line(labelText, key, interval, points) {
  return {
    label: labelText,
    data: points.map((point) => point[key]),
    borderColor: COLORS[key],
    backgroundColor: COLORS[key],
    spanGaps: false,
    tension: 0.2,
  };
}

function PriceChart({ points, interval }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const chart = new Chart(canvasRef.current, {
      type: "line",
      data: {
        labels: points.map((point) => label(point.t, interval)),
        datasets: [
          line("Sell", "sell", interval, points),
          line("Buy", "buy", interval, points),
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: { mode: "index", intersect: false },
        scales: { y: { beginAtZero: false } },
        plugins: { legend: { position: "bottom" } },
      },
    });
    return () => chart.destroy();
  }, [points, interval]);

  return <canvas ref={canvasRef} />;
}

export default PriceChart;

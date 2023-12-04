import LinePlot from '../charts/LinePlot'
import PieChart from '../charts/PieChart'
import TimeSeriesPlot from '../charts/TimeSeriesPlot'



export default function Page() {
  const style = { width: "50%" };

  return (
  <>
    <h1>Sentry Dashboard</h1>
    <div style={style}>
      <TimeSeriesPlot />
    </div>
    <div style={style}>
      <LinePlot />
    </div>
    <div style={style}>
      <PieChart />
    </div>
  </>
  );
}
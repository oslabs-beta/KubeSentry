import LinePlot from '../../components/LinePlot'
import PieChart from '../../components/PieChart'
import TimeSeriesPlot from '../../components/TimeSeriesPlot'



export default function Page() {
  return (
  <>
    <h1>Sentry Dashboard</h1>
    <TimeSeriesPlot />
    <PieChart />
    <LinePlot />
  </>
  );
}
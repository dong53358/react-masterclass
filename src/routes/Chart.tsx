import { useOutletContext } from "react-router";

interface ChartProps {
  coinId: string;
}

function Chart() {
  const data = useOutletContext<ChartProps>();
  return <h1>Chart</h1>;
}

export default Chart;

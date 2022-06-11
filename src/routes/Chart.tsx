//import { useOutletContext } from "react-router";
import { useQuery } from "react-query";
import { fetchCoinHistory } from "./api";
import { useParams } from "react-router-dom";
import ApexChart from "react-apexcharts";
import { useRecoilValue } from "recoil";
import { isDarkArom } from "../atoms";

interface IHistorical {
  time_open: string;
  time_close: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}

function Chart() {
  const isDark = useRecoilValue(isDarkArom);
  //  const { coinId } = useOutletContext<ChartProps>();
  const { coinId } = useParams();
  const { isLoading, data } = useQuery<IHistorical[]>(["ohlcv", coinId], () =>
    fetchCoinHistory(coinId as string)
  );
  return (
    <div>
      {isLoading ? (
        "Loading chart..."
      ) : (
        <ApexChart
          type="candlestick"
          series={[
            {
              data:
                data?.map((price) => {
                  return {
                    x: price.time_open,
                    y: [
                      price.open.toFixed(2),
                      price.high.toFixed(2),
                      price.low.toFixed(2),
                      price.close.toFixed(2),
                    ],
                  };
                }) ?? [],
            },
          ]}
          options={{
            theme: { mode: isDark ? "dark" : "light" },
            chart: {
              background: "transparent",
              height: 300,
              width: 500,
              toolbar: { show: false },
            },
            stroke: { curve: "smooth", width: 3 },
            grid: { show: false },
            xaxis: {
              labels: { show: true },
              categories: data?.map((price) => price.time_close) ?? [],
              axisTicks: {
                show: false,
              },
              axisBorder: {
                show: false,
              },
              type: "datetime",
            },
            yaxis: { show: true },
            fill: {
              type: "gradient",
              gradient: { gradientToColors: ["#1dd1a1"], stops: [0, 100] },
            },
            colors: ["#48dbfb"],
            tooltip: { y: { formatter: (value) => `$ ${value.toFixed(3)}` } },
          }}
        />
      )}
    </div>
  );
}

export default Chart;

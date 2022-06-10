import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { fetchCoinToday } from "./api";

const TodayPrice = styled.div`
  display: flex;
  flex-direction: column;
  height: 500px;
  //background-color: ${(props) => -props.theme.bgColor};
`;
const TodayPriceItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 445px;
  padding: 20px 80px;
  background-color: ${(props) => props.theme.bgColor};
  border-radius: 50px;
  margin-bottom: 20px;
  span:first-child {
    color: ${(props) => props.theme.textColor};
    font-size: 20px;
    font-weight: 600;
  }
  span:last-child {
    color: ${(props) => props.theme.textColor};
    font-size: 20px;
  }
`;

interface IToday {
  time_open: string;
  time_close: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}

function Price() {
  const { coinId } = useParams();
  const { isLoading, data } = useQuery<IToday[]>(["today", coinId], () =>
    fetchCoinToday(coinId as string)
  );
  const todayData: any = data ? data[0] : {};
  return (
    <div>
      {isLoading ? (
        "Loading..."
      ) : (
        <TodayPrice>
          <TodayPriceItem>
            <span>open :</span>
            <span>{todayData.open.toFixed(3)}</span>
          </TodayPriceItem>
          <TodayPriceItem>
            <span>high :</span>
            <span>{todayData.high.toFixed(3)}</span>
          </TodayPriceItem>
          <TodayPriceItem>
            <span>low :</span>
            <span>{todayData.low.toFixed(3)}</span>
          </TodayPriceItem>
          <TodayPriceItem>
            <span>close :</span>
            <span>{todayData.close.toFixed(3)}</span>
          </TodayPriceItem>
        </TodayPrice>
      )}
    </div>
  );
}

export default Price;

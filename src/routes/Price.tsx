import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { fetchCoinToday } from "./api";

const TodayPrice = styled.div`
  display: flex;
  flex-direction: column;
  height: 500px;
  width: 500px;
  //background-color: ${(props) => -props.theme.bgColor};
`;
const TodayPriceItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 500px;
  width: 500px;
  background-color: ${(props) => props.theme.bgColor};
  border-radius: 50px;
  margin-bottom: 20px;
`;

interface IToday {
  time_open: string;
  time_close: string;
  open: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}

function Price() {
  const { coinId } = useParams();
  const { isLoading, data: todayData } = useQuery<IToday>(
    ["today", coinId],
    () => fetchCoinToday(coinId as string)
  );
  return (
    <div>
      {isLoading ? (
        "Loading..."
      ) : (
        <TodayPrice>
          <TodayPriceItem>
            <span>open :</span>
            <span>{todayData?.open}</span>
          </TodayPriceItem>
          <TodayPriceItem>
            <span>high :</span>
            <span></span>
          </TodayPriceItem>
          <TodayPriceItem>
            <span>low :</span>
            <span></span>
          </TodayPriceItem>
          <TodayPriceItem>
            <span>close :</span>
            <span></span>
          </TodayPriceItem>
          <TodayPriceItem>
            <span>volume :</span>
            <span></span>
          </TodayPriceItem>
          <TodayPriceItem>
            <span>market_cap :</span>
            <span></span>
          </TodayPriceItem>
        </TodayPrice>
      )}
    </div>
  );
}

export default Price;

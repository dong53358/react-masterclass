import { useParams } from "react-router-dom";

interface RouteParams {
  coinId: string;
}

function Coin() {
  const { coinId } = useParams<keyof RouteParams>() as RouteParams;
  return <h1>Coin: {coinId}</h1>;
}

export default Coin;
//useParams<keyof RouteParamsd>() as RouteParams;
//useParams() as unknown as RouteParams;

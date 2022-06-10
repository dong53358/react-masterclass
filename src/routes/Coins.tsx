import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { fetchCoins } from "./api";
import { FaMoon } from "react-icons/fa";

const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;

const Header = styled.div`
  height: 10vh;
  display: flex;
  align-items: center;
`;

const CoinsList = styled.div``;

const Coin = styled.li`
  background-color: ${(props) => props.theme.bgColor};
  color: ${(props) => props.theme.textColor};
  border-radius: 15px;
  margin-bottom: 10px;
  a {
    display: flex;
    align-items: center;
    transition: color 0.2s ease-in;
    padding: 20px;
    font-size: 20px;
    font-weight: 600;
  }
  &:hover {
    a {
      color: ${(props) => props.theme.accentColor};
    }
  }
`;

const Title = styled.h1`
  color: ${(props) => props.theme.accentColor};
  font-size: 40px;
  font-weight: 600;
  margin-left: 160px;
  margin-right: 110px;
`;

const Loader = styled.div`
  display: block;
  text-align: center;
  font-size: 30px;
`;

const Img = styled.img`
  width: 50px;
  height: 50px;
  margin-right: 20px;
`;

const DarkMod = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  color: white;
  background-color: ${(props) => props.theme.btnColor};
  padding: 10px;
  border-radius: 50%;
`;

interface ICoin {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

interface ICoinsProps {
  toggleDarkMode: () => void;
}

function Coins({ toggleDarkMode }: ICoinsProps) {
  const { isLoading, data } = useQuery<ICoin[]>("allCoins", fetchCoins);
  /*const [coins, setCoins] = useState<CoinInterface[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const reponce = await fetch("https://api.coinpaprika.com/v1/coins");
      const json = await reponce.json();
      setCoins(json.slice(0, 100));
      setLoading(false);
    })();
  }, []);
  */
  return (
    <Container>
      <Helmet>
        <title>코인</title>
      </Helmet>
      <Header>
        <Title>코인</Title>
        <DarkMod onClick={toggleDarkMode}>
          <FaMoon />
        </DarkMod>
      </Header>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <CoinsList>
          {data?.slice(0, 100).map((coin) => (
            <Coin key={coin.id}>
              <Link to={`/${coin.id}`} state={{ name: coin.name }}>
                <Img
                  src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}
                />
                {coin.name} &rarr;
              </Link>
            </Coin>
          ))}
        </CoinsList>
      )}
    </Container>
  );
}

export default Coins;

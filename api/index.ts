export interface ITick {
  active: boolean;
  currency_name: string;
  name: string;
  ticker: string;
  type: string;
  cik: string;
}

export interface IFetchStocksResults {
  count: number;
  results: ITick[];
  status: string;
}

export const fetchStocks = async ({
  name,
}: {
  name: string;
}): Promise<IFetchStocksResults> => {
  const response = await fetch(
    `https://api.polygon.io/v3/reference/tickers?market=stocks&search=${name}&active=true&limit=10&order=desc&apiKey=_Yq7mtOj7h3HWEpwLg6MPzS3dHWt2Hm6`
  );

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  return response.json();
};

interface StockChardSingleDataI {
  c: number;
  h: number;
  l: number;
  n: number;
  o: number;
  t: number;
  v: number;
  vw: number;
}

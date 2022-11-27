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
    `${process.env.NEXT_PUBLIC_POLYGON_API}/v3/reference/tickers?market=stocks&search=${name}&active=true&limit=10&order=desc&apiKey=${process.env.NEXT_PUBLIC_POLYGON_API_KEY}`
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

interface ChardResponseI {
  count: number;
  results: StockChardSingleDataI[];
}

const getDateFormat = (date: Date): string => {
  return date && date.toISOString().split('T')[0];
};

export const fetchChartData = async ({
  name,
  selecteDates,
}: {
  name: string;
  selecteDates: [Date, Date];
}): Promise<ChardResponseI> => {
  if (selecteDates.length !== 2) {
    throw new Error('No dates specified.');
  }

  const response = await fetch(
    `${
      process.env.NEXT_PUBLIC_POLYGON_API
    }/v2/aggs/ticker/${name}/range/1/day/${getDateFormat(
      selecteDates[0]
    )}/${getDateFormat(
      selecteDates[1]
    )}?adjusted=true&sort=asc&limit=120&apiKey=${
      process.env.NEXT_PUBLIC_POLYGON_API_KEY
    }`
  );

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  return response.json();
};

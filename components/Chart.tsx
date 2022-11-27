import { useQuery } from 'react-query';
import { fetchChartData, ITick } from '../api';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Bar,
  BarChart,
  ErrorBar,
} from 'recharts';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { clss } from '../helpers';
import { useMemo } from 'react';

export type ChartModeType = 'AVERAGE' | 'CANDLE';
type DatesType = [Date, Date];

interface IQueryProps {
  ticker: ITick | null;
  selecteDates: DatesType | null;
}

interface Props {
  mode: ChartModeType;
  queryProps: IQueryProps;
}

export default function ChartContainer({
  queryProps: { selecteDates, ticker },
  mode = 'AVERAGE',
}: Props) {
  const { isLoading, isError, data, error, isFetching, remove } = useQuery(
    ['chart', { name: ticker?.ticker, selecteDates }],
    () =>
      fetchChartData({
        name: ticker?.ticker as unknown as string,
        selecteDates: selecteDates as DatesType,
      }),
    {
      enabled: !!ticker && selecteDates?.length === 2,
      keepPreviousData: true,
    }
  );

  const [averageData, candleData] = useMemo(() => {
    return [
      data?.results?.map((v) => ({
        name: new Date(v.t).toLocaleString('en-US', {
          timeZoneName: 'short',
        }),
        Price: v.l + (v.h - v.l) / 2,
      })),
      data?.results?.map((v) => ({
        name: new Date(v.t).toLocaleString('en-US', {
          timeZoneName: 'short',
        }),
        max: v.h,
        min: v.l,
      })),
    ];
  }, [data]);

  return (
    <div className="w-full h-96 relative">
      <div
        className={clss(
          'absolute top-0 left-0 bottom-0 right-0 flex justify-center items-center bg-gray-100',
          { hidden: !(isLoading || isFetching) }
        )}
      >
        <AiOutlineLoading3Quarters className="w-10 h-10 text-gray-400 animate-spin" />
      </div>

      <ResponsiveContainer width="100%" height="100%">
        {mode == 'AVERAGE' ? (
          <LineChart
            width={500}
            height={300}
            data={averageData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="Price"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
          </LineChart>
        ) : (
          <BarChart
            width={600}
            height={300}
            data={candleData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <XAxis xAxisId={0} dataKey="name" hide />
            <XAxis xAxisId={1} dataKey="name" />
            <YAxis />
            <Tooltip cursor={{ fill: 'transparent' }} />
            <Bar barSize={30} xAxisId={0} dataKey="max" fill="#035aa6" />
            <Bar barSize={35} xAxisId={1} dataKey="min" fill="white">
              <ErrorBar
                dataKey="error"
                width={4}
                strokeWidth={2}
                stroke="#66c208"
              />
              <ErrorBar
                dataKey="errorNegative"
                width={4}
                strokeWidth={2}
                stroke="#ff0044"
              />
            </Bar>
          </BarChart>
        )}
      </ResponsiveContainer>
    </div>
  );
}

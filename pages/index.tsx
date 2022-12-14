import Head from 'next/head';
import { useState } from 'react';
import { ITick } from '../api';
import ChartContainer, { ChartModeType } from '../components/Chart';
import { DateSelect } from '../components/DateSelect';
import TickerAutocomplete from '../components/TickerAutocomplete';
import Button from '../components/ui/button';

export default function Home() {
  const [chartMode, setChartMode] = useState<ChartModeType>('AVERAGE');
  const [selectedTicker, setSelectedTicker] = useState<ITick | null>(null);
  const [selecteDates, setselecteDates] = useState<[Date, Date] | null>(null);

  return (
    <div className="container m-auto flex mt-40 justify-center min-h-[100vh]">
      <Head>
        <title>int-shoreline</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="w-[60rem] h-min shadow-lg rounded-md border border-gray-200 p-9 bg-white">
        <div className="my-6 text-sm text text-gray-500">
          {selectedTicker
            ? `${selectedTicker.ticker} ${selectedTicker.name}`
            : 'No Stock Seleted'}
        </div>

        <div className="w-full mb-6 flex gap-2">
          <Button
            onClick={() => setChartMode('AVERAGE')}
            active={chartMode === 'AVERAGE'}
          >
            <>AVERAGE</>
          </Button>

          <Button
            onClick={() => setChartMode('CANDLE')}
            active={chartMode === 'CANDLE'}
          >
            <>CANDLE</>
          </Button>
        </div>

        <ChartContainer
          mode={chartMode}
          queryProps={{
            selecteDates,
            ticker: selectedTicker,
          }}
        />

        <div className="flex justify-between items-center w-full">
          <TickerAutocomplete setSelectedTicker={(v) => setSelectedTicker(v)} />
          <DateSelect setDateOptions={setselecteDates} />
        </div>
      </div>
    </div>
  );
}

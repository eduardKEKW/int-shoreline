import { useState } from 'react';
import { useQuery } from 'react-query';
import { fetchStocks, ITick } from '../api';
import Input from '../components/ui/input';
import useDebounce from '../hooks/useDebounce';
import { clss } from '../helpers';
import { useEffect } from 'react';
import Autocomplete from '../components/helpers/Autocomplete';

const higthlithText = ({
  text,
  term,
  ignore,
}: {
  text: string;
  term: string;
  ignore?: boolean;
}): string => {
  return ignore
    ? text
    : text.replace(
        new RegExp(term, 'i'),
        `<span class=" group-hover:text-white text-slate-800 font-medium">$&</span>`
      );
};

const TickerAutocomplete = ({
  setSelectedTicker,
}: {
  setSelectedTicker: (v: ITick) => void;
}) => {
  const [stockValue, setStockValue]                             = useState<string>('');
  const [isAutocompleteVisible, setIsAutocompleteVisible]       = useState<boolean>(false);
  const stockValueDebounced                                     = useDebounce({ delay: 350, value: stockValue });
  const { isLoading, isError, data, error, isFetching, remove } = useQuery(
    ['stocks', { name: stockValueDebounced }],
    () => fetchStocks({ name: stockValueDebounced }),
    {
      enabled: stockValueDebounced.length > 1,
      keepPreviousData: true,
    }
  );

  useEffect(() => {
    setIsAutocompleteVisible(!!data?.results.length && !!stockValue);
  }, [stockValue, data]);

  return (
    <div className="m-2 mt-4">
      <div className={clss('flex w-80 bg-white border border-gray-100')}>
        <Input
          placeholder="Search for stock value"
          value={stockValue}
          onChange={(e) => setStockValue(e.target.value)}
          className="h-14 p-2 outline-none grow placeholder:text-gray-400 placeholder:text-sm text-gray-500"
          loading={isLoading || isFetching}
          onClear={() => {
            remove();
            setStockValue('');
          }}
          onFocus={() => data?.results.length && setIsAutocompleteVisible(true)}
        />
      </div>

      <Autocomplete
        isVisible={isAutocompleteVisible}
        onClose={() => {
          setIsAutocompleteVisible(false);
        }}
      >
        <>
          {data?.results?.map((v) => {
            return (
              <Autocomplete.Item key={v.name}>
                {({ selectedItemId, setAutocompleteSelectedItem }) => {
                  return (
                    <div
                      className={clss(
                        'flex cursor-pointer hover:bg-cyan-700 hover:text-white p-2 text-sm group w-80',
                        {
                          'bg-cyan-700 text-white': selectedItemId == v.ticker,
                        }
                      )}
                      onClick={() => {
                        setAutocompleteSelectedItem(v.ticker);
                        setSelectedTicker(v);
                      }}
                    >
                      <div className="w-full flex flex-col gap-1">
                        <span
                          dangerouslySetInnerHTML={{
                            __html: higthlithText({
                              text: v.ticker,
                              term: stockValueDebounced,
                              ignore: selectedItemId == v.ticker,
                            }),
                          }}
                        />
                        <span className="text-xs">{v.name}</span>
                      </div>
                    </div>
                  );
                }}
              </Autocomplete.Item>
            );
          })}
        </>
      </Autocomplete>
    </div>
  );
};

export default TickerAutocomplete;

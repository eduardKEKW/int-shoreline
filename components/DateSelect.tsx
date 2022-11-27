import { useState, useEffect } from 'react';
import Input from '../components/ui/input';

export const DateSelect = ({
  setDateOptions,
}: {
  setDateOptions: (v: [Date, Date]) => void;
}) => {
  const [selectedDateFrom, setSelectedDateFrom] = useState<Date>(() => {
    const date = new Date();
    date.setFullYear(date.getFullYear() - 1);
    return date;
  });
  const [selectedDateTo, setSelectedDateTo] = useState<Date>(new Date());

  useEffect(() => {
    if (selectedDateFrom && selectedDateTo) {
      setDateOptions([selectedDateFrom, selectedDateTo]);
    }
  }, [selectedDateFrom, selectedDateTo]);

  return (
    <div className="flex items-center gap-2">
      <Input
        value={selectedDateFrom.toISOString().substring(0, 10)}
        onChange={(e) =>
          e.target.valueAsDate &&
          setSelectedDateFrom(new Date(e.target.valueAsDate))
        }
        type="date"
        className="text-gray-500 text-xs h-14 w-40 p-5"
      />

      <Input
        value={selectedDateTo.toISOString().substring(0, 10)}
        onChange={(e) =>
          e.target.valueAsDate &&
          setSelectedDateTo(new Date(e.target.valueAsDate))
        }
        type="date"
        className="text-gray-500 text-xs h-14 w-40 p-5"
      />
    </div>
  );
};

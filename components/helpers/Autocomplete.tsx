import {
  createContext,
  use,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { clss } from '../../helpers';
import { useOnClickOutside } from '../../hooks/useClickOutside';

interface ContextValue {
  selectedItemId: string | null;
  setAutocompleteSelectedItem: (id: string) => void;
}

const AutocompleteContext = createContext<ContextValue>({
  selectedItemId: null,
  setAutocompleteSelectedItem: () => null,
});

const Autocomplete = ({
  children,
  isVisible,
  onClose = () => null,
}: {
  children: JSX.Element;
  isVisible: boolean;
  onClose?: () => void;
}) => {
  const autocompleteRef                                 = useRef(null);
  const [selectedItemId, setAutocompleteSelectedItemId] = useState<
    string | null
  >(null);

  useOnClickOutside({ ref: autocompleteRef, handler: () => onClose() });

  useEffect(() => {
    if (selectedItemId) {
      onClose();
    }
  }, [selectedItemId]);

  return (
    <AutocompleteContext.Provider
      value={{
        selectedItemId,
        setAutocompleteSelectedItem: setAutocompleteSelectedItemId,
      }}
    >
      <div
        ref={autocompleteRef}
        className={clss(
          'bg-white shadow-md absolute text-gray-400 flex flex-col gap-2 max-h-[18rem] overflow-y-auto scrollbar-none animate-fade border border-t-gray-100',
          {
            hidden: !isVisible,
          }
        )}
      >
        {children}
      </div>
    </AutocompleteContext.Provider>
  );
};

Autocomplete.Item = ({
  children,
}: {
  children: JSX.Element | ((props: ContextValue) => void);
}) => {
  const { selectedItemId, setAutocompleteSelectedItem } =
    useContext(AutocompleteContext);

  return (
    <>
      {typeof children === 'function'
        ? children({
            selectedItemId,
            setAutocompleteSelectedItem,
          })
        : children}
    </>
  );
};

export default Autocomplete;

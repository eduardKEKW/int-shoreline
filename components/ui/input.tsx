import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { VscClose } from 'react-icons/vsc';
import { clss } from '../../helpers';

type Props = React.ComponentPropsWithoutRef<'input'> & {
  className?: string;
  loading?: boolean;
  onClear?: () => void;
};

const Input = ({
  className,
  value,
  onClear,
  loading = false,
  ...rest
}: Props) => {
  return (
    <div className="flex w-full border border-gray-200 shadow-md rounded-md">
      <input
        type="text"
        value={value}
        className={clss(`${className} grow outline-none`)}
        {...rest}
      />

      <div className="flex flex-row gap-3 justify-center items-center px-3">
        <VscClose
          onClick={() => onClear?.()}
          className={clss(
            'cursor-pointer hover:bg-gray-200 rounded-lg w-5 h-5',
            {
              hidden: !!!value || !onClear || rest.type === 'date',
            }
          )}
        />

        <AiOutlineLoading3Quarters
          className={clss('w-3 h-3 font-bold animate-spin', {
            hidden: !loading,
          })}
        />
      </div>
    </div>
  );
};

export default Input;

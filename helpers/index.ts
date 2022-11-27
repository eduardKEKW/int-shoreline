interface IClss {
  [key: string]: boolean;
}

const isIClssType = (props: IClss | string | undefined): props is IClss => {
  return !!props && typeof props === 'object';
};

export function clss(baseProps: string | undefined): string;
export function clss(baseProps: IClss): string;
export function clss(baseProps: string, clssProps: IClss): string;
export function clss(
  baseProps: string | IClss | undefined,
  clssProps?: IClss
): string {
  const base = typeof baseProps === 'string' ? `${baseProps} ` : null;
  const clss = isIClssType(baseProps) ? baseProps : clssProps || ({} as IClss);

  const result = Object.entries(clss)
    .filter(([_, value]) => {
      return value;
    })
    .map(([key]) => key)
    .join(' ');

  return base ? base + result : result;
}

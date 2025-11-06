export interface TabOption<T extends string | number> {
  value: T;
  label: string;
}

export interface ITabProps<T extends string | number> {
  options: TabOption<T>[];
  value: T;
  onChange: (value: T) => void;
}


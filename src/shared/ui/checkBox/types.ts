export type IsolateCheckBox = Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    'id' | 'type'
>;

export type IsolateLabel = Omit<
    React.LabelHTMLAttributes<HTMLLabelElement>,
    'htmlFor'
>;

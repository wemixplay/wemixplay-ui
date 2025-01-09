import React, { TextareaHTMLAttributes } from 'react';
interface Props extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    className?: string;
    maxLength?: number;
    error?: boolean;
    info?: boolean;
    handleChange?: (value: string, name?: string) => void;
}
declare const TextArea: React.ForwardRefExoticComponent<Props & React.RefAttributes<HTMLTextAreaElement>>;
export type { Props as TextAreaProps };
export default TextArea;

import React from 'react';

interface InputFieldProps {
    label: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    error?: string;
    maxLength?: number;
    placeholder?: string;
    type?: string;
    inputMode?: 'none' | 'text' | 'tel' | 'url' | 'email' | 'numeric' | 'decimal' | 'search';
    pattern?: string;
    required?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({
    label,
    name,
    value,
    onChange,
    error,
    maxLength,
    placeholder,
    type = 'text',
    inputMode,
    pattern,
    required = true
}) => (
    <div>
        <label htmlFor={name} className="block text-sm font-medium text-gray-700">{label}</label>
        <input
            id={name}
            name={name}
            type={type}
            value={value}
            onChange={onChange}
            maxLength={maxLength}
            placeholder={placeholder}
            className={`pl-1 w-full p-2 border rounded-md mt-1 block w-full border ${error ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm`}
            required={required}
            inputMode={inputMode}
            pattern={pattern}
        />
        {maxLength && (
            <div className="text-sm text-gray-500 mt-1">
                {maxLength - value.length} caracteres restantes
            </div>
        )}
        {error && (
            <div className="text-sm text-red-500 mt-1">
                {error}
            </div>
        )}
    </div>
);

export default InputField;


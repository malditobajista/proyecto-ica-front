// import React from 'react';

// interface InputFieldProps {
//     label: string;
//     value: string;
//     onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
//     error?: string;
//     maxLength?: number;
//     placeholder?: string;
//     type?: string;
// }

// const InputField: React.FC<InputFieldProps> = ({ label, value, onChange, error, maxLength, placeholder, type = 'text' }) => (
//     <div>
//         <label className="block text-sm font-medium text-gray-700">{label}</label>
//         <input
//             type={type}
//             value={value}
//             onChange={onChange}
//             maxLength={maxLength}
//             placeholder={placeholder}
//             className={`pl-1 mt-1 block w-full border ${error ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm`}
//             required
//         />
//         {maxLength && (
//             <div className="text-sm text-gray-500 mt-1">
//                 {maxLength - value.length} caracteres restantes
//             </div>
//         )}
//         {error && (
//             <div className="text-sm text-red-500 mt-1">
//                 {error}
//             </div>
//         )}
//     </div>
// );

// export default InputField;
import React from 'react';

interface InputFieldProps {
    label: string;
    name?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    error?: string;
    maxLength?: number;
    placeholder?: string;
    type?: string;
    inputMode?: any; // Añadido
    pattern?: string;   // Añadido
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
    inputMode, // Añadido
    pattern    // Añadido
}) => (
    <div>
        <label className="block text-sm font-medium text-gray-700">{label}</label>
        <input
            type={type}
            value={value}
            name={name}
            onChange={onChange}
            maxLength={maxLength}
            placeholder={placeholder}
            className={`pl-1 mt-1 block w-full border ${error ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm`}
            required
            inputMode={inputMode} // Añadido
            pattern={pattern}     // Añadido
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
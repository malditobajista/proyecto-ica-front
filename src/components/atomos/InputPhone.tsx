import { FaInfoCircle } from 'react-icons/fa';
import { errorMessages } from '../../utils/errorMessages';

interface InputPhoneProps {
    userData: {
        telefono: string;
    };
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    errors: {
        telefono: string;
    };
}

const InputPhone: React.FC<InputPhoneProps> = ({ userData, handleChange, errors }) => {
    return (
        <div className="relative">
            <label className="block text-sm font-medium">Teléfono</label>
            <input
                type="tel"
                name="telefono"
                value={userData.telefono}
                onChange={handleChange}
                className={`w-full p-2 border rounded ${errors.telefono ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.telefono && <p className="text-red-500 text-xs">{errors.telefono}</p>}

            <div className="group inline-block relative ml-2">
                <FaInfoCircle className="text-gray-500 hover:text-green-500 cursor-pointer" />
                <div className="absolute hidden group-hover:block bg-gray-600 text-white text-xs rounded py-1 px-2 bottom-full mb-1 whitespace-nowrap ">
                    {errorMessages.telefono.formatos}
                </div>
            </div>

        </div>
    );
};

export default InputPhone;

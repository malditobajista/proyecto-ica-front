import React from 'react';
import { Link } from 'react-router-dom';

interface ButtonProps {
    to?: string;
    onClick?: () => void;
    children?: React.ReactNode;
    clase?: string;
    type?: 'button' | 'submit' | 'reset';
    disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ to, children, onClick, clase, type = 'button', disabled }) => {
    const isLink = Boolean(to);

    return isLink ? (
        <Link
            to={to as string}
            className={`btn py-2 px-3 pointer-events-auto inline-block cursor-pointer rounded text-base font-normal leading-normal text-primary transition ease-in-out hover:text-white focus:text-primary-600 focus:outline-none focus:ring-0 active:text-primary-700 dark:text-primary-400 bg-green-300 hover:bg-green-500 duration-300 ${clase}`}
            onClick={onClick}
        >
            {children}
        </Link>
    ) : (
        <button
            type={type}
            className={`btn py-2 px-3 pointer-events-auto inline-block cursor-pointer rounded text-base font-normal leading-normal text-primary transition ease-in-out hover:text-white focus:text-primary-600 focus:outline-none focus:ring-0 active:text-primary-700 dark:text-primary-400 bg-green-300 hover:bg-green-500 duration-300 ${clase}`}
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    );
};

export default Button;
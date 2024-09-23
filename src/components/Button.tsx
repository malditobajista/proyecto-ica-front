import React from 'react';
import { Link } from 'react-router-dom';

interface ButtonProps {
    to: string;
    children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ to, children }) => {
    return (
        <Link to={to} className="btn py-2 px-3 pointer-events-auto inline-block cursor-pointer rounded text-base font-normal leading-normal text-primary transition  ease-in-out hover:text-white focus:text-primary-600 focus:outline-none focus:ring-0 active:text-primary-700 dark:text-primary-400 bg-green-400 hover:bg-green-700 duration-300">

            {children}
        </Link>
    );
};

export default Button;
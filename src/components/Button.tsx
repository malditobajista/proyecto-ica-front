import React from 'react';
import { Link } from 'react-router-dom';

interface ButtonProps {
    to: string;
    onClick?: () => void;
    children: React.ReactNode;
    clase?: string;
}

const Button: React.FC<ButtonProps> = ({ to, children, onClick, clase }) => {
    return (
        <Link to={to} className={`btn py-2 px-3 pointer-events-auto inline-block cursor-pointer rounded text-base font-normal leading-normal text-primary transition  ease-in-out hover:text-white focus:text-primary-600 focus:outline-none focus:ring-0 active:text-primary-700 dark:text-primary-400 bg-green-300 hover:bg-green-500 duration-300 ${clase}`}
            onClick={onClick}
        >
            {children}
        </Link>
    );
};

export default Button;
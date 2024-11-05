
interface TitleProps {
    text: string;
}

const Title: React.FC<TitleProps> = ({ text }) => {
    return (
        <div className="text-2xl font-bold leading-tight p-4">{text}</div>
    );
}

export default Title;
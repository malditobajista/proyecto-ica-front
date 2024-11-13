
interface TitleProps {
    text: string;
    clase?: string
}

const Title: React.FC<TitleProps> = ({ text, clase }) => {
    return (
        <div className={`text-2xl font-bold leading-tight p-4 ${clase}`}>{text}</div>
    );
}

export default Title;
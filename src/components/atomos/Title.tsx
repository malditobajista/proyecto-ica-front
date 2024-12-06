
interface TitleProps {
    text: string;
    clase?: string
}

const Title: React.FC<TitleProps> = ({ text, clase }) => {
    return (
        <div className={`text-2xl font-bold font-sans leading-tight ${clase}`}>{text}</div>
    );
}

export default Title;
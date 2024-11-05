import { RecaptchaProps } from '../../utils/types';

const Recaptcha: React.FC<RecaptchaProps> = ({ onError, isChecked, setIsChecked }) => {
    // @ts-ignore
    const handleCheckboxClick = () => {
        const newChecked = !isChecked;
        setIsChecked(newChecked);
        if (!newChecked) {
            onError('Por favor completa el reCAPTCHA.');
        } else {
            onError('');
        }
    };

    return (
        <>
            <div className="flex justify-center">
                <iframe title="reCAPTCHA" role="presentation" name="a-8yq2dllu9qeg" width="304"
                    height="100"
                    sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-top-navigation allow-modals allow-popups-to-escape-sandbox allow-storage-access-by-user-activation" src="https://www.google.com/recaptcha/api2/anchor?ar=1&amp;k=6LfnurgUAAAAAOcah5viUblchiNSQboVOVKLUmus&amp;co=aHR0cHM6Ly93d3cuaW5tb2JpbGlhcmlhY29zdGFhenVsLmNvbTo0NDM.&amp;hl=en&amp;v=-ZG7BC9TxCVEbzIO2m429usb&amp;size=normal&amp;cb=4kik0asvrsrq">

                </iframe>
            </div>
        </>
    );
};

export default Recaptcha;
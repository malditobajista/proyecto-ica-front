import React, { useState } from 'react';

const Recaptcha: React.FC = () => {
    const [isChecked, setIsChecked] = useState(false);

    const handleCheckboxClick = () => {
        setIsChecked(!isChecked);
    };

    return (
        <>
            <div><iframe title="reCAPTCHA" width="304" height="78" role="presentation" name="a-8yq2dllu9qeg"
                //  frameborder="0"
                //  scrolling="no"
                sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-top-navigation allow-modals allow-popups-to-escape-sandbox allow-storage-access-by-user-activation" src="https://www.google.com/recaptcha/api2/anchor?ar=1&amp;k=6LfnurgUAAAAAOcah5viUblchiNSQboVOVKLUmus&amp;co=aHR0cHM6Ly93d3cuaW5tb2JpbGlhcmlhY29zdGFhenVsLmNvbTo0NDM.&amp;hl=en&amp;v=-ZG7BC9TxCVEbzIO2m429usb&amp;size=normal&amp;cb=4kik0asvrsrq"></iframe></div>
        </>

    );
};

export default Recaptcha;

import React from 'react';

import { contributors } from '../../Data';
import { getFormatDate } from '../../API';

export default function Footer() {
    const date = getFormatDate();

    const contributors2Render = contributors.map( name => (
        <a
            key    = { name }
            style  = {{ margin: 5 }}
            href   = { `https://www.fxp.co.il/member.php?username=${ name }` }
            target = "_blank"
            rel    = "noreferrer">{ name },</a>
    ));

    return (
        <footer>
            <p>אהבתם את הכלי? מצאתם באג? תרגישו חופשי לשלוח הודעה <a
                style  = {{ margin: 5 }}
                href   = "https://www.fxp.co.il/member.php?username=Y_Moshe"
                target = "_blank"
                rel    = "noreferrer"> Y_Moshe </a> :)</p>
            <h4 style = {{ textAlign: 'center' }}>
               Developed By: { contributors2Render } 10.01.21 - { date }
            </h4>
        </footer>
    );
}

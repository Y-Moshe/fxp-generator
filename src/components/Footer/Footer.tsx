import classes from './Footer.module.css';

import { contributors } from '../../Data';
import { getFormatDate } from '../../API';

export default function Footer() {
    const date = getFormatDate();

    const contributors2Render = contributors.map( name => (
        <a
            key    = { name }
            href   = { `https://www.fxp.co.il/member.php?username=${ name }` }
            target = "_blank"
            rel    = "noreferrer">{ name },</a>
    ));

    return (
        <footer className = { classes.AppFooter }>
            <p> אהבתם את הכלי? מצאתם באג? תרגישו חופשי לשלוח הודעה
                <a
                    href   = "https://www.fxp.co.il/member.php?username=Y_Moshe"
                    target = "_blank"
                    rel    = "noreferrer">
                        Y_Moshe
                </a> :)
            </p>
            <h4> Developed By: { contributors2Render } 10.01.21 - { date } </h4>
        </footer>
    );
}

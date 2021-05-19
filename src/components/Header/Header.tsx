import classes from './Header.module.css';

import { version } from '../../../package.json';

export default function Header() {
    return (
        <header className = { classes.AppHeader }>
            <h2 className = { classes.AppVersion }> FxP Generator v{version} -
                <a
                    href   = "https://github.com/Y-Moshe/fxp-generator"
                    target = "_blank"
                    rel    = "noreferrer">
                    <img src = "https://i.imagesup.co/images2/fabe53eb72f9b6d3d47cd95aff31ffc45c2fdbf8.png" alt = "Github"/>
                </a>
            </h2>

            <h2> כלי לייצור קוד להכרזות, הודעות פרטיות, אזהרות ועוד. </h2>
        </header>
    );
}

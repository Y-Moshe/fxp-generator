import { createStyles, makeStyles, Theme } from '@material-ui/core';

import { contributors } from '../../Data';
import { getFormatDate } from '../../API';

const useStyles = makeStyles(({ palette }: Theme) => createStyles({
    appFooter: {
        width: '100%',
        textAlign: 'center',
        backgroundColor: palette.type === "light" ? palette.grey[300] : palette.grey[600]
    },
    primaryColor: {
        color: palette.text.primary
    },
    linkStyle: {
        margin: 5,
        textDecoration: 'none',
        color: palette.info[palette.type]
    }
}))

export default function Footer() {
    const classes = useStyles();
    const date = getFormatDate();

    const contributors2Render = contributors.map(( name, i ) => (
        <a
            className = { classes.linkStyle }
            key       = { name }
            href      = { `https://www.fxp.co.il/member.php?username=${ name }` }
            target    = "_blank"
            rel       = "noreferrer">{ name + ((i + 1) < contributors.length ? ',' : '')}</a>
    ));

    return (
        <footer className = { classes.appFooter }>
            <p className = { classes.primaryColor }> אהבתם את הכלי? מצאתם באג? תרגישו חופשי לשלוח הודעה
                <a
                    className = { classes.linkStyle }
                    href      = "https://www.fxp.co.il/member.php?username=Y_Moshe"
                    target    = "_blank"
                    rel       = "noreferrer">
                        Y_Moshe
                </a> :)
            </p>
            <h4 className = { classes.primaryColor }> Developed By: { contributors2Render } 10.01.21 - { date } </h4>
        </footer>
    );
}

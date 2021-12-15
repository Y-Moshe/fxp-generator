import { createStyles, makeStyles, Theme, Link } from '@material-ui/core';

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
    m: {
        margin: 5
    },
    issueStyle: {
        margin: 5,
        backgroundColor: '#238636',
        color: 'white',
        padding: 3,
        borderRadius: 5
    }
}))

export default function Footer() {
    const classes = useStyles();
    const date = getFormatDate();

    const contributors2Render = contributors.map(({ userName, profileLink }, i ) => (
        <Link
            className = { classes.m }
            key       = { userName }
            href      = { profileLink }
            target    = "_blank"
            rel       = "noreferrer">
                { userName + ((i + 1) < contributors.length ? ',' : '') }
        </Link>
    ));

    return (
        <footer className = { classes.appFooter }>
            <p className = { classes.primaryColor }>לשינויים בפורומים - עדכון, הוספה או בעיה - לבעלי חשבון Github ניתן לפתוח
                <Link
                    className = { classes.issueStyle }
                    href      = "https://github.com/Y-Moshe/fxp-generator/issues"
                    target    = "_blank"
                    rel       = "noreferrer">
                        Issue
                </Link>.
            </p>
            <p className = { classes.primaryColor }> לחילופין ניתן לפנות אלי באתר
                <Link
                    className = { classes.m }
                    href      = "https://www.fxp.co.il/member.php?u=924810"
                    target    = "_blank"
                    rel       = "noreferrer">
                        Y_Moshe
                </Link>
                או ל- 
                <Link
                    className = { classes.m }
                    href      = "https://www.fxp.co.il/member.php?u=939450"
                    target    = "_blank"
                    rel       = "noreferrer">
                        Arcy
                </Link> :)
            </p>
            <h4 className = { classes.primaryColor }> Developed By: { contributors2Render } 10.01.21 - { date } </h4>
        </footer>
    );
}

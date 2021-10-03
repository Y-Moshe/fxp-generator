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
    },
    issueSpan: {
        backgroundColor: '#238636',
        color: 'white',
        padding: 3,
        borderRadius: 5
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
            <p className = { classes.primaryColor }> לכל שינוי בפורומים עדכון/הוספה/בעיה היכנסו לפה
                <a
                    className = { classes.linkStyle }
                    href      = "https://github.com/Y-Moshe/fxp-generator/issues"
                    target    = "_blank"
                    rel       = "noreferrer">
                        Issues
                </a> ולחצו על <span className = { classes.issueSpan }>New Issue</span> וציינו את הבעיה.
            </p>
            <p className = { classes.primaryColor }>תוכלו גם לשלוח לי הודעה באתר, אבל ייתכן שיקח לי זמן להגיב, פעיל יותר באתר שציינתי
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


import { useEffect, useMemo, useState } from 'react';
import { Formik } from 'formik';
import {
    Button,
    useMediaQuery,
    Switch,
    PaletteType,
    makeStyles,
    Theme,
    createStyles
} from '@material-ui/core';
import { DarkMode, LightMode, GitHub } from '@material-ui/icons';

import { version } from '../../../package.json';
import Input from '../../components/UI/Input/Input';
import { OptionType } from '../../Data';

const useStyles = makeStyles(({ palette }: Theme) => createStyles({
    appHeader: {
        width: '100%',
        backgroundColor: palette.grey[800],
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'
    },
    logo: { margin: 5 },
    appVersion: {
        direction: 'ltr',
        '& a': {
            margin: 5
        }
    },
    appInfo: {
        textAlign: 'center',
        fontFamily: 'cursive',
        color: 'white'
    },
    userSettings: {
        backgroundColor: palette.type === 'light' ? palette.background.default : palette.grey[700],
        boxShadow: '0 0 7px black',
        borderRadius: 5,
        margin: 10,
        padding: 5,
        width: 250
    },

    '@media (min-width: 1048px)': {
        appHeader: {
            flexDirection: 'row',
            justifyContent: 'space-between'
        },
        logo: {
            alignSelf: 'flex-start'
        }
    }
}));

const darkIcon   = <DarkMode  style = {{ color: '#343a40' }} />;
const lightIcon  = <LightMode style = {{ color: '#ffee00' }} />;
const githubIcon = <GitHub    style = {{ color: 'white' }} />

const themeOptions: OptionType[] = [
    {
        id: 1,
        label: <>{ lightIcon } - בהיר</>,
        value: 'light'
    },
    {
        id: 2,
        label: <>{ darkIcon } - כהה</>,
        value: 'dark'
    }
];

export interface UserSettings {
    privateName: string;
    theme: PaletteType;
}

interface HeaderProps {
    userSettings: UserSettings | {};
    onSaveChanges: ( values: UserSettings ) => void;
}

export default function Header( props: HeaderProps ) {
    const matches = useMediaQuery( '(min-width: 1048px)' );
    const [showPanel, setShowPanel] = useState( false );
    const classes = useStyles();

    // Keep update panel visibility whenever screen size changes
    useEffect(() => {
        setShowPanel( matches );
    }, [ matches ]);

    const initialValues = useMemo(() => {
        const { privateName, theme } = props.userSettings as UserSettings;
        return {
            privateName: privateName || '',
            theme: theme || themeOptions[0].value
        };
    }, [ props.userSettings ]);

    return (
        <header className = { classes.appHeader }>
            <img
                src       = "https://images.weserv.nl/?url=i.imgur.com/DPZXQRv.png"
                alt       = "fxp logo"
                className = { classes.logo } />

            <main className = { classes.appInfo }>
                <h2 className = { classes.appVersion }> FxP Generator v{version} -
                    <a
                        href   = "https://github.com/Y-Moshe/fxp-generator"
                        target = "_blank"
                        rel    = "noreferrer">
                        { githubIcon }
                    </a>
                </h2>

                <h2> כלי לייצור קוד להכרזות, הודעות פרטיות, אזהרות ועוד. </h2>
            </main>

            
            { !matches && <Switch
                    color       = "primary"
                    onChange    = { () => setShowPanel( prevVal => !prevVal ) }
                    checked     = { showPanel } />}
            <div
                className = {  classes.userSettings }
                hidden = { !showPanel }>
                <Formik
                    onSubmit      = { props.onSaveChanges }
                    initialValues = { initialValues }
                    enableReinitialize >
                    {({
                        values,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        isValid,
                        isValidating,
                        dirty
                    }) => (
                    <form onSubmit = { handleSubmit }>
                        <Input
                            type     = "text"
                            name     = "privateName"
                            label    = "שם פרטי"
                            size     = "small"
                            onChange = { handleChange }
                            onBlur   = { handleBlur }
                            value    = { values.privateName } />
                        <Input
                            type          = "select"
                            name          = "theme"
                            label         = "ערכת עיצוב"
                            selectOptions = { themeOptions }
                            onChange      = { handleChange }
                            value         = { values.theme } />
                        <Button
                            type     = "submit"
                            variant  = "contained"
                            color    = "primary"
                            size     = "small"
                            disabled = { !isValid || isValidating || !dirty }
                            style    = {{
                                marginTop: 5,
                                width: '100%'
                            }} >
                            שמור שינויים
                        </Button>
                    </form>)}
                </Formik>
            </div>
        </header>
    );
}

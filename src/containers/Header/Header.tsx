
import { useEffect, useMemo, useState } from 'react';
import { Formik } from 'formik';
import { Button, useMediaQuery, Switch } from '@material-ui/core';
import { DarkMode, LightMode } from '@material-ui/icons';

import classes from './Header.module.css';
import { version } from '../../../package.json';
import Input from '../../components/UI/Input/Input';

export interface UserSettings {
    privateName: string;
    theme: string;
}

interface HeaderProps {
    userSettings: UserSettings | {};
    onSaveChanges: ( values: any ) => void;
}

const darkIcon  = <DarkMode  style = {{ color: 'var(--bg-dark)' }} />;
const lightIcon = <LightMode style = {{ color: '#ffee00' }} />;

const themeOptions = [
    {
        label: <>{ lightIcon } - בהיר</>,
        value: 'light'
    },
    {
        label: <>{ darkIcon } - כהה</>,
        value: 'dark'
    }
]

export default function Header( props: HeaderProps ) {
    const matches = useMediaQuery( '(min-width: 1048px)' );
    const [showPanel, setShowPanel] = useState( false );

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
        <header className = { classes.AppHeader }>
            <img
                src       = "https://images.weserv.nl/?url=i.imgur.com/DPZXQRv.png"
                alt       = "fxp logo"
                className = { classes.Logo } />

            <main className = { classes.AppInfo }>
                <h2 className = { classes.AppVersion }> FxP Generator v{version} -
                    <a
                        href   = "https://github.com/Y-Moshe/fxp-generator"
                        target = "_blank"
                        rel    = "noreferrer">
                        <img
                            src = "https://i.imagesup.co/images2/fabe53eb72f9b6d3d47cd95aff31ffc45c2fdbf8.png"
                            alt = "Github"/>
                    </a>
                </h2>

                <h2> כלי לייצור קוד להכרזות, הודעות פרטיות, אזהרות ועוד. </h2>
            </main>

            
            { !matches && <Switch
                    color       = "primary"
                    onChange    = { () => setShowPanel( prevVal => !prevVal ) }
                    checked     = { showPanel } />}
            <div
                className = { classes.UserSettings }
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

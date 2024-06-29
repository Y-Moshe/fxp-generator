import { useEffect, useMemo, useRef, useState } from 'react';
import {
  ThemeProvider,
  createMuiTheme,
  Button
} from '@material-ui/core';

import './App.css';

import { DECLARATION_WEEKLY_CHALLENGES, DECLARATION_WEEKLY_RESPONSE } from './Data';
import { ForumData, getForumsList } from './API';

import Footer from './components/Footer/Footer';
import Header, { UserSettings } from './containers/Header/Header';
import RTL from './components/UI/RTL/RTL';
import Select from './components/UI/Select/Select';
import Template from './containers/Template/Template';
import SnackAlert, { SnackAlertProps } from './components/UI/SnackAlert/SnackAlert';

function App() {
    const [ userSettings, setUserSettings ] = useState<UserSettings | {}>( {} );
    const [ template, setTemplate ] = useState<string | undefined>( '' );
    const [ BBCode, setBBCode ] = useState( '' );
    const [ alert, setAlert ] = useState<SnackAlertProps | null>( null );
    const [ autoCompleteOptions, setAutoCompleteOptions ] = useState<ForumData[]>( [] );
    
    const theme = useMemo(() => createMuiTheme({
        direction: 'rtl',
        palette: {
            type: (userSettings as UserSettings).theme || 'light'
        }
    }), [ userSettings ]);

    const textAreaRef = useRef<HTMLTextAreaElement | any>();

    useEffect(() => {
        const list = getForumsList();
        setAutoCompleteOptions( list );

        loadUserSettings();
    }, []);

    const loadUserSettings = () => {
        const settings = JSON.parse( localStorage.getItem('userSettings') || '{}' );
        setUserSettings( settings );
    };

    const saveUserSettings = ( settings: UserSettings ) => {
        localStorage.setItem('userSettings', JSON.stringify( settings ));
        setUserSettings({ ...settings });

        popupMessage({
            message: 'נשמר בהצלחה!',
            status: 'success'
        })
    };

    const handleSubmission = ( BBCode: string ) => {
        setBBCode( BBCode );

        handleCopy();
    };
    
    const handleCopy = () => {
        (textAreaRef.current as HTMLTextAreaElement)?.select();
        document.execCommand('copy');

        popupMessage({
            message: 'התוצאה הועתקה בהצלחה(clipboard copied)',
            status: 'success'
        })
    };

    const handleSelect = ( value ) => {
        setTemplate( value );
        setBBCode( '' );
    };
  
    const handleReset = () => {
        setTemplate( '' );
        setBBCode( '' );
        setAlert( null );
    };

    const popupMessage = ( { status, message }: SnackAlertProps ) => {
        setAlert({ status, message });
        setTimeout(() => setAlert( null ), 3000);
    }

    return (
        <RTL>
        <ThemeProvider theme = { theme }>
        <div
            className = "App"
            style = {{
                backgroundColor: (userSettings as UserSettings).theme === 'dark'
                 ? theme.palette.grey[400] : theme.palette.background.default
            }}>
            <Header
                onSaveChanges = { saveUserSettings } 
                userSettings  = { userSettings } />

            <main className = "Main">
                {(  template === DECLARATION_WEEKLY_CHALLENGES ||
                    template === DECLARATION_WEEKLY_RESPONSE ) &&
                <div className = "WeeklyChallengesMessage">
                    <p>ⓘ</p>
                    להזכירכם, בעת ההכרזה עליכם:
                    <ol>
                    <li>לבטל את הצגת החתימה בתגובה</li>
                    <li>למחוק את ההכרזה של השבוע הקודם</li>
                    <li>ליידע את מפקח הקטגורייה באשכול הדיון</li>
                    </ol>
                </div>}

                <div className = "TemplateContainer">
                    <Select
                        template = { template }
                        onSelect = { handleSelect } />
                    {template && <Template
                        userSettings        = { userSettings }
                        autoCompleteOptions = { autoCompleteOptions }
                        template            = { template }
                        onSubmit            = { handleSubmission }
                        onReset             = { handleReset } />}
                </div>

                {BBCode && <div className = "HtmlTemplate">
                    <Button
                        type    = "button"
                        color   = "inherit"
                        variant = "outlined"
                        onClick = { handleCopy }
                        fullWidth > העתק </Button>
                    <textarea
                        style = {{ color: theme.palette.type === 'light'
                         ? 'black' : theme.palette.text.primary }}
                        readOnly
                        ref   = { textAreaRef }
                        value = { BBCode }></textarea>
                </div>}
            </main>

            {alert && <SnackAlert
                message = { alert.message }
                status  = { alert.status }
                onClose = { () => setAlert( null ) } />}
            <Footer />

        </div>
        </ThemeProvider>
        </RTL>
    );
}

export default App;

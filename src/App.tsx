import React, { useEffect, useRef, useState } from 'react';
import {
  ThemeProvider,
  createMuiTheme,
  Button
} from '@material-ui/core';

import './App.css';

import { DECLARATION_WEEKLY_CHALLENGES } from './Data';
import { getForumsList } from './API';

import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import RTL from './components/UI/RTL/RTL';
import Select from './components/UI/Select/Select';
import AddForumDialog from './containers/AddForumDialog/AddForumDialog';
import Template from './containers/Template/Template';

const theme = createMuiTheme({
  direction: 'rtl'
});

function App() {
  const [ template, setTemplate ] = useState<any>( '' );
  const [ htmlCode, setHtmlCode ] = useState<string>( '' );
  const [ autoCompleteOptions, setAutoCompleteOptions ] = useState<any[]>( [] );

  const textAreaRef = useRef<any>();

  useEffect(() => {
    getForumsList()
      .then(results => setAutoCompleteOptions(results))
      .catch(err => console.log( err ));
  }, []);

  const handleSubmission = ( htmlCode: string ) => {
    setHtmlCode( htmlCode );

    handleCopy();
  };
  
  const handleCopy = () => {
    textAreaRef.current?.select();
    document.execCommand('copy');
  };

  const handleReset = () => {
    setTemplate( '' );
    setHtmlCode( '' );
  };

  return (
    <div className = "App">
      <Header />

      <main className = "Main">
        <RTL>
          <ThemeProvider theme = { theme }>
            <AddForumDialog />
            {template === DECLARATION_WEEKLY_CHALLENGES ?
              <div className = "WeeklyChallengesMessage">
                <p style={{ textAlign: 'center', margin: 0 }}> ⓘ </p>
                להזכירכם, בעת ההכרזה עליכם:
                <ol>
                  <li>לבטל את הצגת החתימה בתגובה</li>
                  <li>למחוק את ההכרזה של השבוע הקודם</li>
                  <li>לשלוח קישור להכרזה בצירוף תיוג המפקח/ים באשכול הדיון</li>
                </ol>
              </div> : null}

            <div className = "TemplateContainer">
              <Select
                template = { template }
                onSelect = { value => setTemplate( value) } />
              {template ? <Template
                autoCompleteOptions = { autoCompleteOptions }
                template            = { template }
                onSubmit            = { handleSubmission }
                onReset             = { handleReset } /> : null}
            </div>

            {htmlCode ?
              <div className = "HtmlTemplate">
                <Button
                    type    = "button"
                    color   = "inherit"
                    variant = "outlined"
                    onClick = { handleCopy }
                    fullWidth > העתק </Button>
                <textarea
                  readOnly
                  ref   = { textAreaRef }
                  value = { htmlCode }
                  style = {{
                    maxWidth: '100%',
                    minWidth: '100%',
                    minHeight: 500,
                    width: '100%',
                    height: 500
                  }}></textarea>
              </div> : null}
          </ThemeProvider>
        </RTL>
      </main>

      <Footer />
    </div>
  );
}

export default App;

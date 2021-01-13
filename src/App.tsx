import React, { useState } from 'react';
import {
  ThemeProvider,
  createMuiTheme
} from '@material-ui/core';

import './App.css';

import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import RTL from './components/UI/RTL/RTL';
import Select from './components/UI/Select/Select';
import Template from './components/UI/Template/Template';
import { DECLARATION_WEEKLY_CHALLENGES } from './Data';

const theme = createMuiTheme({
  direction: 'rtl'
});

function App() {
  const [ template, setTemplate ] = useState<any>( '' );
  const [ htmlCode, setHtmlCode ] = useState<string>( '' );

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
                template = { template }
                onSubmit = { ( htmlCode ) => setHtmlCode( htmlCode ) }
                onReset  = { handleReset } /> : null}
            </div>

            {htmlCode ?
              <div className = "HtmlTemplate">
                <textarea
                  readOnly
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

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

const theme = createMuiTheme({
  direction: 'rtl'
});

function App() {
  const [template, setTemplate] = useState<any>('');

  const handleSubmission = () => '';

  return (
    <div className="App">
      <Header />

      <main className="Main">
        <RTL>
          <ThemeProvider theme={theme}>
            <Select
              template={template}
              onSelect={value => setTemplate(value)} />
            <Template
              template={template}
              onSubmit={handleSubmission} />
          </ThemeProvider>
        </RTL>
      </main>

      <Footer />
    </div>
  );
}

export default App;

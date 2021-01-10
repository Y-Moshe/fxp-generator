import React, { useState } from 'react';

import './App.css';

import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Select from './components/UI/Select/Select';

function App() {
  const [template, setTemplate] = useState<any>('');

  return (
    <div className="App">
      <Header />

      <main className="Main">
        <Select
          template={template}
          onSelect={value => setTemplate(value)} />
      </main>

      <Footer />
    </div>
  );
}

export default App;

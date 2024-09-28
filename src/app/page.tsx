'use client';

import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import NotFound from '@/components/NotFound';
import HomePage from '@/pages/Home';
import AboutPage from '@/pages/About';
import Contact from '@/pages/Contact';
import CrudApi from '@/pages/ApiCrudComponent';
import PokeApi from '@/pages/ApiPokeComponent';
import JsonApi from '@/pages/ApiJsonComponent';

const App: React.FC = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [pagSelect, setPagSelect] = useState<string | null>(null);

  useEffect(() => {
    console.log('Checking dark theme...');
    setIsDarkTheme(checkDarkTheme());
  }, []);

  const checkDarkTheme = (): boolean => {
    return false;
  };

  const rendPages = () => {
    console.log('Rendering page:', pagSelect);

    let pageComponent;
    switch (pagSelect) {
      case 'HomePage':
        pageComponent = <HomePage />;
        break;
      case 'CrudProject':
        pageComponent = <CrudApi />;
        break;
      case 'JsonProject':
        pageComponent = <JsonApi />;
        break;
      case 'PokeProject':
        pageComponent = <PokeApi />;
        break;
      case 'Contact':
        pageComponent = <Contact />;
        break;
      case 'About':
        pageComponent = <AboutPage />;
        break;
      case null:
        pageComponent = <HomePage />;
        break;
      default:
        pageComponent = <NotFound />;
        break;
    }

    return pageComponent;
  };

  return (
    <div className={isDarkTheme ? 'dark-theme' : 'light-theme'}>
      <div className="flex flex-col min-h-screen">
        <Header setPage={setPagSelect} />
        <main className="flex-grow">
          <div className="relative min-h-screen p-3">
            {rendPages()}
          </div>
        </main>
        <Footer setPage={setPagSelect} />
      </div>
    </div>
  );
};

export default App;

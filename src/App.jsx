import React from 'react';
import './App.css';
import Header from './features/header/header.jsx';
import Search from './features/search/search.jsx';
import Home from './features/home/home.jsx';
import Subreddits from './features/subreddit/subreddits.jsx';
import Footer from './features/footer/footer';

function App() {
  return (
    <>
    <Header />
    <Search />
    <main>
      <Home />
    </main>
    <aside>
    <Subreddits />
    </aside>
    <footer>
      <Footer />
    </footer>
    </>
  );
}

export default App;

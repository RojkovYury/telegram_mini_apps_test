import { useEffect } from 'react';
import './App.css';

const tg = window.Telegram.WebApp;

const ExternalLink = ({ url, children }) => {
  const handleClick = () => {
    window.open(url, '_blank');
  };

  return <a onClick={handleClick}>{children}</a>;
};

function App() {

  useEffect(() => { tg.ready(); })

  return (
    <div className="App">
      <div style={{ margin: '10px' }}>
        <a href="https://dev-4.clubber.me/shop/testcases">https://dev-4.clubber.me/shop/testcases</a>
      </div>
      <div style={{ margin: '10px' }}>
        <ExternalLink url="https://dev-4.clubber.me/shop/testcases">https://dev-4.clubber.me/shop/testcases</ExternalLink>
      </div>
    </div>

  );
}

export default App

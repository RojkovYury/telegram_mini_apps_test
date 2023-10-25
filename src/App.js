import { useCallback, useEffect, useState } from 'react';
import './App.css';
import {Box } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import PersonIcon from '@mui/icons-material/Person';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

const tg = window.Telegram.WebApp;
const userId = tg?.initDataUnsafe?.user ? tg.initDataUnsafe.user.id : 'tg_userId';
tg.MainButton.isVisible = true;

function App() {

  useEffect(() => { tg.ready(); })

  const [cardNumber, setCardNumber] = useState('');
  const [nameOnCard, setNameOnCard] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');

  useEffect(() => { 
    tg.MainButton.setParams({
      text: 'Отправить данные'
    }); 
  })
  const onSendData = useCallback(()=>{
    const data = { cardNumber, nameOnCard, expiryDate, cvv }
    tg.sendData(JSON.stringify(data))
  }, [cardNumber, nameOnCard, expiryDate, cvv])

  useEffect(() => {
    tg.onEvent('mainButtonClicked', onSendData);
    return () => {
      tg.offEvent('mainButtonClicked', onSendData)
    }
  }, [onSendData])

  const handleCardNumberChange = (e) => {
    const value = e.target.value;
    if (value === "" || /^[0-9\b]+$/.test(value)) {
      setCardNumber(value);
    }
  };

  const handleNameOnCardChange = (e) => {
    const value = e.target.value;
    if (value === "" || /^[a-zA-Z\s]+$/.test(value)) {
      setNameOnCard(value.toUpperCase());
    }
  };

  const handleExpiryDateChange = (e) => {
    const value = e.target.value;
    if (value === "" || /^[0-9/]+$/.test(value)) {
      setExpiryDate(value);
    }
  };

  const handleCvvChange = (e) => {
    const value = e.target.value;
    if (value === "" || /^[0-9\b]+$/.test(value)) {
      setCvv(value);
    }
  };
  // var(--tg-theme-secondary-bg-color, #efefef);
  return (
    <div className="App">
        <Box sx={{ display: 'flex', flexDirection: 'column', px:3, pt: 5 }}>




          {/* Card Number0: */}
          <div style={{ width: '100%', paddingBottom: '16px' }}>
            <div style={{ paddingLeft: '10px', marginBottom: '2px', fontSize: '16px', color: 'var(--tg-theme-text-color)' }}>
              Card Number:
            </div>

            <div style={{ border: '2px solid var(--tg-theme-secondary-bg-color, #efefef)', backgroundColor: 'var(--tg-theme-secondary-bg-color)', borderRadius: '25px', display: 'flex' }}>
              
              <div style={{ width: '24px', height: '24px', marginTop: '10px', marginBottom: '10px', marginLeft: '10px', marginRight: '10px' }}>
                <CreditCardIcon sx={{ color: 'var(--tg-theme-text-color)' }}/>
              </div>

              <input
                placeholder='Card number'
                value={cardNumber}
                onChange={handleCardNumberChange}
                style={{ color: 'var(--tg-theme-text-color)', backgroundColor: 'inherit', width: '100%', paddingTop: '10px', paddingBottom: '10px', paddingRight: '10px', border: 'none', outline: 'none', fontSize: '18px' }}
              />
            </div>

            {/* <div style={{ paddingLeft: '10px', color: 'var(--tg-theme-text-color)' }}>help text</div> */}
          </div>






          {/* Card Number: */}
          <div style={{ width: '100%', paddingBottom: '16px' }}>
            <div style={{ paddingLeft: '10px', marginBottom: '2px', fontSize: '16px', color: 'var(--tg-theme-text-color)' }}>
              Card Number:
            </div>
            <div style={{ border: '2px solid var(--tg-theme-text-color)', borderRadius: '4px', display: 'flex' }}>
              <div style={{ width: '24px', height: '24px', marginTop: '10px', marginBottom: '10px', marginLeft: '10px', marginRight: '10px' }}>
                <CreditCardIcon sx={{ color: 'var(--tg-theme-text-color)' }}/>
              </div>
              <input 
                value={cardNumber}
                onChange={handleCardNumberChange}
                style={{ color: 'var(--tg-theme-text-color)', backgroundColor: 'inherit', width: '100%', paddingTop: '10px', paddingBottom: '10px', paddingRight: '10px', border: 'none', outline: 'none', fontSize: '18px' }}
              />
            </div>
            {/* <div style={{ paddingLeft: '10px', color: 'var(--tg-theme-text-color)' }}>help text</div> */}
          </div>

          {/* Name on Card: */}
          <div style={{ width: '100%', paddingBottom: '16px' }}>
            <div style={{ paddingLeft: '10px', marginBottom: '2px', fontSize: '16px', color: 'var(--tg-theme-text-color)' }}>
              Name on Card:
            </div>
            <div style={{ border: '2px solid var(--tg-theme-text-color)', borderRadius: '4px', display: 'flex' }}>
              <div style={{ width: '24px', height: '24px', marginTop: '10px', marginBottom: '10px', marginLeft: '10px', marginRight: '10px' }}>
                <PersonIcon sx={{ color: 'var(--tg-theme-text-color)' }}/>
              </div>
              <input 
                value={nameOnCard}
                onChange={handleNameOnCardChange}
                style={{ color: 'var(--tg-theme-text-color)', backgroundColor: 'inherit', width: '100%', paddingTop: '10px', paddingBottom: '10px', paddingRight: '10px', border: 'none', outline: 'none', fontSize: '18px' }}
              />
            </div>
            {/* <div style={{ paddingLeft: '10px', color: 'var(--tg-theme-text-color)' }}>help text</div> */}
          </div>

          <Box sx={{ display: 'flex' }}>
          {/* ExpiryDate: */}
            <div style={{ width: '100%', paddingBottom: '16px', flexBasis: '0', flexGrow: '1' }}>
              <div style={{ paddingLeft: '10px', marginBottom: '2px', fontSize: '16px', color: 'var(--tg-theme-text-color)' }}>
                ExpiryDate:
              </div>
              <div style={{ border: '2px solid var(--tg-theme-text-color)', borderRadius: '4px', display: 'flex' }}>
                <div style={{ width: '24px', height: '24px', marginTop: '10px', marginBottom: '10px', marginLeft: '10px', marginRight: '10px' }}>
                  <CalendarMonthIcon sx={{ color: 'var(--tg-theme-text-color)' }}/>
                </div>
                <input 
                  value={expiryDate}
                  onChange={handleExpiryDateChange}
                  style={{ color: 'var(--tg-theme-text-color)', backgroundColor: 'inherit', width: '100%', paddingTop: '10px', paddingBottom: '10px', paddingRight: '10px', border: 'none', outline: 'none', fontSize: '18px' }}
                />
              </div>
              {/* <div style={{ paddingLeft: '10px', color: 'var(--tg-theme-text-color)' }}>help text</div> */}
            </div>

            {/* cvv: */}
            <div style={{ width: '100%', paddingBottom: '16px', flexBasis: '0', flexGrow: '1', marginLeft: '10px' }}>
              <div style={{ paddingLeft: '10px', marginBottom: '2px', fontSize: '16px', color: 'var(--tg-theme-text-color)' }}>
                cvv:
              </div>
              <div style={{ border: '2px solid var(--tg-theme-text-color)', borderRadius: '4px', display: 'flex' }}>
                <div style={{ width: '24px', height: '24px', marginTop: '10px', marginBottom: '10px', marginLeft: '10px', marginRight: '10px' }}>
                  <LockIcon sx={{ color: 'var(--tg-theme-text-color)' }}/>
                </div>
                <input 
                  value={cvv}
                  onChange={handleCvvChange}
                  style={{ color: 'var(--tg-theme-text-color)', backgroundColor: 'inherit', width: '100%', paddingTop: '10px', paddingBottom: '10px', paddingRight: '10px', border: 'none', outline: 'none', fontSize: '18px' }}
                />
              </div>
              {/* <div style={{ paddingLeft: '10px', color: 'var(--tg-theme-text-color)' }}>help text</div> */}
            </div>
          </Box>
        </Box>
    </div>
  );
}

export default App

/*

*/
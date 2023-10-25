import { useCallback, useEffect, useState } from 'react';
import './App.css';
import {Box } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import PersonIcon from '@mui/icons-material/Person';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

const tg = window.Telegram.WebApp;
const userId = tg?.initDataUnsafe?.user ? tg.initDataUnsafe.user.id : 'tg_userId';
tg.MainButton.isVisible = false;
tg.MainButton.text = 'Отправить данные';
// tg.MainButton.disable();

function App() {

  useEffect(() => { tg.ready(); })

  const [cardNumber, setCardNumber] = useState('');
  // const [cardNumberError, setCardNumberError] = useState(' ');
  const [nameOnCard, setNameOnCard] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');


  useEffect(() => { 
    if (cardNumber.length === 16 && nameOnCard && expiryDate.length === 4 && cvv.length === 3) { tg.MainButton.show() }
    else { tg.MainButton.hide() }
  }, [cardNumber, nameOnCard, expiryDate, cvv ])

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
    if ((value === "" || /^[0-9\b]+$/.test(value)) && value.length <= 16) {
      setCardNumber(value);
      // setCardNumberError(' ')
    }
    /* if (!cardNumber && !/^[0-9\b]+$/.test(value)) {
      setCardNumberError('Допустимы только цифры');
    } */
  };

  const handleNameOnCardChange = (e) => {
    const value = e.target.value;
    if (value === "" || /^[a-zA-Z\s]+$/.test(value)) {
      setNameOnCard(value.toUpperCase());
    }
  };

  const handleExpiryDateChange = (e) => {
    const value = e.target.value;
    if (value === "" || /^[0-9/]+$/.test(value) && value.length <= 4) {
      setExpiryDate(value);
    }
  };

  const handleCvvChange = (e) => {
    const value = e.target.value;
    if (value === "" || /^[0-9\b]+$/.test(value) && value.length <= 3) {
      setCvv(value);
    }
  };
  
  return (
    <div className="App">
        <Box sx={{ display: 'flex', flexDirection: 'column', px:3, pt: 5 }}>

          {/* Card Number */}
          <div style={{ width: '100%', paddingBottom: '16px' }}>
            <div style={{ paddingLeft: '20px', marginBottom: '4px', fontSize: '16px', color: 'var(--tg-theme-text-color)' }}>
              Card Number
            </div> 
            <div style={{ border: '2px solid var(--tg-theme-button-color)', borderRadius: '25px', display: 'flex' }}>
              <div style={{ width: '24px', height: '24px', marginTop: '10px', marginBottom: '10px', marginLeft: '20px', marginRight: '10px' }}>
                <CreditCardIcon sx={{ color: 'var(--tg-theme-button-color)' }}/>
              </div>
              <input
                value={cardNumber}
                onChange={handleCardNumberChange}
                style={{ color: 'var(--tg-theme-text-color)', borderTopRightRadius: '25px', borderBottomRightRadius: '25px', backgroundColor: 'inherit', width: '100%', paddingTop: '10px', paddingBottom: '10px', paddingRight: '10px', border: 'none', outline: 'none', fontSize: '18px' }}
              />
            </div>
            {/* <div style={{ height: '18px', paddingLeft: '20px', color: '#ff0000' }}>{cardNumberError}</div> */}
          </div>


          {/* Name on Card: */}
          <div style={{ width: '100%', paddingBottom: '16px' }}>
            <div style={{ paddingLeft: '20px', marginBottom: '4px', fontSize: '16px', color: 'var(--tg-theme-text-color)' }}>
              Name on Card
            </div>
            <div style={{ border: '2px solid var(--tg-theme-button-color)', borderRadius: '25px', display: 'flex' }}>
              <div style={{ width: '24px', height: '24px', marginTop: '10px', marginBottom: '10px', marginLeft: '20px', marginRight: '10px' }}>
                <PersonIcon sx={{ color: 'var(--tg-theme-button-color)' }}/>
              </div>
              <input 
                value={nameOnCard}
                onChange={handleNameOnCardChange}
                style={{ color: 'var(--tg-theme-text-color)', borderTopRightRadius: '25px', borderBottomRightRadius: '25px', backgroundColor: 'inherit', width: '100%', paddingTop: '10px', paddingBottom: '10px', paddingRight: '10px', border: 'none', outline: 'none', fontSize: '18px' }}
              />
            </div>
            {/* <div style={{ height: '18px', paddingLeft: '20px', color: '#ff0000' }}>help text</div> */}
          </div>

          <Box sx={{ display: 'flex' }}>
            {/* ExpiryDate: */}
            <div style={{ width: '100%', paddingBottom: '16px', flexBasis: '0', flexGrow: '1' }}>
              <div style={{ paddingLeft: '20px', marginBottom: '4px', fontSize: '16px', color: 'var(--tg-theme-text-color)' }}>
                Expiry Date
              </div>
              <div style={{ border: '2px solid var(--tg-theme-button-color)', borderRadius: '25px', display: 'flex' }}>
                <div style={{ width: '24px', height: '24px', marginTop: '10px', marginBottom: '10px', marginLeft: '20px', marginRight: '10px' }}>
                  <CalendarMonthIcon sx={{ color: 'var(--tg-theme-button-color)' }}/>
                </div>
                <input 
                  value={expiryDate}
                  onChange={handleExpiryDateChange}
                  style={{ color: 'var(--tg-theme-text-color)', borderTopRightRadius: '25px', borderBottomRightRadius: '25px', backgroundColor: 'inherit', width: '100%', paddingTop: '10px', paddingBottom: '10px', paddingRight: '10px', border: 'none', outline: 'none', fontSize: '18px' }}
                />
              </div>
              {/* <div style={{ paddingLeft: '10px', color: 'var(--tg-theme-text-color)' }}>help text</div> */}
            </div>

            {/* cvv: */}
            <div style={{ width: '100%', paddingBottom: '16px', flexBasis: '0', flexGrow: '1', marginLeft: '10px' }}>
              <div style={{ paddingLeft: '20px', marginBottom: '4px', fontSize: '16px', color: 'var(--tg-theme-text-color)' }}>
                CVV
              </div>
              <div style={{ border: '2px solid var(--tg-theme-button-color)', borderRadius: '25px', display: 'flex' }}>
                <div style={{ width: '24px', height: '24px', marginTop: '10px', marginBottom: '10px', marginLeft: '20px', marginRight: '10px' }}>
                  <LockIcon sx={{ color: 'var(--tg-theme-button-color)' }}/>
                </div>
                <input 
                  value={cvv}
                  onChange={handleCvvChange}
                  style={{ color: 'var(--tg-theme-text-color)', borderTopRightRadius: '25px', borderBottomRightRadius: '25px', backgroundColor: 'inherit', width: '100%', paddingTop: '10px', paddingBottom: '10px', paddingRight: '10px', border: 'none', outline: 'none', fontSize: '18px' }}
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
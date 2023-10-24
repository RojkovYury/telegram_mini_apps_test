import { useCallback, useEffect, useState } from 'react';
import './App.css';
import {Box, Button, TextField, InputAdornment, Typography} from '@mui/material';
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
    tg.setBackgroundColor(tg.ThemeParams.secondary_bg_color)
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


  const tgTextFieldSx = { 
    ml:1, 
    mb: 2, 
    input: { color: 'var(--tg-theme-text-color)' },
    label: { color: 'var(--tg-theme-text-color)' },
    div: { color: 'var(--tg-theme-text-color)' },
  };

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

  return (
    <div className="App">
        <Box sx={{ display: 'flex', flexDirection: 'column', px:3, pt: 5 }}>

          {/* Card Number: */}
          <div style={{ width: '100%', paddingBottom: '16px' }}>
            <div style={{ paddingLeft: '10px', marginBottom: '2px', fontSize: '16px' }}>Card Number:</div>
            <div style={{ border: '2px solid var(--tg-theme-text-color)', borderRadius: '4px', display: 'flex' }}>
              <div style={{ width: '24px', height: '24px', marginTop: '10px', marginBottom: '10px', marginLeft: '10px', marginRight: '10px' }}><CreditCardIcon/></div>
              <input 
                value={cardNumber}
                onChange={handleCardNumberChange}
                style={{ color: 'var(--tg-theme-text-color)', backgroundColor: 'inherit', width: '100%', paddingTop: '10px', paddingBottom: '10px', paddingRight: '10px', border: 'none', outline: 'none', fontSize: '18px' }}
              />
            </div>
            <div style={{ paddingLeft: '10px' }}>help text</div>
          </div>



          




          <TextField
            id="cardNumber"
            label="Card Number:"
            value={cardNumber}
            onChange={handleCardNumberChange}
            InputProps={{
              endAdornment: null,
              startAdornment: (
                <InputAdornment position="start">
                  <CreditCardIcon />
                </InputAdornment>
              ),
            }}
            InputLabelProps={{ shrink: true }} 
            focused
            sx={ tgTextFieldSx } 
          />

          <TextField
            id="nameOnCard"
            label="Name on Card:"
            value={nameOnCard} 
            onChange={handleNameOnCardChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonIcon />
                </InputAdornment>
              ),
            }}
            InputLabelProps={{ shrink: true }} 
            focused
            sx={ tgTextFieldSx } 
          />


          <Box sx={{ display: 'flex' }}>
            <TextField
              id="expiryDate"
              label="ExpiryDate:"
              value={expiryDate}
              onChange={handleExpiryDateChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <CalendarMonthIcon />
                  </InputAdornment>
                ),
              }}
              InputLabelProps={{ shrink: true }} 
              focused
              sx={{ ...tgTextFieldSx, flexBasis: 0, flexGrow: 1 }} 
            />

            <TextField
              id="cvv"
              label="cvv:"
              value={cvv}
              onChange={handleCvvChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon />
                  </InputAdornment>
                ),
              }}
              InputLabelProps={{ shrink: true }}
              focused 
              sx={{ ...tgTextFieldSx, flexBasis: 0, flexGrow: 1 }} 
            />
          </Box>
        </Box>
    </div>
  );
}

export default App

/*

*/
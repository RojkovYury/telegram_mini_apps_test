import { useEffect, useState } from 'react';
import './App.css';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import LockIcon from '@mui/icons-material/Lock';
import PersonIcon from '@mui/icons-material/Person';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { colors } from '@mui/material';

const tg = window.Telegram.WebApp;

function App() {

  useEffect(() => { tg.ready(); })
  const onClose = () => { tg.close(); }

  const [cardNumber, setCardNumber] = useState('');
  const [nameOnCard, setNameOnCard] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');

  const handleCardNumberChange = (e) => {
    const value = e.target.value;
    if (/^[0-9\b]+$/.test(value)) {
      setCardNumber(value);
    }
  };

  const handleNameOnCardChange = (e) => {
    const value = e.target.value;
    if (/^[a-zA-Z]+$/.test(value)) {
      setNameOnCard(value.toUpperCase());
    }
  };

  const handleExpirationDateChange = (e) => {
    const value = e.target.value;
    if (/^[0-9/]+$/.test(value)) {
      setExpiryDate(value);
    }
  };

  const handleCvvChange = (e) => {
    const value = e.target.value;
    if (/^[0-9\b]+$/.test(value)) {
      setCvv(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (cardNumber && expirationDate && cvv) {
      console.log('Данные отправлены!');
    } else {
      console.log('Пожалуйста, заполните все поля');
    }
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>

        <button style={{ height: '150px', width: '150px', background: 'var(--tg-theme-text-color)', margin: '20px' }}>text</button>
        <button style={{ height: '150px', width: '150px', background: 'var(--tg-theme-bg-color)', margin: '20px' }}>bg</button>

        <Box sx={{ display: 'flex', flexDirection: 'column', p:2 }}>
          <TextField
            id="cardNumber"
            label="Card Number:"
            type='number'
            value={cardNumber}
            onChange={handleCardNumberChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <CreditCardIcon />
                </InputAdornment>
              ),
            }}
            InputLabelProps={{ shrink: true }} 
            sx={{ ml:1, mb: 1, input: { color: '--tg-theme-text-color' } }}
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
            sx={{ ml:1, mb: 1 }} 
          />
       

          <Box sx={{ display: 'flex' }}>
            <TextField
              id="expiryDate"
              label="ExpiryDate:"
              value={expiryDate}
              // onChange={handleExpirationDateChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <CalendarMonthIcon />
                  </InputAdornment>
                ),
              }}
              InputLabelProps={{ shrink: true }} 
              sx={{ ml:1, mb: 1, flexBasis: 0, flexGrow: 1 }} 
            />

            <TextField
              id="cvv"
              label="cvv:"
              value={cvv}
              // onChange={handleCvvChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon />
                  </InputAdornment>
                ),
              }}
              InputLabelProps={{ shrink: true }} 
              sx={{ ml:1, mb: 1, flexBasis: 0, flexGrow: 1 }} 
            />
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button variant='outlined' onClick={onClose} sx={{ ml:1, mb: 1, minWidth: '120px' }}>
              Close
            </Button>
            <Button variant='contained' type="submit" sx={{ ml:1, mb: 1, minWidth: '120px' }}>
              Submit
            </Button>
          </Box>

        </Box>

      </form>
    </div>
  );
}

export default App


/*

*/
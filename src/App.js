import { useEffect, useState } from 'react';
import './App.css';
import {Box, Button, TextField, InputAdornment, Typography} from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import PersonIcon from '@mui/icons-material/Person';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

const tg = window.Telegram.WebApp;

function App() {

  useEffect(() => { tg.ready(); })
  const onClose = () => { tg.close(); }

  const [cardNumber, setCardNumber] = useState('');
  const [nameOnCard, setNameOnCard] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');

  const WebAppUser = tg.WebAppUser.id

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

  const handleExpirationDateChange = (e) => {
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

        <Typography>{WebAppUser}</Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column', px:3, pt: 5 }}>
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
              onChange={handleExpirationDateChange}
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
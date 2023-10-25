import { useCallback, useEffect, useState } from 'react';
import './App.css';
import { Box, Paper } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import PersonIcon from '@mui/icons-material/Person';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import TelegramInput from './components/telegram-input.jsx';

const tg = window.Telegram.WebApp;
tg.MainButton.isVisible = false;
tg.MainButton.text = 'Отправить данные';
tg.headerColor = 'secondary_bg_color';

function App() {
  useEffect(() => { tg.ready(); })

  const [cardNumber, setCardNumber] = useState('');
  const [nameOnCard, setNameOnCard] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');

  useEffect(() => { 
    if (cardNumber.length === 19 && nameOnCard && expiryDate.length === 5 && cvv.length === 3) { tg.MainButton.show() }
    else { tg.MainButton.hide() }
  }, [cardNumber, nameOnCard, expiryDate, cvv ])

  useEffect(() => { 
    if (cardNumber || nameOnCard || expiryDate || cvv) { tg.enableClosingConfirmation() }
    else { tg.disableClosingConfirmation() }
  }, [cardNumber, nameOnCard, expiryDate, cvv ])

  const onSendData = useCallback(()=>{
    const data = { cardNumber, nameOnCard, expiryDate, cvv }
    tg.sendData(JSON.stringify(data))
  }, [cardNumber, nameOnCard, expiryDate, cvv])

  useEffect(() => {
    tg.onEvent('mainButtonClicked', onSendData);
    return () => {tg.offEvent('mainButtonClicked', onSendData)}
  }, [onSendData])

  const handleCardNumberChange = (e) => {
    const value = e.target.value.replace(/\s/g, "");
    if ((value === "" || /^[0-9\b]+$/.test(value)) && value.length <= 16) {
      setCardNumber(value.replace(/(.{4})(?!$)/g, "$1 "));
    }
  };

  const handleNameOnCardChange = (e) => {
    const value = e.target.value;
    if (value === "" || /^[a-zA-Z\s]+$/.test(value)) {
      setNameOnCard(value.toUpperCase());
    }
  };

  const handleExpiryDateChange = (e) => {
    const value = e.target.value.replace('/', '');
    if (value === "" || /^[0-9\b]+$/.test(value) && value.length <= 4) {
      (value.length > 2) 
        ? setExpiryDate(value.slice(0, 2) + "/" + value.slice(2))
        : setExpiryDate(value)
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
      <Paper elevation={3} sx={{ borderRadius: '25px', backgroundColor: 'var(--tg-theme-bg-color)', display: 'flex', flexDirection: 'column', mx: 3, my: 8, px: 2, py: 2 }}>
        <TelegramInput
        title='Card Number'
        placeholder='**** **** **** ****'
        value={cardNumber}
        onChange={handleCardNumberChange}
        icon={<CreditCardIcon sx={{ color: 'var(--tg-theme-button-color)' }}/>}
      />
      <TelegramInput
        title='Name on Card'
        placeholder=''
        value={nameOnCard}
        onChange={handleNameOnCardChange}
        icon={<PersonIcon sx={{ color: 'var(--tg-theme-button-color)' }}/>}
      />
        <Box sx={{ display: 'flex' }}>
          <TelegramInput
            title='Expiry Date'
            placeholder='**/**'
            value={expiryDate}
            onChange={handleExpiryDateChange}
            icon={<CalendarMonthIcon sx={{ color: 'var(--tg-theme-button-color)' }}/>}
            sx={{flexBasis: '0', flexGrow: '1'}}
          />
          <TelegramInput
            title='CVV'
            placeholder='***'
            value={cvv}
            onChange={handleCvvChange}
            icon={<LockIcon sx={{ color: 'var(--tg-theme-button-color)' }}/>}
            sx={{flexBasis: '0', flexGrow: '1'}}
          />
        </Box>
      </Paper>
    </div>
  );
}

export default App

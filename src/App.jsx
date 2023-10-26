import { useCallback, useEffect, useState } from 'react';
import './App.css';
import { Box, Paper } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import PersonIcon from '@mui/icons-material/Person';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import TelegramInput from './components/telegram-input.jsx';
import TelegramSnackbar from './components/telegram-snackbar';

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

  // Snackbar
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [messageSnackbar, setMessageSnackbar] = useState('');
  const handleCloseSnackbar = () => { setOpenSnackbar(false); };
  const handleOpenSnackbar = (message, divId, disableInfAnim) => {
    setMessageSnackbar(message);
    setOpenSnackbar(true);
    const div = document.getElementById(divId);
    div.classList.add("pulsating-border")
    if (disableInfAnim) {
      setTimeout(function() {
        div.classList.remove("pulsating-border");
      }, 1200);
    }
  };

  // MAIN BUTTON CHECK
  useEffect(() => { 
    if (cardNumber.length === 19 && lunaCheck(cardNumber.replace(/\s/g, "")) && nameOnCard && expiryDate.length === 5 && cvv.length === 3) { 
      tg.MainButton.show()
      console.log('ACTIVATE tg.MainButton.show()'); 
    }
    else { tg.MainButton.hide() }
  }, [cardNumber, nameOnCard, expiryDate, cvv ])

  // SEND DATA to bot
  //// callback
  const onSendData = useCallback(()=>{
    const cardNumberNoSpaces = cardNumber.replace(/\s/g, "")
    const data = { cardNumber: cardNumberNoSpaces, nameOnCard, expiryDate, cvv }
    tg.sendData(JSON.stringify(data))
  }, [cardNumber, nameOnCard, expiryDate, cvv])
  //// send
  useEffect(() => {
    tg.onEvent('mainButtonClicked', onSendData);
    return () => {tg.offEvent('mainButtonClicked', onSendData)}
  }, [onSendData])

  // close modal window CHECK
  useEffect(() => { 
    if (cardNumber || nameOnCard || expiryDate || cvv) { tg.enableClosingConfirmation() }
    else { tg.disableClosingConfirmation() }
  }, [cardNumber, nameOnCard, expiryDate, cvv ])
 
  // CardNumber handler
  const handleCardNumberChange = (e) => {
    const value = e.target.value.replace(/\s/g, "");
    if ((value === "" || /^[0-9\b]+$/.test(value)) && value.length <= 16) {
      setCardNumber(value.replace(/(.{4})(?!$)/g, "$1 "));
    }
  };

  const lunaCheck = (cardNumber) => {
    let cardArray = cardNumber.toString().split('').map(Number)
    for (let i = cardArray.length - 2; i >= 0; i -= 2) {
      let doubledDigit = cardArray[i] * 2;
      if (doubledDigit > 9) {doubledDigit -= 9}
      cardArray[i] = doubledDigit;
    }
    let sum = cardArray.reduce((acc, curr) => acc + curr, 0);
    if (sum % 10 === 0) {return true}
    else {return false}
  }

  useEffect(() => {
    if (cardNumber.length === 19 && !lunaCheck(cardNumber.replace(/\s/g, ""))) {
      handleOpenSnackbar('Введен неверный номер', 'card-number-div-border', false)
    }
    else {
      const div = document.getElementById('card-number-div-border');
      div.classList.remove("pulsating-border");
    }
  }, [cardNumber])

  // NameOnCard handler
  const handleNameOnCardChange = (e) => {
    const value = e.target.value;
    if (value === "" || /^[a-zA-Z\s]+$/.test(value)) {
      setNameOnCard(value.toUpperCase());
    }
    else {
      handleOpenSnackbar('Только латинские буквы', 'card-holder-div-border', true)
    }
  };

  // ExpiryDate handler
  const handleExpiryDateChange = (e) => {
    let value = e.target.value.replace('/', '');
    if (value.length >= 2 && Number(value.substring(0, 2)) > 12) {
      value = '12' + value.slice(2) 
    };
    if (value.length >= 2 && Number(value.substring(0, 2)) === 0) {
      value = '01' + value.slice(2) 
    };
    if (value.length === 4 && Number(value.slice(-2)) < 23) {
      value = value.slice(0, value.length - 2) + '23'
    }
    if (value === "" || /^[0-9\b]+$/.test(value) && value.length <= 4) {
      (value.length > 2) 
        ? setExpiryDate(value.slice(0, 2) + "/" + value.slice(2))
        : setExpiryDate(value)
    }
  };

  // CVV handler
  const handleCvvChange = (e) => {
    const value = e.target.value;
    if (value === "" || /^[0-9\b]+$/.test(value) && value.length <= 3) {
      setCvv(value);
    }
  };
  
  return (
    <div className="App">

      <TelegramSnackbar 
        open={openSnackbar}
        onClose={handleCloseSnackbar}
        message={messageSnackbar}
      />

      <Paper elevation={3} sx={{ borderRadius: '25px', backgroundColor: 'var(--tg-theme-bg-color)', display: 'flex', flexDirection: 'column', mx: 3, my: 8, px: 2, py: 2 }}>
        <TelegramInput
          id='card-number'
          colorId='card-number-div-border'
          title='Card Number'
          placeholder='**** **** **** ****'
          value={cardNumber}
          onChange={handleCardNumberChange}
          icon={<CreditCardIcon sx={{ color: 'var(--tg-theme-button-color)' }}/>}
        />
        <TelegramInput
          id='card-holder'
          colorId='card-holder-div-border'
          title='Name on Card'
          placeholder='NAME SURNAME'
          value={nameOnCard}
          onChange={handleNameOnCardChange}
          icon={<PersonIcon sx={{ color: 'var(--tg-theme-button-color)' }}/>}
        />
        <Box sx={{ display: 'flex' }}>
          <TelegramInput
            id='expiration-date'
            colorId='expiration-date-div-border'
            title='Expiry Date'
            placeholder='**/**'
            value={expiryDate}
            onChange={handleExpiryDateChange}
            icon={<CalendarMonthIcon sx={{ color: 'var(--tg-theme-button-color)' }}/>}
            sx={{flexBasis: '0', flexGrow: '1', }}
          />
          <TelegramInput
            id='cvv'
            colorId='cvv-div-border'
            title='CVV'
            placeholder='***'
            value={cvv}
            onChange={handleCvvChange}
            icon={<LockIcon sx={{ color: 'var(--tg-theme-button-color)' }}/>}
            sx={{flexBasis: '0', flexGrow: '1', marginLeft: '12px'}}
          />
        </Box>
      </Paper>
    </div>
  );
}

export default App

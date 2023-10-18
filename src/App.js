import { useEffect, useState } from 'react';
import './App.css';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

const tg = window.Telegram.WebApp;

function App() {

  useEffect(() => {
    tg.ready(); 
  })

  const onClose = () => { tg.close(); }

  const [cardNumber, setCardNumber] = useState('');
  const [nameOnCard, setNameOnCard] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');

  const handleCardNumberChange = (e) => {
    const value = e.target.value;
    // Проверка на допустимые символы (только числа)
    if (/^[0-9\b]+$/.test(value)) {
      setCardNumber(value);
    }
  };

  const handleExpirationDateChange = (e) => {
    const value = e.target.value;
    // Проверка на допустимые символы (только числа)
    if (/^[0-9/]+$/.test(value)) {
      setExpiryDate(value);
    }
  };

  const handleCvvChange = (e) => {
    const value = e.target.value;
    // Проверка на допустимые символы (только числа)
    if (/^[0-9\b]+$/.test(value)) {
      setCvv(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Проверка на заполнение всех полей
    if (cardNumber && expirationDate && cvv) {
      // Добавьте здесь логику обработки отправки формы
      console.log('Данные отправлены!');
    } else {
      console.log('Пожалуйста, заполните все поля');
    }
  };



  return (
    <div className="App">

      <form onSubmit={handleSubmit}>
        <Box sx={{ display: 'flex', flexDirection: 'column', p:2 }}>
          <TextField 
            label="Card Number:"
            value={cardNumber} 
            // onChange={handleCardNumberChange} 
            InputLabelProps={{ shrink: true }} 
            sx={{ ml:1, mb: 1 }} 
          />

          <TextField 
            label="Name on Card:"
            value={nameOnCard} 
            // onChange={handleCardNumberChange}
            InputLabelProps={{ shrink: true }} 
            sx={{ ml:1, mb: 1 }} 
          />
       

          <Box>
            <TextField
              label="ExpiryDate:"
              value={expiryDate}
              // onChange={handleExpirationDateChange} 
              InputLabelProps={{ shrink: true }} 
              sx={{ ml:1, mb: 1 }} 
            />

            <TextField 
              label="cvv:"
              value={cvv}
              // onChange={handleCvvChange} 
              InputLabelProps={{ shrink: true }} 
              sx={{ ml:1, mb: 1 }} 
            />
          </Box>

        </Box>



        <button type="submit">Отправить</button>
      </form>

      <Button variant='contained' onClick={onClose}>Close</Button>
    </div>
  );
}

export default App;

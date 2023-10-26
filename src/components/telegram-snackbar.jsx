import { forwardRef } from 'react';
import { Snackbar, Slide } from '@mui/material';
import MuiAlert from '@mui/material/Alert';

export default function TelegramSnackbar(props) {

  function TransitionLeft(props) {
    return <Slide {...props} direction="right" />;
  }

  const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  return (
    <Snackbar
      open={props.open}
      autoHideDuration={1500}
      onClose={props.onClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      TransitionComponent={TransitionLeft}
    >
      <Alert onClose={props.onClose} severity="error" sx={{ width: '100%' }}>
        {props.message}
      </Alert>
    </Snackbar>
  )
}
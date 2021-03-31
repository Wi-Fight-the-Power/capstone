import React from 'react';
import Button from '@material-ui/core/Button';
import { SnackbarProvider, useSnackbar } from 'notistack';
import socket from '../socket'

function Snackbar() {

  // const handleClick = (username) => {
  //   enqueueSnackbar(`${username} Left The Game`);
  //   console.log("handleClick being called")
  // };

  // const handleClickVariant = (variant) => () => {
  //   // variant could be success, error, warning, info, or default
  //   enqueueSnackbar('This is a success message!', { variant });
  // };
  const { enqueueSnackbar } = useSnackbar();
  socket.on("playerHasLeft",(username)=>{
    enqueueSnackbar(`${username} Left The Game`);
    console.log("playerHasLeft")
  })
  return (
    <React.Fragment>
      {/* <Button onClick={handleClick}>Show snackbar</Button> */}
      {/* <Button onClick={handleClickVariant('success')}>Show success snackbar</Button> */}
    </React.Fragment>
  );
}



export default function Playernotify() {
  return (
    <SnackbarProvider maxSnack={3}>
      <Snackbar />
    </SnackbarProvider>
  );
}

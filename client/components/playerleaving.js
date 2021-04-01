import React from 'react';
import { SnackbarProvider, useSnackbar } from 'notistack';
import socket from '../socket'

function Snackbar() {
  const { enqueueSnackbar } = useSnackbar();
  socket.on("playerHasLeft",(username)=>{
    enqueueSnackbar(`${username} Left The Game`);
    console.log("playerHasLeft")
  })
  return (
    <React.Fragment>
    </React.Fragment>
  );
}

export default function Playernotify() {
  return (
    <SnackbarProvider maxSnack={5}>
      <Snackbar />
    </SnackbarProvider>
  );
}

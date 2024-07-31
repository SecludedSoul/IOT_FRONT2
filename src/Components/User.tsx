import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import UserMenu from './UserMenu';

export default function BaseContainer() {
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg">
        
        <Box display={'flex'}>
        <UserMenu />
        </Box>
     
      </Container>
    </React.Fragment>
  );
}
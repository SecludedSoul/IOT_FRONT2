import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import UserTable from './Table';
import Link from '@mui/material/Link';

export default function UserMenu() {
  return (
    <div style={{ width: '100%' }}>
    <Paper>
      <Box
        sx={{ display: 'flex', p: 1, bgcolor: 'background.paper', borderRadius: 1, m: 2 }}
      > 
        <Box sx={{ width: '100%',fontFamily: 'Monospace', fontSize: 'h6.fontSize', m: 1 }}>Users</Box>
        <Box sx={{ flexShrink: 0, fontFamily: 'Monospace', fontSize: 'h6.fontSize', m: 1 }}>
            <Link href="create">
              <Button variant="contained">Create</Button>
            </Link>
          </Box>
      </Box>
    </Paper>
    <UserTable/>
    </div>
  );
}
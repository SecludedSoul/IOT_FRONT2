import { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import { Box } from '@mui/material';
import ImageCarousel from './ImageCarousel';
import IconLabelButtons from './Button';

interface User {
  email: string;
  id: number;
  phone: string;
  description: string;
  name: string;
  address: string;
  image_url: string;
}

const carouselImages = [
  '/image/image1.png',
  '/image/image2.png',
  '/image/image3.png',
  '/image/image4.png',
];

export default function UserTable() {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<Error | null>(null);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  useEffect(() => {
    fetch("/api/users/") //ส่วนที่แก้ไข
      .then(res => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then(
        (result) => {
          setIsLoaded(true);
          setUsers(result.result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
      .catch((error) => {
        setIsLoaded(true);
        setError(error);
      });
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <TableContainer component={Paper}>
        <ImageCarousel images={carouselImages} />
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>ID</TableCell>
              <TableCell align="right" sx={{ fontWeight: 'bold' }}>Image</TableCell>
              <TableCell align="right" sx={{ fontWeight: 'bold' }}>Name</TableCell>
              <TableCell align="right" sx={{ fontWeight: 'bold' }}>Phone</TableCell>
              <TableCell align="right" sx={{ fontWeight: 'bold' }}>Email</TableCell>
              <TableCell align="right" sx={{ fontWeight: 'bold' }}>Description</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((row) => (
              <TableRow
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">{row.id}</TableCell>
                <TableCell align="right">
                  <Box display={'flex'} justifyContent={'center'}>
                    <Avatar src={row.image_url} style={{ width: '50px', height: '50px' }} />
                  </Box>
                </TableCell>
                <TableCell align="right">{row.name}</TableCell>
                <TableCell align="right">{row.phone}</TableCell>
                <TableCell align="right">{row.email}</TableCell>
                <TableCell align="right">
                  <IconLabelButtons userId={row.id} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
}

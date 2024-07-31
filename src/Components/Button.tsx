import * as React from 'react';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';
import { useNavigate } from 'react-router-dom';

interface IconLabelButtonsProps {
  userId: number;
}

export default function IconLabelButtons({ userId }: IconLabelButtonsProps) {
  const navigate = useNavigate();

  const handleShowClick = () => {
    navigate(`/users/${userId}`);
  };

  return (
    <Stack direction="row" spacing={2}>
      <Button
        color="success"
        variant="contained"
        endIcon={<SendIcon />}
        sx={{ fontSize: '0.8rem', padding: '5px 8px' }}
        onClick={handleShowClick}
      >
        SHOW
      </Button>
    </Stack>
  );
}
import * as React from 'react';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';

interface UserDetails {
    id: number;
    phone: string;
    email: string;
    description: string;
    address: string;
    name: string;
    image_url: string;
}

export default function UserDetails() {
    const { id } = useParams<{ id: string }>();
    const [user, setUser] = useState<UserDetails | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`/api/users/${id}`) // ใช้เส้นทางสัมพัทธ์เช่นเดียวกับหน้าอื่นๆ
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                setIsLoading(false); // ตั้ง isLoading เป็น false เมื่อดึงข้อมูลสำเร็จ
                setUser(data.result); // ตั้งค่า user ด้วยข้อมูลที่ได้รับจาก API
            })
            .catch(error => {
                setIsLoading(false); // ตั้ง isLoading เป็น false เมื่อเกิดข้อผิดพลาด
                setError(error.message);
            });
    }, [id]);

    const handleDelete = () => {
        fetch(`/api/users/delete/${id}`, { method: 'DELETE' })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(() => {
                alert('User deleted successfully');
                navigate('/'); // นำทางกลับไปที่หน้าหลักหลังจากลบ
            })
            .catch(error => {
                alert('Error deleting user: ' + error.message);
            });
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <React.Fragment>
            <CssBaseline />
            <Container maxWidth="sm">
                <Box my={4} textAlign="center">
                    <Avatar
                        src={user?.image_url}
                        style={{ width: '100px', height: '100px', margin: '0 auto' }}
                    />
                    <Typography variant="h4" gutterBottom>
                        {user?.name}
                    </Typography>
                    <Typography variant="body1" color="textSecondary">
                        <strong>Email:</strong> {user?.email}
                    </Typography>
                    <Typography variant="body1" color="textSecondary">
                        <strong>Phone:</strong> {user?.phone}
                    </Typography>
                    <Typography variant="body1" color="textSecondary">
                        <strong>Address:</strong> {user?.address}
                    </Typography>
                    <Typography variant="body1" color="textSecondary" paragraph>
                        <strong>Description:</strong> {user?.description}
                    </Typography>
                    <Button variant="contained" color="primary" onClick={() => window.history.back()}>
                        Back
                    </Button>
                        <Button 
                          variant="contained" 
                          color="secondary" 
                          onClick={() => navigate(`/users/update/${id}`)} 
                          style={{ marginLeft: '10px' }}>
                          Edit
                     </Button>
                    <Button variant="contained" color="error" onClick={handleDelete} style={{ marginLeft: '10px' }}>
                        Delete
                    </Button>
                </Box>
            </Container>
        </React.Fragment>
    );
}

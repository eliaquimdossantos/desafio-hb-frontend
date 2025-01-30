import { Button, Container, Typography } from '@mui/material';
import Link from 'next/link';

export default function Home() {
  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        textAlign: 'center',
      }}
    >
      <Typography variant="h4" gutterBottom>
        Bem-vindo!
      </Typography>
      <Link href="/manage/sales" passHref>
        <Button
          variant="contained"
          size="large"
          sx={{
            padding: '20px 40px',
            fontSize: '20px',
            fontWeight: 'bold',
            backgroundColor: '#0070f3',
            '&:hover': {
              backgroundColor: '#005bb5',
            },
          }}
        >
          Acesse a página de Vendas
        </Button>
      </Link>
    </Container>
  );
}

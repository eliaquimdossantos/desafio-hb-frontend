import React, { useEffect, useState } from 'react';
import { Autocomplete, TextField, Button, CircularProgress } from '@mui/material';
import axios from 'axios';

export default function CreateSale() {

  const [users, setUsers] = useState<{ id: number, name: string }[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://127.0.0.1:4000/api/v1';


  useEffect(() => {
    setLoading(true);
    axios.get(`${apiUrl}/users`)
      .then((response) => {
        setUsers(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Erro ao buscar usuários:', error);
        setLoading(false);
      });
  }, [apiUrl]);


  const handleUserSelect = (event: unknown, value: { id: number, name: string } | null) => {
    if (value) {
      setSelectedUserId(value.id);
    }
  };

  const handleSubmit = () => {
    if (selectedUserId !== null) {
      axios
        .post(`${apiUrl}/sales`, {
          customer_id: selectedUserId
        })
        .then(() => {          
          alert('Venda iniciada!')
        })
        .catch(err => {
          console.error(err)
          alert('Falha ao iniciar venda')
        })
      ;

    } else {
      alert('Nenhum usuário selecionado');
    }
  };

  return (
    <div>
      <h2>Selecione um cliente</h2><br />
      <Autocomplete
        options={users}
        getOptionLabel={(option) => option.name}
        onChange={handleUserSelect}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Nome do usuário"
            InputProps={{
              ...params.InputProps,
              endAdornment: loading ? <CircularProgress color="inherit" size={20} /> : null,
            }}
          />
        )}
      />
      <Button onClick={handleSubmit} variant="contained" sx={{ marginTop: 2 }}>
        Iniciar Venda
      </Button>
    </div>
  );
};
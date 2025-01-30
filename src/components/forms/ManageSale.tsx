import React, { useEffect, useState } from 'react';
import { Autocomplete, TextField, Button, CircularProgress, InputAdornment, List, ListItem, ListItemText } from '@mui/material';
import axios from 'axios';

interface Product {
  id: number;
  name: string;
  price: number;
}

interface SalesManagementWithProps {
  saleId: string
}

const ManageSale: React.FC<SalesManagementWithProps> =  ({ saleId }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);
  const [selectedQuantity, setSelectedQuantity] = useState<number>(1);
  const [selectedProducts, setSelectedProducts] = useState<{ productId: number; quantity: number }[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://127.0.0.1:4000/api/v1';

  useEffect(() => {
    setLoading(true);
    axios.get(`${apiUrl}/products`)
      .then((response) => {
        setProducts(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Erro ao buscar produtos:', error);
        setLoading(false);
      });
  }, [apiUrl]);


  const handleProductSelect = (event: unknown, value: Product | null) => {
    if (value) {
      setSelectedProductId(value.id);
    }
  };

  const handleAddProduct = () => {
    if (selectedProductId !== null && selectedQuantity > 0) {
      setSelectedProducts((prev) => {
        const productIndex = prev.findIndex(item => item.productId === selectedProductId);
        if (productIndex > -1) {
          const updatedProducts = [...prev];
          updatedProducts[productIndex] = { productId: selectedProductId, quantity: selectedQuantity };
          return updatedProducts;
        }
        return [...prev, { productId: selectedProductId, quantity: selectedQuantity }];
      });
      setSelectedProductId(null);
      setSelectedQuantity(1);
    } else {
      alert('Selecione um produto e quantidade');
    }
  };

  const handleSubmit = () => {
    if (selectedProducts.length > 0) {
      for (const product of selectedProducts) {
        axios
          .post(`${apiUrl}/sales-products`, {
            sale_id: saleId,
            product_id: product.productId,
            quantity: product.quantity,
          })
          .then(() => {
            alert('Venda Salva!');
          })
          .catch(err => {
            console.error(err);
            alert('Falha ao salvar venda.');
          });
      }
    } else {
      alert('Você precisa adicionar algum produto');
    }
  };

  return (
    <div>
      <h3>Escolha o produto</h3>
      <Autocomplete
        options={products}
        sx={{ mb: 1 }}
        getOptionLabel={(option) => `${option.name} | R$ ${Number(option.price).toFixed(2)}`}
        onChange={handleProductSelect}
        value={products.find((product) => product.id === selectedProductId) || null}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Produto"
            InputProps={{
              ...params.InputProps,
              endAdornment: loading ? <CircularProgress color="inherit" size={20} /> : null,
            }}
          />
        )}
      />

      <TextField
        label="Quantidade"
        type="number"
        value={selectedQuantity}
        onChange={(e) => setSelectedQuantity(Number(e.target.value))}
        InputProps={{
          startAdornment: <InputAdornment position="start">Informe a quantidade</InputAdornment>,
        }}
        fullWidth
      />

      <Button onClick={handleAddProduct} variant="contained" sx={{ marginTop: 1, marginBottom: 3 }}>
        Adicionar Produto
      </Button>

      <h3>Produtos Selecionados</h3>
      <List>
        {selectedProducts.map((product) => {
          const productData = products.find((p) => p.id === product.productId);
          return (
            <ListItem key={product.productId}>
              <ListItemText
                primary={`${productData?.name} - R$ ${Number(productData?.price).toFixed(2)}`}
                secondary={`Quantidade: ${product.quantity}`}
              />
            </ListItem>
          );
        })}
      </List>

      <Button onClick={handleSubmit} variant="contained" sx={{ marginTop: 2 }}>
        Salvar Venda
      </Button>
    </div>
  );
};

export default ManageSale
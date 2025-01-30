'use client';

import React, { useEffect, useState } from 'react';
import { Grid2, Button } from '@mui/material';
import { Sale } from '@/types/Sale';
import axios from 'axios';
import SaleCard from './SaleCard';
import { Add } from '@mui/icons-material';
import Dialog from '../ui/Dialog';
import CreateSale from '../forms/CreateSale';
import { DialogAction } from '../../enums/DialogAction';
import {SalesProducts} from '@/types/SalesProducts'
import ManageSale from '../forms/ManageSale';

export default function SalesManagement() {
  const [sales, setSales] = useState<Sale[]>([]);
  const [saleId, setSaleId] = useState('')
  const [dialogAction, setDialogAction] = useState<DialogAction | string>('');
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://127.0.0.1:4000/api/v1';

  const handleShowModal = (action: string = '', saleId: string) => {
    setSaleId(saleId)
    setDialogAction(action);
    setShowDialog(!showDialog);
  };

  const RenderDialog = () => {
    switch (dialogAction) {
      case DialogAction.CREATE:
        return (
          <Dialog title="Nova Venda" open={showDialog} onClose={handleShowModal}>
            <CreateSale />
          </Dialog>
        )
      case DialogAction.MANAGE:
        return (
          <Dialog title="Gerenciar Venda" open={showDialog} onClose={handleShowModal}>
            <ManageSale saleId={saleId} />
          </Dialog>
        )
      default:        
        return <></>;
    }
  };

  useEffect(() => {
    axios.get(`${apiUrl}/sales`).then((res) => {
      const salesData = res.data;

      axios.get(`${apiUrl}/sales-products`).then((res) => {
        const salesProductsData = res.data;

        // Para cada venda em `salesData`, somamos o total_price dos produtos relacionados
        const updatedSales = salesData.map((sale: Sale) => {
          // Filtra os produtos que correspondem ao sale_id
          const relatedProducts = salesProductsData.filter(
            (saleProduct: SalesProducts) => saleProduct.sale_id === sale.id
          );

          // Soma os total_price dos produtos relacionados
          const totalPriceSum = relatedProducts.reduce(
            (acc: number, saleProduct: SalesProducts) => acc + saleProduct.total_price,
            0
          );

          // Retorna a venda com o novo total_price
          return { ...sale, total_price: totalPriceSum };
        });

        setSales(updatedSales);
      });
    });
  }, [apiUrl]);

  return (
    <>
      <Grid2 container direction="column" spacing={3} sx={{ padding: 3 }}>
        <Grid2>
          <Button
            startIcon={<Add />}
            variant="contained"
            color="primary"
            onClick={() => handleShowModal(DialogAction.CREATE, '')}
          >
            Nova Venda
          </Button>
        </Grid2>

        {/* Cards com informações de vendas */}
        <Grid2 container minWidth={'590px'}>
          {sales.map((sale: Sale) => (
            <Grid2 size="auto" key={sale.id}>
              <SaleCard
                saleId={sale.id}
                saleDate={sale.created_at}
                saleStatus={sale.status}
                customer={sale.users?.name}
                totalPrice={sale.total_price}
                handleShowModal={handleShowModal}
              />
            </Grid2>
          ))}
        </Grid2>
      </Grid2>

      <RenderDialog />
    </>
  );
}

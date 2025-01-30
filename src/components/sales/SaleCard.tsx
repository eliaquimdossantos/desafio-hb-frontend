import { Box, Card, CardContent, Chip, IconButton, Typography } from '@mui/material';
import { SaleStatus } from '@/enums/SaleStatus';
import { Check, Delete, Edit } from '@mui/icons-material';
import { DialogAction } from '../../enums/DialogAction';

interface SaleCardProps {
  saleId?: string;
  saleDate?: string;
  saleStatus?: string;
  customer?: string;
  totalPrice?: string | number;
  handleShowModal: (dialogAction: string, saleId: string) => void;
}

export default function SaleCard({ saleId = '', saleDate, saleStatus, customer, totalPrice, handleShowModal }: SaleCardProps) {

  const getColor = (saleStatus: string) => {
    switch (saleStatus) {
      case SaleStatus.OPEN:
        return 'warning';  // Amarelo
      case SaleStatus.COMPLETED:
        return 'success';  // Verde
      case SaleStatus.CANCELED:
        return 'error';    // Vermelho
      default:
        return 'default';  // Cinza
    }
  };

  const translateStatus = (saleStatus?: string): string => {
    switch (saleStatus) {
      case SaleStatus.OPEN:
        return 'aberta';
      case SaleStatus.COMPLETED:
        return 'concluída';
      case SaleStatus.CANCELED:
        return 'cancelada';
      default:
        return 'aberta';
    }
  };

  return (
    <Card elevation={4} sx={{ minWidth: '20em', position: 'relative' }}>
      <CardContent>
        <Box display="flex" justifyContent="end" alignItems="end">
          <Chip size="small" color={getColor((saleStatus) || 'open')} label={translateStatus(saleStatus)?.toUpperCase()} />
        </Box>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box>
            <Typography sx={{ fontSize: '0.7em' }}>
              ID: {saleId ?? 'ID não informado'}
            </Typography>
            <Typography color="text.primary">
              <strong>Data:</strong> {saleDate ? new Date(saleDate).toLocaleDateString() : 'Sem informação'}
            </Typography>
            <Typography color="text.primary">
              <strong>Cliente:</strong> {customer || 'Não Identificado'}
            </Typography>
            <Typography variant="body1">
              <strong>Valor Total:</strong> R$ {totalPrice ? Number(totalPrice).toFixed(2) : '- -'}
            </Typography>
          </Box>
        </Box>
      </CardContent>
      <Box display="flex" justifyContent="end" alignItems="end">
        <IconButton
          onClick={() => handleShowModal(DialogAction.MANAGE, saleId)}
          sx={{
            position: 'relative',
            bottom: '1rem',

          }}
        >
          <Edit />
        </IconButton>
        <IconButton
          disabled        
          onClick={() => handleShowModal(DialogAction.MANAGE, saleId)}
          sx={{
            position: 'relative',
            bottom: '1rem',

          }}
        >
          <Delete />
        </IconButton>
        <IconButton
          disabled          
          onClick={() => {}}
          sx={{
            position: 'relative',
            bottom: '1rem',

          }}
        >
          <Check />
        </IconButton>
      </Box>
    </Card>
  );
}

import React, { FC, ReactNode } from 'react';
import {
  Box,
  Card,
  CardContent,
  Grid2
} from '@mui/material';

interface CardWideProps {
  header: ReactNode;
  details: ReactNode;
  actions: ReactNode;
}

const CardWide: FC<CardWideProps> = ({ header, details, actions }) => {
  return (
    <Card elevation={8} sx={{ height: '100%' }}>
      <CardContent sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
        <Grid2 container spacing={2}>
          {header}
        </Grid2>
        <Box marginTop="auto">
          <Grid2 container spacing={1} marginTop={1}>
            {details}
          </Grid2>
          <Grid2 container spacing={1} sx={{ justifyContent: 'end' }}>
            {actions}
          </Grid2>
        </Box>
      </CardContent>
    </Card>
  );
};

export default CardWide;

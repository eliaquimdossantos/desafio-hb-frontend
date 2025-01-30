import { Card, CardContent, Typography } from '@mui/material';
import { ReactNode } from 'react';

type DashboardCardProps = {
  title: string;
  children: ReactNode;
};

export default function DashboardCard({ title, children }: DashboardCardProps) {
  return (
    <Card elevation={4}>
      <CardContent style={{ textAlign: 'center' }}>
        <Typography variant="h6" component="div" fontWeight={600}>
          {title}
        </Typography>
        <br />
        {children}
      </CardContent>
    </Card>
  );
}

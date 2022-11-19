import { CardActionArea, CardContent, Typography, Card as MuiCard } from '@mui/material';
import { MouseEventHandler } from 'react';

interface CardProps {
  title: string;
  description?: string;
  onClick?: MouseEventHandler;
}

export const Card = ({ title, description, onClick }: CardProps) => {
  return (
    <MuiCard>
      <CardActionArea onClick={onClick} sx={{ height: '100%' }}>
        <CardContent sx={{ height: '100%' }}>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </MuiCard>
  );
};


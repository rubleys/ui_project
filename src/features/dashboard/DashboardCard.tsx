import { Card, CardContent, Typography, CardActionArea, CardMedia } from '@mui/material';

interface DashboardCardProps {
  title: string;
  description: string;
  image: string;
  onClick: () => void;
}

export default function DashboardCard({
  title,
  description,
  image,
  onClick,
}: DashboardCardProps) {
  return (
    <Card sx={{ height: '100%', borderRadius: 5 }}>
      <CardActionArea onClick={onClick}>
        <CardMedia
          component="img"
          height="240"
          image={image}
          alt={title}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
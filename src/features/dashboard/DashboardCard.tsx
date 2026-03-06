import { Card, CardContent, Typography, Button, Box } from '@mui/material';

interface DashboardCardProps {
  title: string;
  description: string;
  buttonText: string;
  onClick: () => void;
}

export default function DashboardCard({
  title,
  description,
  buttonText,
  onClick,
}: DashboardCardProps) {
  return (
    <Card sx={{ padding: 2, borderRadius: 2 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          {title}
        </Typography>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {description}
        </Typography>

        <Box>
          <Button variant="text" onClick={onClick}>
            {buttonText}
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}
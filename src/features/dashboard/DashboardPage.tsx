import { Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import DashboardCard from './DashboardCard';

export default function DashboardPage() {
  const navigate = useNavigate();

  return (
    <Grid container spacing={3} padding={3}>
      <Grid item xs={12} sm={6} md={4}>
        <DashboardCard
          title="Episodes"
          description="Check the complete list of episodes, view details and characters."
          buttonText="Go to Episodes"
          onClick={() => navigate('/episodes')}
        />
      </Grid>

      {/*más cards en el futuro */}
    </Grid>
  );
}
import { Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import DashboardCard from './DashboardCard';

export default function DashboardPage() {
  const navigate = useNavigate();

  return (
    <Grid container spacing={2} padding={3} sx={{ justifyContent: 'evenly' }}>
      <Grid item xs={12} sm={6} md={4}>
        <DashboardCard
          title="Episodes"
          description="Check the complete list of episodes, view details and characters."
          image="/assets/cardImage.jpg"
          onClick={() => navigate('/episodes')}
        />
      </Grid>
      {/* Just for testing. Future cards for Characters, Locations, Favorites, Stats, etc. 
      <Grid item xs={12} sm={6} md={4}>
        <DashboardCard
          title="Characters"
          description="Explore all characters from the Rick and Morty universe."
          image="/assets/cardImage.jpg"
          onClick={() => alert('Characters page coming soon!')}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <DashboardCard
          title="Locations"
          description="Discover various locations across dimensions."
          image="/assets/cardImage.jpg"
          onClick={() => alert('Locations page coming soon!')}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <DashboardCard
          title="Favorites"
          description="View your favorite episodes and characters."
          image="/assets/cardImage.jpg"
          onClick={() => alert('Favorites page coming soon!')}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <DashboardCard
          title="Statistics"
          description="See stats and insights from the data."
          image="/assets/cardImage.jpg"
          onClick={() => alert('Stats page coming soon!')}
        />
      </Grid>
      */}
    </Grid>
  );
}
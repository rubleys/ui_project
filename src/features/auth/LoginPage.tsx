import { useState, type ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import type { RootState } from '../../app/store';
import { loginStart, loginSuccess, loginFailure, clearError } from './authSlice';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error } = useSelector((state: RootState) => state.auth);
  
  const [showPassword, setShowPassword] = useState(false);

  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Invalid email format.')
      .required('Email is required.'),
    password: Yup.string()
      .required('Password is required.')
      .matches(/[A-Z]/, 'Must contain an uppercase letter.')
      .matches(/[a-z]/, 'Must contain a lowercase letter.')
      .matches(/\d/, 'Must contain a number.')
      .matches(/[^A-Za-z0-9]/, 'Must contain a special character.')
      .min(12, 'Password must be at least 12 characters long.'),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: (values, { setSubmitting }) => {
      dispatch(clearError());
      dispatch(loginStart());

      setTimeout(() => {
        if (values.email === 'admin@test.com' && values.password === 'Password123!') {
          dispatch(
            loginSuccess({
              id: '1',
              email: values.email,
              name: 'Admin User',
            }),
          );
          navigate('/');
        } else {
          dispatch(loginFailure('Invalid credentials. Try: admin@test.com / Password123!'));
        }
        setSubmitting(false);
      }, 1000);
    },
  });

  const handlePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleFieldChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (error) {
      dispatch(clearError());
    }
    formik.handleChange(event);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'background.default',
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 4,
          width: '100%',
          maxWidth: 400,
          mx: 2,
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Sign In
        </Typography>
        
        <Typography variant="body2" color="text.secondary" align="center" sx={{ mb: 3 }}>
          Enter your credentials to access
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }} onClose={() => dispatch(clearError())}>
            {error}
          </Alert>
        )}

        <Box component="form" noValidate onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            id="email"
            name="email"
            label="Email"
            type="email"
            value={formik.values.email}
            onChange={handleFieldChange}
            onBlur={formik.handleBlur}
            margin="normal"
            autoComplete="email"
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />

          <TextField
            fullWidth
            id="password"
            name="password"
            label="Password"
            type={showPassword ? 'text' : 'password'}
            value={formik.values.password}
            onChange={handleFieldChange}
            onBlur={formik.handleBlur}
            margin="normal"
            autoComplete="current-password"
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                    onClick={handlePasswordVisibility}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Button
            fullWidth
            type="submit"
            variant="contained"
            size="large"
            disabled={isLoading || formik.isSubmitting}
            sx={{ mt: 3 }}
          >
            {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Sign In'}
          </Button>
        </Box>

        <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 2 }}>
          Test Credentials: admin@test.com / Password123!
        </Typography>
      </Paper>
    </Box>
  );
}

export default LoginPage;
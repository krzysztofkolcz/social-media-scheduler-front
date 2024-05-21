import { Outlet } from "react-router-dom"
import CssBaseline from '@mui/material/CssBaseline';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Technicarium
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default function LayoutNotAuthorized() {

  return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
            <Outlet />
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
  );
}

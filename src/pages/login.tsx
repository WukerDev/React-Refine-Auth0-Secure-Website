import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import { useTranslate } from "@refinedev/core";
import { ThemedTitleV2 } from "@refinedev/mui";
import { useAuth0 } from "@auth0/auth0-react";

import BuildIcon from '@mui/icons-material/Web';

export const Login: React.FC = () => {
  const { loginWithRedirect } = useAuth0();

  const t = useTranslate();

  return (
    <Container
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        display="flex"
        gap="36px"
        justifyContent="center"
        flexDirection="column"
      >
        <ThemedTitleV2
          collapsed={false}
          wrapperStyles={{
            fontSize: "22px",
            justifyContent: "center",
          }}
          text="Projekt Systemu"
          icon={<BuildIcon />}
        />
        <Button
          style={{ width: "240px" }}
          size="large"
          variant="contained"
          onClick={() => loginWithRedirect({                      appState: {
            returnTo: window.location.pathname
          }})}
        >
          {t("pages.login.signin", "Sign in")}
        </Button>
      </Box>
    </Container>
  );
};

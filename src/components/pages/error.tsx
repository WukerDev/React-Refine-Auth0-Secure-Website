import React, { useEffect, useState } from "react";
import {
  useGo,
  useResource,
  useRouterType,
  useNavigation,
  useTranslate,
} from "@refinedev/core";
import Info from "@mui/icons-material/Info";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";

export const ErrorComponent: React.FC = () => {
  const [errorMessage, setErrorMessage] = useState<string>();
  const { push } = useNavigation();
  const go = useGo();
  const routerType = useRouterType();

  const { resource, action } = useResource();

  const translate = useTranslate();

  useEffect(() => {
    if (resource && action) {
      setErrorMessage(
        translate(
          "pages.error.info",
          {
            action,
            resource: resource?.name,
          },
          `You may have forgotten to add the "${action}" component to "${resource?.name}" resource.`
        )
      );
    }
  }, [action, resource]);

  return (
    <Grid display="flex" justifyContent="center" alignItems="center" mt={20}>
      <Grid container direction="column" display="flex" alignItems="center">
        <Typography variant="h1">404</Typography>
        <Stack direction="row" spacing="2">
          <Typography>
            {translate(
              "pages.error.404",
              "Sorry, the page you visited does not exist."
            )}
          </Typography>

          {errorMessage && (
            <Tooltip title={errorMessage}>
              <Info data-testid="error-component-tooltip" />
            </Tooltip>
          )}
        </Stack>
        <Button
          onClick={() => {
            if (routerType === "legacy") {
              push("/");
            } else {
              go({ to: "/" });
            }
          }}
        >
          {translate("pages.error.backHome", "Back Home")}
        </Button>
      </Grid>
    </Grid>
  );
};

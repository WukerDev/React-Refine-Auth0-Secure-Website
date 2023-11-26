import {
  AuthBindings,
  Authenticated,
  Refine,
} from "@refinedev/core";
import { DevtoolsProvider } from "@refinedev/devtools";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";
import BuildIcon from '@mui/icons-material/Web';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import SettingsIcon from '@mui/icons-material/Settings';
import {
  ErrorComponent,
  notificationProvider,
  RefineSnackbarProvider,
  ThemedLayoutV2,
  ThemedTitleV2,
} from "@refinedev/mui";
import PeopleIcon from '@mui/icons-material/People';

import HomeIcon from '@mui/icons-material/Home';
import { useAuth0 } from "@auth0/auth0-react";
import CssBaseline from "@mui/material/CssBaseline";
import GlobalStyles from "@mui/material/GlobalStyles";
import routerBindings, {
  CatchAllNavigate,
  DocumentTitleHandler,
  NavigateToResource,
  UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";
import dataProvider from "@refinedev/simple-rest";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { BrowserRouter, Outlet, Route, Routes, Navigate } from "react-router-dom";
import { AppIcon } from "./components/app-icon";
import { Header } from "./components/header";
import { ColorModeContextProvider } from "./contexts/color-mode";
import { Login } from "./pages/login";
import { DashboardPage } from "./pages/dashboards";
import { UsersPage } from "./pages/users";
import { ProfilePage } from "./pages/profile";
import { OptionsPage } from "./pages/options";
function App() {
  const { isLoading, user, logout, getIdTokenClaims } = useAuth0();
  const { t, i18n } = useTranslation();

  if (isLoading) {
    return <span>loading...</span>;
  }

  const authProvider: AuthBindings = {
    login: async () => {
      return {
        success: true,
      };
    },
    logout: async () => {
      logout({ returnTo: window.location.origin });
      return {
        success: true,
      };
    },
    onError: async (error) => {
      console.error(error);
      return { error };
    },
    check: async () => {
      try {
        const token = await getIdTokenClaims();
        if (token) {
          axios.defaults.headers.common = {
            Authorization: `Bearer ${token.__raw}`,
          };
          return {
            authenticated: true,
          };
        } else {
          return {
            authenticated: false,
            error: {
              message: "Check failed",
              name: "Token not found",
            },
            redirectTo: "/login",
            logout: true,
          };
        }
      } catch (error: any) {
        return {
          authenticated: false,
          error: new Error(error),
          redirectTo: "/login",
          logout: true,
        };
      }
    },
    getPermissions: async () => null,
    getIdentity: async () => {
      if (user) {
        return {
          ...user,
          avatar: user.picture,
        };
      }
      return null;
    },
  };

  const i18nProvider = {
    translate: (key: string, params: object) => t(key, params),
    changeLocale: (lang: string) => i18n.changeLanguage(lang),
    getLocale: () => i18n.language,
  };

  return (
    <BrowserRouter>
      <RefineKbarProvider>
        <ColorModeContextProvider>
          <CssBaseline />
          <GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />
          <RefineSnackbarProvider>
            <DevtoolsProvider>
              
              <Refine
                dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
                notificationProvider={notificationProvider}
                authProvider={authProvider}
                i18nProvider={i18nProvider}
                routerProvider={routerBindings}
                resources={[{
                  name: "dashboard",
                  list: "/dashboard",
                  meta: {
                    label: "Panel Główny",
                    icon: <HomeIcon />,
                  },
                }, {
                  name: "users",
                  list: "/users",
                  meta: {
                    label: "Użytkownicy",
                    icon: <PeopleIcon />,
                  },
                },
                {
                  name: "profile",
                  list: "/profile",
                  meta: {
                    label: "Profil",
                    icon: <ManageAccountsIcon />,
                  },
                },
                {
                  name: "options",
                  list: "/options",
                  meta: {
                    label: "Opcje",
                    icon: <SettingsIcon />,
                  },
                }
               ]}
                options={{
                  syncWithLocation: true,
                  warnWhenUnsavedChanges: true,
                  projectId: "M7gQpU-aUKJEe-PmZy7Y",
                }}
              >
                <Routes>
                  <Route
                    element={
                      <Authenticated
                        key="authenticated-inner"
                        fallback={<CatchAllNavigate to="/login" />}
                      >
                        <ThemedLayoutV2
                          Header={() => <Header sticky />}
                          Title={({ collapsed }) => (
                            <ThemedTitleV2
                              collapsed={collapsed}
                              text="Projekt Systemu"
                              icon={<BuildIcon />}
                            />
                          )}
                        >
                          <Outlet />
                        </ThemedLayoutV2>
                      </Authenticated>
                    }
                  >
                    <Route
                      index element={<NavigateToResource resource="dashboard" />}
                    />
                    <Route path="/dashboard" element={<DashboardPage />} />
                    <Route path="*" element={<ErrorComponent />} />
                    <Route path="/users" element={<UsersPage />} />
                    <Route path="/profile" element={<ProfilePage />} />
                    <Route path="/options" element={<OptionsPage />} />
                  </Route>
                  <Route
                    element={
                      <Authenticated
                        key="authenticated-outer"
                        fallback={<Outlet />}
                      >
                        <NavigateToResource />
                      </Authenticated>
                    }
                  >
                    <Route path="/login" element={<Login />} />
                  </Route>
                </Routes>

                <RefineKbar />
                <UnsavedChangesNotifier />
                <DocumentTitleHandler />
              </Refine>
            </DevtoolsProvider>
          </RefineSnackbarProvider>
        </ColorModeContextProvider>
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;

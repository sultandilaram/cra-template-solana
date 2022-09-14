import React from 'react';
import useLocalStorage from "./useLocalStorage";

export default function useAuth() {

  const [authToken, setAuthToken] = useLocalStorage<string | null>('auth_token', null);

  const isAuth = React.useMemo(() => authToken === null ? true : false, [authToken]);

  const login = React.useCallback(async () => {
    setAuthToken('secret_token')
  }, [setAuthToken]);

  const logout = React.useCallback(async () => {
    setAuthToken(null)
  }, [setAuthToken]);

  return {
    authToken,
    isAuth,
    login,
    logout,
  }
}

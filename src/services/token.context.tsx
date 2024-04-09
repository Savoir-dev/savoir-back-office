import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react'
import AxiosService from './api'

const SavoirTokenContext = createContext<{
  setToken: (token: string) => void
  token: string | null
}>({
  token: null,
  setToken: () => {},
})

export const TokenProvider = (props: PropsWithChildren<object>) => {
  const [token, setTokenState] = useState<string | null>(null)
  const setToken = (token: string) => {
    setTokenState(token)
  }
  useEffect(() => {
    AxiosService.updateToken(token)
  }, [token])

  return (
    <SavoirTokenContext.Provider value={{ setToken, token }}>
      {props.children}
    </SavoirTokenContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useSavoirToken = () => useContext(SavoirTokenContext)

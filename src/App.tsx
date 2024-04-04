import { BrowserRouter } from 'react-router-dom'
import { Navbar } from './navigation/navbar'
import { AppRouter } from './navigation/router'
import styled from 'styled-components'
import { QueryClient, QueryClientProvider } from 'react-query'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      retry: (failureCount) => {
        return failureCount < 3
      },
      refetchOnWindowFocus: true,
    },
    mutations: {
      onError: () => {},
      onSuccess: () => {},
      onSettled: () => {},
      retry: (failureCount) => {
        return failureCount < 2
      },
    },
  },
})

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Navbar />
        <AppWrapperStyled>
          <AppRouter />
        </AppWrapperStyled>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

const AppWrapperStyled = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  margin-left: 200px;
`

export default App

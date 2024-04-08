import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { QueryClient, QueryClientProvider } from "react-query";

import { Navbar } from "./navigation/navbar";
import { AppRouter } from "./navigation/router";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      retry: (failureCount) => {
        return failureCount < 3;
      },
      refetchOnWindowFocus: true,
    },
    mutations: {
      onError: () => {},
      onSuccess: () => {},
      onSettled: () => {},
      retry: (failureCount) => {
        return failureCount < 2;
      },
    },
  },
});

function App() {
  const [isCollapsed, setIsCollapsed] = useState(() => {
    const storedIsCollapsed = localStorage.getItem("isCollapsed");
    return storedIsCollapsed ? JSON.parse(storedIsCollapsed) : false;
  });

  const toggleSidebar = () => setIsCollapsed(!isCollapsed);

  useEffect(() => {
    localStorage.setItem("isCollapsed", JSON.stringify(isCollapsed));
  }, [isCollapsed]);

  const location = useLocation();

  const isAuthRoute = location.pathname.startsWith("/auth");

  const ContentWrapper = isAuthRoute ? React.Fragment : AppWrapperStyled;

  return (
    <QueryClientProvider client={queryClient}>
      {!isAuthRoute && (
        <Navbar isCollapsed={isCollapsed} toggleSidebar={toggleSidebar} />
      )}

      <ContentWrapper $isCollapsed={isCollapsed}>
        <AppRouter />
      </ContentWrapper>
    </QueryClientProvider>
  );
}

const AppWrapperStyled = styled.div<{ $isCollapsed: boolean }>`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  margin-left: ${(props) => (props.$isCollapsed ? "80px" : "200px")};
  transition: 0.3s ease;
`;

export default App;

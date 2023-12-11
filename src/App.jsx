import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Router from './shared/Router';
import { NavermapsProvider } from 'react-naver-maps';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 0, refetchOnWindowFocus: false } }
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <NavermapsProvider ncpClientId={process.env.REACT_APP_NAVER_MAPS_CLIENT_ID} submodules={['geocoder']}>
        <Router />
      </NavermapsProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;

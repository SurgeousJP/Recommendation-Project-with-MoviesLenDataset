import useRouteElement from './useRouteElement';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

const queryClient = new QueryClient();

function App() {
  const routeElement = useRouteElement();
  return (
    <QueryClientProvider client={queryClient}>
      <div className='text-white'>{routeElement}</div> <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;

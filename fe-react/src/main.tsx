import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import 'react-tooltip/dist/react-tooltip.css';
import { Tooltip } from 'react-tooltip';
const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
    <Tooltip style={{ backgroundColor: 'rgb(55, 65, 81)' }} id='my-tooltip' />
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
);

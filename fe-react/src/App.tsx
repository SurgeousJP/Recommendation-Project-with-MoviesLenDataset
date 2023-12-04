import { ToastContainer } from 'react-toastify';
import ScrollToTop from './helpers/ScrollToTop';
import useRouteElement from './useRouteElement';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const routeElement = useRouteElement();
  return (
    <div className='text-white'>
      <ScrollToTop />
      {routeElement}
      <ToastContainer />
    </div>
  );
}

export default App;

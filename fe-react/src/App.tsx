import ScrollToTop from './helpers/ScrollToTop';
import useRouteElement from './useRouteElement';

function App() {
  const routeElement = useRouteElement();
  return (
    <div className='text-white'>
      <ScrollToTop />
      {routeElement}
    </div>
  );
}

export default App;

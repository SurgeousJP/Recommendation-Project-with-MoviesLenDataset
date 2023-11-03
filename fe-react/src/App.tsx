import useRouteElement from './useRouteElement';
function App() {
  const routeElement = useRouteElement();
  return <div className='text-white'>{routeElement}</div>;
}

export default App;

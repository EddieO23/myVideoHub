import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import { Toaster } from 'sonner';


import { router } from './router';
import { store } from './reducers/store';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const App = () => {
  return (
    <>
      <Provider store={store}>
        <Toaster
          position='top-right'
          richColors
          closeButton
        />
        <RouterProvider router={router} />
      </Provider>
    </>
  );
};

export default App;

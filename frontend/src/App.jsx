import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import { Toaster } from 'sonner';

import { router } from './router';
import { store } from './reducers/store';

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

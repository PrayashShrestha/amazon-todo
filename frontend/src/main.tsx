import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store/store';
import App from './App';

const console=(function(_:any){
  return {
      log: function(_:string){
          // override
      },
      info: function (_:string) {
           // override
      },
      warn: function (_:string) {
           // override
      },
      error: function (_:string) {
           // override
      }
  };
}((window as any).console));

//Then redefine the old console
if(import.meta.env.STAGE!=='development'){
  (window as any).console = console;
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

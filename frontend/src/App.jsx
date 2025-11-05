import React from "react";
import { Provider } from "react-redux";
import AppRouter from "./routes/Router.jsx";
import store from "./redux/store";
import ThemeProvider from "./theme/ThemeProvider";

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <AppRouter />
      </ThemeProvider>
    </Provider>
  );
}

export default App;

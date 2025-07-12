import ResponsiveDrawer from "./scenes/global/ResponsiveDrawer";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "@emotion/react";
import theme from "./theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <div className="App">
          <ResponsiveDrawer />
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;

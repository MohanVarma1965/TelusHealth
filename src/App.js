import "./App.css";
import ProvidersList from "./ProvidersList";
import ProviderDetails from "./ProviderDetails";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "./theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<ProvidersList />} />
          <Route path="/provider/:id" element={<ProviderDetails />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;

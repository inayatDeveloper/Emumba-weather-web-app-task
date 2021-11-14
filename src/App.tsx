import './App.css';
import { Header } from './components/header';
import Search from './components/search';
import Forecast from "./components/forecast";
import { Provider } from "react-redux";
import Store from "./store";

function App() {

  return (
    <Provider store={Store}>
      <div className="">
        <Header />
        <Search />
        <Forecast />
      </div>
    </Provider>
  );
}

export default App;

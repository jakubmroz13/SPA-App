import { useState, createContext } from 'react';
import './App.scss';
import Filtering from "./components/Filtering";
import TableComponent from "./components/TableComponent";
import Pagination from "./components/Pagination";
import { useParams } from 'react-router-dom'

interface AppContextInterface {
  appCtx: {
    id: number;
    per_page: number;
    page: number;
    total: number;
  },
  setAppCtx: React.Dispatch<React.SetStateAction<{
    id: number;
    per_page: number;
    page: number;
    total: number;
  }>>
}

export const AppCtx = createContext<AppContextInterface | null>(null);

function App() {
  const { params } = useParams();

  let id = '0', per_page = '5', page = '1';

  if (params) {
    [id, per_page, page] = params.split('-');
  }

  const defaultAppCtx = {
    id: Number(id),
    per_page: Number(per_page),
    page: Number(page),
    total: 12,
  }

  const [appCtx, setAppCtx] = useState(defaultAppCtx);

  return (
    <div className="App">
      <h3>SPA-App</h3>
      <AppCtx.Provider value={{ appCtx, setAppCtx }}>
        <Filtering />
        <TableComponent />
        <Pagination />
      </AppCtx.Provider>
    </div>
  );
}

export default App;

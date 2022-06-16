import { useState, useContext, useEffect } from 'react';
import { AppCtx } from '../App';
import { Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

interface API_Model_Interface {
  id: number;
  name: string;
  year: number;
  color: string;
  pantone_value: string;
}

function TableComponent() {
  const { appCtx, setAppCtx } = useContext(AppCtx)!;
  const [data, setData] = useState<API_Model_Interface[] | null>([]);

  async function getData() {
    let URL = 'https://reqres.in/api/products/';
    setData([]);

    if (appCtx.id) {
      URL += `?id=${appCtx.id}`;
      URL += `&per_page=${appCtx.per_page}`;
    } else {
      URL += `?per_page=${appCtx.per_page}`;
    }
    URL += `&page=${appCtx.page}`;

    try {
      const response = await fetch(URL);
      if (response.ok) {
        const result = await response.json();
        if (Array.isArray(result.data)) {
          setData(result.data);
          setAppCtx((prev) => {
            return {
              ...prev,
              total: 12,
            };
          });
        } else {
          setAppCtx((prev) => {
            setData([result.data]);
            return {
              ...prev,
              total: 1,
            };
          });
        }
      } else {
        setData(null);
        throw new Error();
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getData();
  }, [appCtx.id, appCtx.per_page, appCtx.page]);

  return (
    <div className="TableComponent">
      {data && data.length > 0 ?
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Year</TableCell></TableRow>
          </TableHead>
          <TableBody>
            {data.map((e) => {
              return (
                <TableRow
                data-testid="record"
                style={{
                  backgroundColor: e.color,
                }}>
                  <TableCell>{e.id}</TableCell>
                  <TableCell>{e.name}</TableCell>
                  <TableCell>{e.year}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table> : <CircularProgress />}
      {!data && <div>No Data</div>}
    </div>
  );
}

export default TableComponent;

import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppCtx } from '../App';
import Button from '@mui/material/Button';
import { Input } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function Pagination() {
  const { appCtx, setAppCtx } = useContext(AppCtx)!;
  const [inputPage, setInputPage] = useState(appCtx.page);

  const navigate = useNavigate();

  function handleSelectPageButton() {
    let newPage = Math.max(1, Math.min(inputPage, Math.ceil(appCtx.total / appCtx.per_page)));
    setAppCtx((prev) => {
      return {
        ...prev,
        page: newPage,
      };
    });
    setInputPage(newPage);
    navigate(`../${appCtx.id}-${appCtx.per_page}-${newPage}`, { replace: true });
  }

  function handleChangePageButton(value: number) {
    let newPage = Math.max(1, Math.min(inputPage + value, Math.ceil(appCtx.total / appCtx.per_page)));
    setAppCtx((prev) => {
      return {
        ...prev,
        page: newPage,
      };
    });
    setInputPage(newPage);
    navigate(`../${appCtx.id}-${appCtx.per_page}-${newPage}`, { replace: true });
  }

  function handleSelectPerPage(value: string) {
    const perPage = Number(value);
    setAppCtx((prev) => {
      return {
        ...prev,
        per_page: perPage,
        page: 1,
      };
    });
    setInputPage(1);
    navigate(`../${appCtx.id}-${perPage}-${1}`, { replace: true });
  }

  useEffect(() => {
    setInputPage(appCtx.page);
  }, [appCtx.page]);

  return (
    <div className="Pagination">
      <label htmlFor='input-per-page'>
        <p>On page:</p>
        <select
          data-testid="select-per-page"
          value={appCtx.per_page}
          onChange={(e) => handleSelectPerPage(e.target.value)}
          style={{
            height: '100%',
            borderRadius: '4px',
            width: '4.3rem',
            padding: '5px',
          }} >
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>5</option>
          <option>8</option>
          <option>12</option>
        </select>
      </label>

      <label htmlFor='input-page'>
        <p>Page:</p>
        <Button
        data-testid="prev-btn"
        onClick={() => handleChangePageButton(-1)}
        variant="outlined">
          <ArrowBackIcon />
        </Button>
        <Button
        data-testid="next-btn"
        onClick={() => handleChangePageButton(1)}
        variant="outlined">
          <ArrowForwardIcon />
        </Button>
        <Input
          data-testid="input-page"
          id="input-page"
          value={inputPage}
          onChange={(e) => setInputPage(Number(e.target.value))}
          onKeyPress={(e) => {
            if (!/[0-9]/.test(e.key)) {
              e.preventDefault();
            }
          }}
          style={{
            width: '3rem',
            margin: '0 5px 0 20px',
          }} />
        <Button
        data-testid="go-btn"
        onClick={handleSelectPageButton}
        variant="contained">
          Go
        </Button>
      </label>
    </div>
  );
}

export default Pagination;

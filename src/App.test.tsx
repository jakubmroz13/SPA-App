import { render, screen } from '@testing-library/react';
import { fireEvent, waitFor } from '@testing-library/dom';
import App from './App';
import { BrowserRouter, Routes, Route, Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

test('rendering App', () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );

  const title = screen.getByText(/spa-app/i);
  expect(title).toBeInTheDocument();
})

test('changing Displayed data when changing ID', async () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );

  await waitFor(() => screen.getAllByTestId('record'));

  // 1-12
  const randomID = Math.floor(Math.random() * 12) + 1;
  fireEvent.change(screen.getByTestId('input-id').querySelector('input')!, { target: { value: randomID } });
  fireEvent.click(screen.getByTestId('search-btn'));

  await waitFor(() => screen.getAllByTestId('record'));
  expect(screen.getAllByTestId('record').length).toBe(1);
});

test('displaying multiple ID when setting ID to 0', async () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );

  await waitFor(() => screen.getAllByTestId('record'));

  fireEvent.change(screen.getByTestId('input-id').querySelector('input')!, { target: { value: 0 } });
  fireEvent.click(screen.getByTestId('search-btn'));

  await waitFor(() => screen.getAllByTestId('record'));
  expect(screen.getAllByTestId('record').length).toBe(5);
});

test('changing perpage changes the number of items displayed', async () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );

  await waitFor(() => screen.getAllByTestId('record'));

  const selectValues = [1, 2, 3, 5, 8, 12];
  const randomPerPageValue = selectValues[Math.floor(Math.random() * selectValues.length)];
  fireEvent.change(screen.getByTestId('select-per-page'), { target: { value: randomPerPageValue } });

  await waitFor(() => screen.getAllByTestId('record'));
  expect(screen.getAllByTestId('record').length).toBe(randomPerPageValue);
});

test('changing input-page changes displayed page', async () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );

  await waitFor(() => screen.getAllByTestId('record'));
  const startingPage = screen.getAllByTestId('record');

  fireEvent.change(screen.getByTestId('input-page').querySelector('input')!, { target: { value: 2 } });
  fireEvent.click(screen.getByTestId('go-btn'));

  await waitFor(() => screen.getAllByTestId('record'));
  const anotherPage = screen.getAllByTestId('record');

  expect(startingPage[0].textContent).not.toBe(anotherPage[0].textContent);
});

test('next-page-btn changes page and prev-page-btn returns to it', async () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );

  await waitFor(() => screen.getAllByTestId('record'));
  const startingPage = screen.getAllByTestId('record');

  fireEvent.click(screen.getByTestId('next-btn'));

  await waitFor(() => screen.getAllByTestId('record'));
  const nextPage = screen.getAllByTestId('record');

  expect(startingPage[0].textContent).not.toBe(nextPage[0].textContent);

  fireEvent.click(screen.getByTestId('prev-btn'));

  await waitFor(() => screen.getAllByTestId('record'));
  const prevPage = screen.getAllByTestId('record');

  expect(startingPage[0].textContent).toBe(prevPage[0].textContent);
});

test('taking parameters from URL', () => {
  const history = createMemoryHistory();
  history.push('/2-3-1');

  render(
    <Router location={history.location} navigator={history}>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/:params" element={<App />} />
      </Routes>
    </Router>
  );

  const id: HTMLInputElement = screen.getByTestId('input-id').querySelector('input')!;
  const perPage: HTMLInputElement = screen.getByTestId('select-per-page');
  const page: HTMLInputElement = screen.getByTestId('input-page').querySelector('input')!;

  expect(Number(id.value)).toBe(2);
  expect(Number(perPage.value)).toBe(3);
  expect(Number(page.value)).toBe(1);
});
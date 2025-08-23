import { render, screen } from '@testing-library/react';
import ImportCsvPage from '../../src/pages/products/ImportCsvPage';

test('when open the page to import csv should show the main element', () => {
  render(<ImportCsvPage />);
  expect(screen.getByRole('main')).toBeInTheDocument();
});

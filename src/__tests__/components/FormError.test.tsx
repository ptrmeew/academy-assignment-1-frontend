import React from 'react';
import { render, screen } from '@testing-library/react';

test('renders without crashing', () => {
  const { baseElement } = render(<p>Test me!</p>);
  expect(baseElement).toBeDefined();
});

test('message displays', () => {
  const { rerender } = render(<p>test1</p>);
  expect(screen.getByText('test1')).toBeInTheDocument();

  rerender(<p>test2</p>);
  expect(screen.getByText('test2')).toBeInTheDocument();
});

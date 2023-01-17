import React from 'react';
import { render, screen } from '@testing-library/react';
import { Center } from '../../ui/components/generic/Center';

test('renders without crashing', () => {
  const { baseElement } = render(<Center />);
  expect(baseElement).toBeDefined();
});

test('child is displayed and not hardcoded', () => {
  const { rerender } = render(<Center>test1</Center>);
  expect(screen.getByText('test1')).toBeInTheDocument();

  rerender(<Center>test2</Center>);
  expect(screen.getByText('test2')).toBeInTheDocument();
});

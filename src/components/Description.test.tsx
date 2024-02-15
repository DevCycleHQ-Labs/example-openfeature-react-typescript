import { render, screen } from '@testing-library/react';
import Description from './Description';
import { useStringFlagValue } from "@openfeature/react-sdk";

const mockUseStringFlagValue = jest.mocked(useStringFlagValue);

test.each([
  'default',
  'step-1',
  'step-2',
  'step-3',
])('renders description text for value "%s"', (step) => {
  mockUseStringFlagValue.mockReturnValue(step)

  render(<Description />);
  const element = screen.getByTestId('app-description');
  expect(element.textContent).toMatchSnapshot();
});

export {}

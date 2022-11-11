import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import configureStore from "redux-mock-store";

import App from '../App';

import initialState from '../containers/KanbanBoardPage/redux/initialState';
import * as TestingIds from '../data/testingIds';

test('should render an App component with nested components and store', () => {
  const mockStore = configureStore();
  const store = mockStore(initialState);
  render(<Provider store={store} ><App /></Provider>);

  expect(screen.getByTestId(TestingIds.NAVIGATION_CONTAINER)).toBeInTheDocument(); 
  expect(screen.getByTestId(TestingIds.KANBAN_BOARD_CONTAINER)).toBeInTheDocument(); 
});

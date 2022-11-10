import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from "redux-mock-store";

import * as TestingIds from '../../../data/testingIds';
import initialState from '../redux/initialState';

import KanbanBoardPage from '..';

describe("HTML UI components", () => {
    it("should render correct child components with empty state by default", () => {
        const mockStore = configureStore();
        const store = mockStore(initialState);
        render(<Provider store={store}><KanbanBoardPage /></Provider>);

        expect(screen.getByTestId(TestingIds.NAVIGATION_CONTAINER)).toBeInTheDocument(); 
        expect(screen.getByTestId(TestingIds.KANBAN_BOARD_CONTAINER)).toBeInTheDocument(); 

    });
});
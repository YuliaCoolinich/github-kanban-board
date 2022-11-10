import { Provider } from 'react-redux';
import { render, screen, fireEvent } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import configureStore from "redux-mock-store";

import initialState from '../redux/initialState';
import actionTypes from "../redux/actionTypesNames";

import KanbanBoardPage from '..';

const CORRECT_URL = 'https://github.com/facebook/react';

describe("Connecting react components with redux actions", () => {
    it('should dispatch appropriable action after the user set url', () => {
        const mockStore = configureStore();
        const store = mockStore(initialState);
        render(<Provider store={store} ><KanbanBoardPage /></Provider>);
      
        act(() => {
          fireEvent.change(screen.getByRole('textbox'), { target: { value: CORRECT_URL } });
        });
        const actions = store.getActions();

        expect(actions).toEqual([{ type:actionTypes.URL_SET, payload: { url: CORRECT_URL} }]);
      });
});

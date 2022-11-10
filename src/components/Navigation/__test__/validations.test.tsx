import { render, screen, act  } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import * as TestingIds from '../../../data/testingIds';
import { ERROR_VALIDATION_TYPES } from '../errors/errorTypes';

import Navigation, { INavigation } from '..';

const mockedComp: INavigation = {
  url: '',
  isLoading: false,
  setUrl: jest.fn(),
  loadIssues: jest.fn()
}

const CORRECT_URL = 'https://github.com/facebook/react';
const INCORRECT_URL_EMPTY_URL = '';
const INCORRECT_URL_INCORECT_DOMAIN = 'https://gitthub.com/facebook/react';
const INCORRECT_URL_EXTRA_SLASH_IN_MIDDLE = 'https://github.com/facebook//react';
const INCORRECT_URL_EXTRA_SLASH_AT_END = 'https://github.com/facebook/react/';

describe("Validation inputted url", () => {
  it("shouldn't render errors after entering an correct url", () => {
    render(<Navigation url={CORRECT_URL} isLoading={mockedComp.isLoading} setUrl={mockedComp.setUrl} loadIssues={mockedComp.loadIssues} />);

    act(() => {
      userEvent.click(screen.getByTestId(TestingIds.BUTTON_LOAD));
    });
    
    expect(screen.getByTestId(TestingIds.ERROR_SECTION)).toBeEmptyDOMElement();
    expect(mockedComp.loadIssues).toBeCalledTimes(1);
  }); 
  it("should render error after entering empty url", () => {
    render(<Navigation url={INCORRECT_URL_EMPTY_URL} isLoading={mockedComp.isLoading} setUrl={mockedComp.setUrl} loadIssues={mockedComp.loadIssues} />);

    act(() => {
      userEvent.click(screen.getByTestId(TestingIds.BUTTON_LOAD));
    });
    
    expect(screen.getByTestId(TestingIds.ERROR_SECTION)).toHaveTextContent(ERROR_VALIDATION_TYPES.EMPTY_URL);
    expect(mockedComp.loadIssues).not.toBeCalled();
  }); 
  it("should render error after entering incorrect url with incorrect domain", () => {
    render(<Navigation url={INCORRECT_URL_INCORECT_DOMAIN} isLoading={mockedComp.isLoading} setUrl={mockedComp.setUrl} loadIssues={mockedComp.loadIssues} />);

    act(() => {
      userEvent.click(screen.getByTestId(TestingIds.BUTTON_LOAD));
    });
    
    expect(screen.getByTestId(TestingIds.ERROR_SECTION)).toHaveTextContent(ERROR_VALIDATION_TYPES.INCORRECT_DOMAIN);
    expect(mockedComp.loadIssues).not.toBeCalled();
  }); 
  it("should render error after entering incorrect url with extra slash at the end", () => {
    render(<Navigation url={INCORRECT_URL_EXTRA_SLASH_AT_END} isLoading={mockedComp.isLoading} setUrl={mockedComp.setUrl} loadIssues={mockedComp.loadIssues} />);

    act(() => {
      userEvent.click(screen.getByTestId(TestingIds.BUTTON_LOAD));
    });
    
    expect(screen.getByTestId(TestingIds.ERROR_SECTION)).toHaveTextContent(ERROR_VALIDATION_TYPES.EXTRA_SLASH);
    expect(mockedComp.loadIssues).not.toBeCalled();
  });
  it("should render error after entering incorrect url with extra slash in the middle", () => {
    render(<Navigation url={INCORRECT_URL_EXTRA_SLASH_IN_MIDDLE} isLoading={mockedComp.isLoading} setUrl={mockedComp.setUrl} loadIssues={mockedComp.loadIssues} />);

    act(() => {
      userEvent.click(screen.getByTestId(TestingIds.BUTTON_LOAD));
    });
    
    expect(screen.getByTestId(TestingIds.ERROR_SECTION)).toHaveTextContent(ERROR_VALIDATION_TYPES.EXTRA_SLASH);
    expect(mockedComp.loadIssues).not.toBeCalled();
  });
});
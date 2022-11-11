import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as TestingIds from '../../../data/testingIds';
import { INPUT_PLACEHOLDER, BUTTON_CONTENT } from '../data';

import Navigation, { INavigation } from '..';
import { act } from 'react-dom/test-utils';

import { uppercaseFirstLetter } from '../services';

const mockedComp: INavigation = {
  url: '',
  isLoading: false,
  setUrl: jest.fn(),
  loadIssues: jest.fn()
}
const DOMAIN = 'https://github.com';
const FIRST_SECTION = 'facebook';
const SECOND_SECTION = 'react';
const CORRECT_URL = `${DOMAIN}/${FIRST_SECTION}/${SECOND_SECTION}`;

describe("HTML UI components", () => {
  describe("Input component", () => {
    it('should render an input component', () => {
      render(<Navigation url={mockedComp.url} isLoading={mockedComp.isLoading} setUrl={mockedComp.setUrl} loadIssues={mockedComp.loadIssues} />);
    
      expect(screen.getByTestId(TestingIds.INPUT_URL)).toBeInTheDocument(); 
    });

    it('should render an input with correct placeholder', () => {
      render(<Navigation url={mockedComp.url} isLoading={mockedComp.isLoading} setUrl={mockedComp.setUrl} loadIssues={mockedComp.loadIssues} />);

      expect(screen.getByRole('textbox')).toHaveAttribute('placeholder', INPUT_PLACEHOLDER);
    });

    it('should render an input that gets needed entered value', () => {
      const { rerender } = render(<Navigation url={mockedComp.url} isLoading={mockedComp.isLoading} setUrl={mockedComp.setUrl} loadIssues={mockedComp.loadIssues} />);

      act(() => {
        fireEvent.change(screen.getByRole('textbox'), { target: { value: CORRECT_URL } });
        userEvent.click(screen.getByTestId(TestingIds.BUTTON_LOAD));
      });
      rerender(<Navigation url={CORRECT_URL} isLoading={mockedComp.isLoading} setUrl={mockedComp.setUrl} loadIssues={mockedComp.loadIssues} />);
      
      expect(screen.getByRole('textbox')).toHaveValue(CORRECT_URL);
      expect(mockedComp.setUrl).toBeCalledTimes(1);
    });
  });

  describe("Button component", () => {
    it('should render a button component', () => {
      render(<Navigation url={mockedComp.url} isLoading={mockedComp.isLoading} setUrl={mockedComp.setUrl} loadIssues={mockedComp.loadIssues} />);
    
      expect(screen.getByTestId(TestingIds.BUTTON_LOAD)).toBeInTheDocument(); 
    });
    it('should render a button with correct text content', () => {
      render(<Navigation url={mockedComp.url} isLoading={mockedComp.isLoading} setUrl={mockedComp.setUrl} loadIssues={mockedComp.loadIssues} />);

      expect(screen.getByTestId(TestingIds.BUTTON_LOAD)).toHaveTextContent(BUTTON_CONTENT);
    });
    it('should load issues after an button is clicked', () => {
      render(<Navigation url={CORRECT_URL} isLoading={mockedComp.isLoading} setUrl={mockedComp.setUrl} loadIssues={mockedComp.loadIssues} />);

      act(() => {
        fireEvent.click(screen.getByTestId(TestingIds.BUTTON_LOAD));
      });
      
      expect(screen.getByTestId(TestingIds.BUTTON_LOAD)).toBeEnabled();
      expect(mockedComp.loadIssues).toHaveBeenCalled();
      expect(screen.getByTestId(TestingIds.ERROR_SECTION)).toBeVisible();
    });
  });
  
  describe("Breadcrumb component", () => {
    it("should render rating component after inputting an url", () => {
      render(<Navigation url={CORRECT_URL} isLoading={mockedComp.isLoading} setUrl={mockedComp.setUrl} loadIssues={mockedComp.loadIssues} />);

      act(() => {
          userEvent.click(screen.getByTestId(TestingIds.BUTTON_LOAD));
      });
      
      expect(screen.getByTestId(TestingIds.RATING_SECTION)).toBeInTheDocument();
      expect(screen.getByTestId(TestingIds.RATING_SECTION)).not.toBeNull();
    });
    it('should render a breadcrumb element with correct content in sections', () => {
      render(<Navigation url={CORRECT_URL} isLoading={mockedComp.isLoading} setUrl={mockedComp.setUrl} loadIssues={mockedComp.loadIssues} />);
      
      act(() => {
        userEvent.click(screen.getByTestId(TestingIds.BUTTON_LOAD));
      });

      const normalizedFirstSections = uppercaseFirstLetter(FIRST_SECTION);
      expect(mockedComp.loadIssues).toBeCalledTimes(1);
      expect(screen.getByTestId(TestingIds.BREADCRUMB_SECTIONS).children[0].closest('a')).toBeInTheDocument();
      expect(screen.getByTestId(TestingIds.BREADCRUMB_SECTIONS).children[0].closest('a')?.text).toEqual(normalizedFirstSections);

      const normalizedSecondSections = uppercaseFirstLetter(SECOND_SECTION);
      expect(screen.getByTestId(TestingIds.BREADCRUMB_SECTIONS).children[2].closest('a')).toBeInTheDocument();
      expect(screen.getByTestId(TestingIds.BREADCRUMB_SECTIONS).children[2].closest('a')?.text).toEqual(normalizedSecondSections);
    }); 
    it('should render a breadcrumb with valid links in sections', () => {
      render(<Navigation url={CORRECT_URL} isLoading={mockedComp.isLoading} setUrl={mockedComp.setUrl} loadIssues={mockedComp.loadIssues} />);
      
      act(() => {
        userEvent.click(screen.getByTestId(TestingIds.BUTTON_LOAD));
      });

      expect(mockedComp.loadIssues).toBeCalledTimes(1);
      expect(screen.getByTestId(TestingIds.BREADCRUMB_SECTIONS).children[0]).toHaveAttribute('href', `${DOMAIN}/${FIRST_SECTION}`);
      expect(screen.getByTestId(TestingIds.BREADCRUMB_SECTIONS).children[2]).toHaveAttribute('href', `${DOMAIN}/${FIRST_SECTION}/${SECOND_SECTION}`);
    });
  }); 
});

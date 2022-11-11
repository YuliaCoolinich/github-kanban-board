# About App

An implemented GitHub repo issues viewer as a kanban board.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## How to use
1. User can enter repo URL in the input on top of the page and press "Load". For example: *https://github.com/facebook/react* or *https://github.com/facebook/lexical*
2. App loads issues for the repo using Github API.
3. App contains 3 columns:
    ToDo (all new issues);
    In Progress (opened issues with assignee);
    Done (closed issues);
4. User is able to drag-n-drop between the columns and change the order of issues.
5. Current issue position (column and order) is stored between search and browser sessions. When the user loads issues for Repo1 -> Repo2 -> Repo1 he can see all changes he did for Repo1.
6. User is able to visit the profile of the owner of the repo and visit the repo as well by links under the input.

## Used Technologies
 - React 18 with hooks, no classes, custom hook
 - Typescript
 - UI library:
   - Semantic UI
 - State manager:
   - Redux (Redux Saga)
 - Testing:
   - React Testing Library
   - Jest
- Follow the Git workflow

## Mockups
![mockup](./public/design.png)

## Accessibility
The content is accessible to visually-impaired or blind users, that use screen readers.

## Available Scripts

In the project directory, you can run:
\

### Running the App
## `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
\
You will also see any lint errors in the console. The app informs if it gets previously saved data from storage or fetches data from GitHub API. 
Also, the app informs how many issues it receives (App can get the last newest 100 issues, according to GitHub API documentation or get all issues). 
App informs about the action type that was dispatched.
\
### Testing the App

## `npm test`
Launches the test runner in the interactive watch mode .\
There are 7 Test Suites that contain 27 tests.

## `npm run testInfo`
Launches the test runner in the interactive watch mode with information about a test coverage.

-------------------------------------------------|---------|----------|---------|---------|--------------------
File                                             | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s  
-------------------------------------------------|---------|----------|---------|---------|--------------------
All files                                        |   67.57 |    49.43 |   61.44 |   66.77 |                    
 src                                             |    8.33 |        0 |   33.33 |    8.33 |                    
  App.tsx                                        |     100 |      100 |     100 |     100 |                    
  index.tsx                                      |       0 |      100 |     100 |       0 | 10-24              
  reportWebVitals.ts                             |       0 |        0 |       0 |       0 | 3-10               
 src/api/apiServices                             |     100 |      100 |     100 |     100 | 
  apiHelper.ts                                   |     100 |      100 |     100 |     100 | 
  apiService.ts                                  |     100 |      100 |     100 |     100 | 
 src/api/apiServices/constants                   |       0 |        0 |       0 |       0 | 
  RequestMethods.ts                              |       0 |        0 |       0 |       0 | 
 src/api/apiServices/interfaces                  |       0 |        0 |       0 |       0 | 
  IRequestArgument.ts                            |       0 |        0 |       0 |       0 | 
 src/api/services                                |   58.33 |       50 |   66.66 |   58.33 | 
  issuesService.ts                               |   47.36 |       50 |      50 |   47.36 | 10-30
  repositoryService.ts                           |     100 |      100 |     100 |     100 |                    
 src/components/KanbanBoard                      |   83.33 |       50 |      50 |   83.33 | 
  index.tsx                                      |      80 |       50 |      50 |      80 | 36
  styles.ts                                      |     100 |      100 |     100 |     100 | 
 src/components/KanbanBoard/Card                 |      25 |        0 |       0 |      25 | 
  index.tsx                                      |      20 |        0 |       0 |      20 | 22-56
  styles.ts                                      |     100 |      100 |     100 |     100 | 
 src/components/KanbanBoard/Column               |   23.07 |        0 |       0 |   23.07 | 
  index.tsx                                      |   16.66 |        0 |       0 |   16.66 | 23-49
  styles.ts                                      |     100 |      100 |     100 |     100 | 
 src/components/Navigation                       |   94.33 |       75 |     100 |   93.87 | 
  data.ts                                        |     100 |      100 |     100 |     100 | 
  index.tsx                                      |   88.23 |       50 |     100 |   88.23 | 37,42
  services.ts                                    |   96.77 |    78.57 |     100 |   96.29 | 9
  styles.ts                                      |     100 |      100 |     100 |     100 | 
 src/components/Navigation/errors                |     100 |      100 |     100 |     100 | 
  ValidationError.ts                             |     100 |      100 |     100 |     100 |                    
  errorTypes.ts                                  |     100 |      100 |     100 |     100 | 
 src/components/base/Breadcrumb                  |     100 |      100 |     100 |     100 | 
  index.tsx                                      |     100 |      100 |     100 |     100 | 
  styles.ts                                      |     100 |      100 |     100 |     100 | 
 src/components/base/Button                      |     100 |       50 |     100 |     100 | 
  index.tsx                                      |     100 |       50 |     100 |     100 | 24                 
  styles.ts                                      |     100 |      100 |     100 |     100 | 
 src/components/base/Input                       |     100 |       50 |     100 |     100 | 
  index.tsx                                      |     100 |       50 |     100 |     100 | 19-37
  styles.ts                                      |     100 |      100 |     100 |     100 | 
 src/components/base/Rating                      |     100 |       50 |     100 |     100 | 
  index.tsx                                      |     100 |       50 |     100 |     100 | 13
 src/components/constants                        |     100 |      100 |     100 |     100 | 
  colors.ts                                      |     100 |      100 |     100 |     100 |                    
 src/containers/KanbanBoardPage                  |   66.66 |      100 |      50 |   64.28 | 
  index.tsx                                      |   66.66 |      100 |      50 |   64.28 | 19,22-23,27-28    
 src/containers/KanbanBoardPage/errors           |     100 |      100 |     100 |     100 | 
  ServiceError.ts                                |     100 |      100 |     100 |     100 | 
  errorTypes.ts                                  |     100 |      100 |     100 |     100 | 
 src/containers/KanbanBoardPage/hooks            |     100 |      100 |     100 |     100 | 
  useActions.ts                                  |     100 |      100 |     100 |     100 | 
  useTypedSelector.ts                            |     100 |      100 |     100 |     100 | 
 src/containers/KanbanBoardPage/redux            |   20.45 |        0 |    9.09 |   21.62 | 
  actionTypesNames.ts                            |       0 |        0 |       0 |       0 | 
  actions.ts                                     |   57.14 |      100 |   14.28 |     100 |                    
  initialState.ts                                |     100 |      100 |     100 |     100 | 
  reducer.ts                                     |       0 |        0 |       0 |       0 | 8-46
  saga.ts                                        |       0 |        0 |       0 |       0 | 15-49
 src/containers/KanbanBoardPage/redux/interfaces |       0 |        0 |       0 |       0 | 
  IKanbanBoardPageState.ts                       |       0 |        0 |       0 |       0 | 
  actionTypes.ts                                 |       0 |        0 |       0 |       0 | 
 src/containers/KanbanBoardPage/services         |   83.33 |    69.23 |      84 |      80 | 
  issueServices.ts                               |   96.82 |       90 |     100 |      96 | 73,106
  storageServices.ts                              |   26.66 |        0 |       0 |   26.66 | 8-9,14,18-24,28-32
 src/data                                        |     100 |      100 |     100 |     100 |                    
  cacheStorage.ts                                |     100 |      100 |     100 |     100 | 
  statuses.ts                                    |     100 |      100 |     100 |     100 | 
  testingIds.ts                                  |     100 |      100 |     100 |     100 | 
  types.ts                                       |     100 |      100 |     100 |     100 | 
  urls.ts                                        |     100 |      100 |     100 |     100 | 
 src/interfaces                                  |       0 |        0 |       0 |       0 | 
  IColumn.ts                                     |       0 |        0 |       0 |       0 | 
  IDraggableItem.ts                              |       0 |        0 |       0 |       0 | 
  IIssue.ts                                      |       0 |        0 |       0 |       0 |                    
  IRepository.ts                                 |       0 |        0 |       0 |       0 | 
  ISection.ts                                    |       0 |        0 |       0 |       0 | 
  IStatus.ts                                     |       0 |        0 |       0 |       0 | 
  IUser.ts                                       |       0 |        0 |       0 |       0 |
 src/redux                                       |       0 |      100 |       0 |       0 |
  rootReducer.ts                                 |       0 |      100 |     100 |       0 | 4
  rootSaga.ts                                    |       0 |      100 |       0 |       0 | 5
  store.ts                                       |       0 |      100 |       0 |       0 | 7-18
-------------------------------------------------|---------|----------|---------|---------|--------------------

import {
  render,
  screen
} from '@testing-library/react';
import {
  Route,
  Router,
  Switch
} from 'react-router-dom';
import { createMemoryHistory } from 'history';
import NotFound from './not-found';
import { AppRoute } from '../../const';
import userEvent from '@testing-library/user-event';

const history = createMemoryHistory();

describe('Component: NotFound', () => {
  it('should render correctly', () => {
    render(
      <Router history={history}>
        <NotFound />
      </Router>,
    );

    expect(screen.queryByText(/404 Page Not Found/i)).toBeInTheDocument();
    expect(screen.queryByText(/to Main Page/i)).toBeInTheDocument();
  });

  it('should redirect to "Main" when "to Main Page" clicked', () => {
    history.push('fake');
    render(
      <Router history={history}>
        <Switch>
          <Route path={AppRoute.Main} exact>
            <h1>This is Main page</h1>
          </Route>
          <Route>
            <NotFound />
          </Route>,
        </Switch>
      </Router>);

    const link = screen.getAllByRole('link')[0] as HTMLAnchorElement;

    expect(screen.queryByText(/This is Main page/i)).not.toBeInTheDocument();
    userEvent.click(link);
    expect(screen.queryByText(/This is Main page/i)).toBeInTheDocument();
  });
});

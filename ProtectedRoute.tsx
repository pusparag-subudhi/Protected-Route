import * as React from 'react';
import { Route, RouteProps } from 'react-router';
import { Warning } from './Warning';

export interface ProtectedRouteProps extends RouteProps {
  isAuthenticated: boolean;
  username?: string;
}

export class ProtectedRoute extends Route<ProtectedRouteProps> {
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  public render() {
    if (this.props.isAuthenticated) {
      return <Route {...this.props} />;
    } else {
      return (
        <Route>
          <Warning
            message={
              this.props.username
                ? 'The user ' + this.props.username + ' is not authorized to view the page!'
                : ''
            }
          />
        </Route>
      );
    }
  }
}

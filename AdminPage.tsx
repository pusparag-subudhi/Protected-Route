import React from 'react';
import { Switch, Redirect } from 'react-router-dom';
import { AdminRoutes } from './routes';
import { UsersTable } from './users/UsersTable';
import { useSelector } from 'react-redux';
import { getUserInfo } from '../global/reduxSelectors';
import { ProtectedRoute, ProtectedRouteProps } from '../../components/ProtectedRoute';
import { hasPermission } from '../global/utils';
import { Permissions } from '../global/reduxTypes';

export const AdminPage: React.FC = () => {
  const userInfo = useSelector(getUserInfo);
  const adminUserProtectedRouteProps: ProtectedRouteProps = {
    isAuthenticated:
      userInfo && userInfo.userId && hasPermission(userInfo, Permissions.AdminConsoleView)
        ? true
        : false,
    username: userInfo?.username,
  };
  
  const adminManageSubscriptionsProtectedRouteProps: ProtectedRouteProps = {
    isAuthenticated:
      userInfo &&
      userInfo.userId &&
      hasPermission(userInfo, Permissions.AdminConsoleManageSubscriptions)
        ? true
        : false,
    username: userInfo?.username,
  };
  return (
    <div>
      <Switch>
        <ProtectedRoute
          {...adminUserProtectedRouteProps}
          exact={true}
          path={AdminRoutes.USERS}
          component={UsersTable}
        />
        <ProtectedRoute
          {...adminManageSubscriptionsProtectedRouteProps}
          exact={true}
          path={AdminRoutes.MANAGESUBSCRIPTIONS}
          component={NotificationTable}
        />
        
      </Switch>
    </div>
  );
};

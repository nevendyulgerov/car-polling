import homeRoutes from './home';
import notFoundRoutes from './notFound';
import loginRoutes from './login';
import registerRoutes from './register';
import usersRoutes from './users';
import tripsRoutes from './trips';

export default [
  ...homeRoutes,
  ...notFoundRoutes,
  ...loginRoutes,
  ...registerRoutes,
  ...usersRoutes,
  ...tripsRoutes
];

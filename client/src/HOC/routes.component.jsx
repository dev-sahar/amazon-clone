import { Route } from 'react-router-dom';

import Header from '../components/header/header.component';
import Footer from '../components/footer/footer.component';

export const PublicRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      component={(props) => (
        <div>
          <Header /> {/* HEADER ALWAYS VISIBLE */}
          <Component {...props} />
          <Footer /> {/* FOOTER ALWAYS VISIBLE */}
        </div>
      )}
    />
  );
};

export const LoginRoute = ({ component: Component, ...rest }) => {
  return <Route {...rest} component={(props) => <Component {...props} />} />;
};

import { connect } from 'react-redux';
// import { IRootState } from '~/app/store/rootReducer';
import { LoginScreen } from '../LoginScreen';
import { socialLogin } from '~/app/store/auth/authActions';

const LoginContainer = connect(
  (/* state: IRootState */) => ({
    //
  }),
  {
    socialLogin: socialLogin,
  },
)(LoginScreen);

export default LoginContainer;

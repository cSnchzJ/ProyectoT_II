// importaciones necesarias
import SiteNav from "./components/Common/SiteNav";
import SiteFooter from "./components/Common/SiteFooter";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes, BrowserRouter } from "react-router-dom";
import HomePage from './components/home/HomePage';
import Vistas from "./components/StorageView/Vistas";
import SubirElemento from "./components/StorageView/SubirElementos";
import { Amplify } from 'aws-amplify';
import outputs from '../amplify_outputs.json';
import { Authenticator, Button, Heading, View, useAuthenticator, useTheme } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { I18n } from 'aws-amplify/utils';
import { translations } from '@aws-amplify/ui-react';
I18n.putVocabularies(translations);

I18n.putVocabularies({

  es: {
    'Sign In': 'Inicio de Sesión',
    'Sign in': 'Entrar',
    'Reset Password': 'Restablecer Contraseña',    
  },
});


Amplify.configure(outputs);

const components ={
  SignIn: {
    Footer() {
      const { toForgotPassword } = useAuthenticator();

      return (
        <View textAlign="center">
          <Button
            fontWeight="normal"
            onClick={toForgotPassword}
            size="small"
            variation="link"
          >
            Restablecer contraseña.
          </Button>
        </View>
      );
    },
  },
  SignUp: {
    Header() {
      const { tokens } = useTheme();

      return (
        <Heading
          padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`}
          level={3}
        >
          CrearCuenta
        </Heading>
      );
    },
  
  }
    
}

const formFields = {
  signIn: {
    username: {
      placeholder: 'Introducir correo.',
    },
  },
  signUp:{
    password: {
      label: 'Contraseña:',
      placeholder: 'Introduzca nueva contraseña:',
      isRequired: false,
      order: 2,
    },
    confirm_password: {
      label: 'Confirmar Contraseña.',
      order: 1,
    },
  },
  forgotPassword: {
    username: {
      placeholder: 'Introduzca su correo.',
    },
  },
  confirmResetPassword: {
    confirmation_code: {
      placeholder: 'Introduzca su código de confirmación.:',
      label: 'New Label',
      isRequired: false,
    },
  confirm_password: {
    placeholder: 'Confirmar contraseña.',
  },}

}

function App() {
  return (
    <div>
      <Authenticator formFields={formFields} components={components}>
        {({ signOut }) => (
          <BrowserRouter>
            <SiteNav logOut={signOut || undefined} />
            <div className="App">
              <Routes>
                <Route path='/' element={<HomePage />} />
                <Route path='/vistas' element={<Vistas />} />
                <Route path='/uploadElement' element={<SubirElemento />} />
              </Routes>
            </div>
            <SiteFooter />
          </BrowserRouter>
        )}
      </Authenticator>
    </div>
  );
}

export default App;

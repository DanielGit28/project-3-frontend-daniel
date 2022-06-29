import logo from '../logo.svg';
import Navbar from './Navbar/Navbar';
import Login from './Login/Login';
import Signup from './SignUp/Signup';

const App = (props) => {
  const { container } = props;
  return (
    <div className="app">
      <Navbar navOpen={false} />
      {container === "Home" &&

        <div>
          <div className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p>
              Welcome to project 3 front end from Daniel!
            </p>
          </div>
        </div>
      }
      {container === "Login" &&
        <div>
          <Login />
        </div>

      }
      {container === "Signup" &&
        <div>
          
          <Signup />
        </div>
      }

    </div>
  );
}

export default App;

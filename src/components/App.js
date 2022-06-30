import Navbar from './Navbar/Navbar';
import Login from './Login/Login';
import Signup from './SignUp/Signup';
import Home from './Home/Home';

const App = (props) => {
  const { container } = props;
  return (
    <div className="app">
      <Navbar navOpen={false} container={container}/>
      <div className="app__info">
        {container === "Home" &&
          <Home />
        }
        {container === "Login" &&
          <div className="app-cnt" >
            <Login />
          </div>

        }
        {container === "Signup" &&
          <div className="app-cnt">
            <Signup />
          </div>
        }

      </div>

    </div>
  );
}

export default App;

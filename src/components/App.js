import { createContext, useContext, useState } from 'react';
import Navbar from './Navbar/Navbar';
import Login from './Login/Login';
import Signup from './SignUp/Signup';
import Home from './Home/Home';
import useBreakpoint from './hooks/useBreakpoint';

export const BreakpointContext = createContext({ breakPoint: null });

const App = (props) => {
  const { container } = props;
  const [breakPoint] = useBreakpoint();
  const [navOpen,setNavOpen] = useState(false);

  const navState = (state) => {
    if(state) {
      setNavOpen(true);
    } else {
      setNavOpen(false);
    }
  }
  return (
    <BreakpointContext.Provider value={{ breakPoint: breakPoint }}>
      <div className="app">
        <Navbar navOpen={false} container={container} navState={navState} />
        <div className="app__info">
          {container === "Home" &&
            <div className="app__cnt" >
              <Home />
            </div>
          }
          {container === "Login" &&
            <div className="app__cnt" >
              <Login navState={navOpen}/>
            </div>

          }
          {container === "Signup" &&
            <div className="app__cnt app__cnt__signup">
              <Signup />
            </div>
          }

        </div>

      </div>
    </BreakpointContext.Provider >
  );
}

export default App;

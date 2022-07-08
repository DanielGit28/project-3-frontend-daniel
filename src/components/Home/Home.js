import { useEffect, useState, useRef } from "react";
import DashboardCard from "../DashboardCard/DashboardCard";
import { useNavigate } from "react-router-dom";
import { BsArrowDown } from "react-icons/bs";
import { BiTransferAlt } from "react-icons/bi";
import { MdPayment } from "react-icons/md";
import { Link } from "react-router-dom";

const Home = (props) => {
  const { navOpen } = props;
  const loginBtn = useRef(null);
  const signUpBtn = useRef(null);
  const goDownBtn = useRef(null);
  const cardSignUp1 = useRef(null);
  const cardSignUp2 = useRef(null);
  const cardImgAbsolute = useRef(null);
  const navigate = useNavigate();
  const [linkRedirection, setLinkRedirection] = useState("");

  const navigation = (page) => {
    navigate(page);
  }
  useEffect(() => {
    if (navOpen) {
      signUpBtn.current.classList.add("z-index-minus-1");
      loginBtn.current.classList.add("z-index-minus-1");
      goDownBtn.current.classList.add("z-index-minus-1");
      cardSignUp1.current.classList.add("z-index-minus-1");
      cardSignUp2.current.classList.add("z-index-minus-1");
    } else {
      signUpBtn.current.classList.remove("z-index-minus-1");
      loginBtn.current.classList.remove("z-index-minus-1");
      goDownBtn.current.classList.remove("z-index-minus-1");
      cardSignUp1.current.classList.remove("z-index-minus-1");
      cardSignUp2.current.classList.remove("z-index-minus-1");
    }
  }, [navOpen])


  return (
    <div className="home__root">
      {
        //Hero section
      }
      <section className="home__hero">
        <div className="home__hero__cnt home__hero__cnt--left">
          <div className="home__hero__sub-cnt home__hero__sub-cnt--left">

            <button ref={loginBtn} name="submit-btn" type="button" onClick={() => navigation("/login")} className="form__form__btn signup__cnt__submit form__submit__btn login__sub-cnt__submit" aria-label="Hero go to login button">
              Login
            </button>
            <h1 className="home__hero__title">Just digital banking</h1>
          </div>
        </div>
        <div className="home__hero__cnt home__hero__cnt--right">
          <div className="home__hero__sub-cnt">
            <h2 className="home__hero__title">Immerse into Konrad Bank</h2>
            <button ref={signUpBtn} name="submit-btn" onClick={() => navigation("/signup")} type="button" className="form__form__btn signup__cnt__submit form__submit__btn login__sub-cnt__submit" aria-label="Hero go to sign up button">
              Sign up
            </button>


          </div>
        </div>
        <a aria-label="Button to go down to cards section" ref={goDownBtn} href="#cards-section"><BsArrowDown className="home__hero__icon" /></a>
      </section>
      {
        //Section div
      }
      <div className="home__section-div__root">
        <div className="home__section-div__cnt">
          <h2 className="home__section-div__title">Simplified banking</h2>
        </div>
      </div>
      {
        //Cards section
      }
      <section className="home__cards" id="cards-section">
        <div className="home__cards__cnt">
          {
            //Icon
          }
          <div className="home__cards__sub-cnt">
            <MdPayment className="home__cards__icon" />
          </div>
          {
            //Title
          }
          <div className="home__cards__sub-cnt home__cards__sub-cnt--title">
            <h3 className="home__cards__title">Pay for services</h3>
          </div>
          {
            //Text
          }
          <div className="home__cards__sub-cnt home__cards__sub-cnt--text">
            <p className="home__cards__text">- Common services</p>
          </div>
          <div className="home__cards__sub-cnt home__cards__sub-cnt--text">
            <p className="home__cards__text">- Insurances</p>
          </div>
          <div className="home__cards__sub-cnt home__cards__sub-cnt--text">
            <p className="home__cards__text">- Permits</p>
          </div>
          <div className="home__cards__sub-cnt home__cards__sub-cnt--text">
            <p className="home__cards__text">- Digital services</p>
          </div>
          {
            //Link
          }
          <div className="home__cards__sub-cnt home__cards__sub-cnt--btn">
            <button ref={cardSignUp1} name="submit-btn" onClick={() => navigation("/signup")} type="button" className="form__form__btn signup__cnt__submit form__submit__btn login__sub-cnt__submit" aria-label="Button in card 1 to go to signup">
              Start
            </button>
          </div>
        </div>
        <div className="home__cards__cnt">
          {
            //Icon
          }
          <div className="home__cards__sub-cnt">
            <BiTransferAlt className="home__cards__icon" />
          </div>
          {
            //Title
          }
          <div className="home__cards__sub-cnt home__cards__sub-cnt--title">
            <h3 className="home__cards__title">Universal transfer</h3>
          </div>
          {
            //Text
          }
          <div className="home__cards__sub-cnt home__cards__sub-cnt--text">
            <p className="home__cards__text">- Transfers between user accounts</p>
          </div>
          <div className="home__cards__sub-cnt home__cards__sub-cnt--text">
            <p className="home__cards__text">- Transfers to external accounts</p>
          </div>
          <div className="home__cards__sub-cnt home__cards__sub-cnt--text">
            <p className="home__cards__text">- Transfers to internal accounts</p>
          </div>
          <div className="home__cards__sub-cnt home__cards__sub-cnt--text">
            <p className="home__cards__text">- Dollars and colones</p>
          </div>
          {
            //Link
          }
          <div className="home__cards__sub-cnt home__cards__sub-cnt--btn">
            <button ref={cardSignUp2} name="submit-btn" onClick={() => navigation("/signup")} type="button" className="form__form__btn signup__cnt__submit form__submit__btn login__sub-cnt__submit" aria-label="Button in card 2 to go to signup">
              Try them
            </button>
          </div>

        </div>
      </section>
      {
        //Section div
      }
      <div className="home__section-div__root">
        <div className="home__section-div__cnt">
          <h2 className="home__section-div__title">Online banking</h2>
        </div>
      </div>
      {
        //Info section
      }
      <section className="home__info ">
        <div className="home__info__up-cnt ">
          <div className="home__info__cnt ">
            <img src="https://res.cloudinary.com/develop-daniel/image/upload/v1657257425/Info-money-section-img_j2gbpp.jpg" alt="Info section money illustration" className="home__info__img" />
          </div>
          <div className="home__info__cnt home__info__cnt--info">
            <div className="home__info__sub-cnt">
              <h2 className="home__info__title">Digital space</h2>
              <p className="home__info__text">Konrad Bank lets all kinds of transactions from transfers, services payments, to also add funds.</p>
            </div>
          </div>
        </div>
        <div className="home__info__up-cnt">

          <div className="home__info__cnt home__info__cnt--info">
            <div className="home__info__sub-cnt">
              <h2 className="home__info__title">Simple option</h2>
              <p className="home__info__text">Just make transactions, transfer money and pay services on the go.</p>
            </div>

          </div>
          <div className="home__info__cnt">
            <img src="https://res.cloudinary.com/develop-daniel/image/upload/v1657258172/info-section-card-money_vvdbfe.jpg" alt="Info section card illustration" className="home__info__img" />
          </div>
        </div>

      </section>

      {
        //Footer
      }
      <footer className="home__footer">
        <div className="home__footer__cnt">
          <p className="home__footer__text">Copyright 2022.</p>
        </div>
        <div className="home__footer__cnt">
        <Link to={"/login"} className="form__cnt__login--link form__cnt__login--text home__footer__link" >Login</Link>
        <Link to={"/signup"} className="form__cnt__login--link form__cnt__login--text home__footer__link" aria-label="Footer link to signup" >Signup</Link>
        </div>
      </footer>

    </div>


  );
}

export default Home;
import { Link, useLocation } from 'react-router-dom';
import Auth from '../utils/auth';

// We declare an object called styles that will contain a few objects for card and heading styles
// Notice that each key lists CSS styles in camel case
const styles = {
  card: {
    margin: 20,
    background: '#e8eaf6',
  },
  heading: {
    background: '#9a74db',
    minHeight: 50,
    lineHeight: 3.5,
    fontSize: '1.2rem',
    color: 'white',
    padding: '0 20px',
  },
};

// In Navbar, we can assign a style from an object by using curly braces
function Navbar() {
  const currentPage = useLocation().pathname;

  return (
    <ul className="nav">
      <li className="nav-item">
        <Link to="/"
          // This is a conditional (ternary) operator that checks to see if the current page is "Moods"
          // If it is, we set the current page to 'nav-link-active', otherwise we set it to 'nav-link'
          className={currentPage === '/' ? 'nav-link active' : 'nav-link'}>
          Moods
        </Link>
      </li>
      {/* if user is logged in show your playlists and logout */}
      {Auth.isLoggedIn() ? (
        <>
        <li className="nav-item">
        <Link to='/YourPlaylists'>
          Your Playlists
        </Link>
        </li>
        <li className="nav-item">
        <Link onClick={Auth.logout}>Logout</Link>
        </li>
        </>
      ) : (
        <li className="nav-item">
          <Link to="/Login"
          // Check to see if the currentPage is `Login`, and if so we use the active link class. Otherwise, we set it to a regular link class.
          className={currentPage === '/LoginSignup' ? 'nav-link active' : 'nav-link'}>
          Login/Signup
          </Link>
        </li>
      )}
    </ul>
  );
}

export default Navbar;
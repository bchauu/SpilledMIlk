
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Header = (props) => {

    const location = useLocation();
    const navigate = useNavigate();

    const redirectNow = () => {
        const redirectTo = location.search.replace("?redirectTo=", "");
        navigate(redirectTo ? redirectTo : "/");
      }

    return (
        <div className='header'>
            <h1 onClick={redirectNow}>Spilled Milk</h1>

        </div>
    )
}

export default Header;
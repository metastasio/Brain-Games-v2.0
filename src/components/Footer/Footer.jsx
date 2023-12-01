import { Link } from 'react-router-dom';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './footer.css'

export const Footer = () => {
  return (
    <footer className='footer'>
      <nav>
        <ul className='links'>
          <li>
            <Link to={'mailto: myaldzina@gmail.com'}>
              <FontAwesomeIcon icon={faEnvelope} aria-hidden='true' />
              <span className='sr-only'>Email</span>
            </Link>
          </li>
          <li>
            <Link to={'https://github.com/metastasio'} target='_blank'>
              <FontAwesomeIcon icon={faGithub} aria-hidden='true' />
              <span className='sr-only'> GitHub</span>
            </Link>
          </li>
        </ul>
      </nav>
      <p className='copyright'>
        <small>&copy; 2023 Metastasio. All rights reserved.</small>
      </p>
    </footer>
  );
};

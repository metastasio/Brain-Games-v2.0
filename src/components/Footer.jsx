import { Link } from 'react-router-dom';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const Footer = () => {
  return (
    <footer>
      <nav>
        <ul>
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
      <p>
        <small>&copy; 2023 Metastasio. All rights reserved.</small>
      </p>
    </footer>
  );
};

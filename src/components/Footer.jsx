const Footer = () => {
  return (
    <footer>
      <nav>
        <ul>
          <li>
            <a href='mailto: myaldzina@gmail.com'>
              <i className='fa-solid fa-envelope' aria-hidden='true'></i>
              <span className='sr-only'>Email</span>
            </a>
          </li>
          <li>
            <a
              href='https://deviantart.com/djelibeibi'
              target='_blank'
              rel='noreferrer'
            >
              <i className='fa-brands fa-deviantart' aria-hidden='true'></i>
              <span className='sr-only'>GitHub</span>
            </a>
          </li>
        </ul>
      </nav>
      <p>
        <small>&copy; 2023 Metastasio. All rights reserved.</small>
      </p>
    </footer>
  );
};
export default Footer;

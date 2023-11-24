import { Link } from 'react-router-dom';
import routes from "../routes";

export const Games = () => {
  return (
    <section>
      <h2>Here are your games for today</h2>
      <p>Log in to get access to more games</p>
      <div className='card'>
        <Link to={routes.evenNumber()}>Even numbers</Link>
      </div>
      <div className='card'></div>
      <div className='card'></div>
      <div className='card'></div>
      <div className='card'></div>
    </section>
  );
};



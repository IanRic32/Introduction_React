import { useEffect, useState } from 'react';
import './AlienAnimation.css';

export default function AlienAnimation({ talking }) {
  const [expression, setExpression] = useState('normal');
  
  useEffect(() => {
    if (talking) {
      setExpression('talking');
      const timer = setTimeout(() => setExpression('normal'), 2000);
      return () => clearTimeout(timer);
    }
  }, [talking]);

  return (
    <div className={`alien ${expression}`}>
      <div className="alien-head">
        <div className="alien-eyes">
          <div className="alien-eye"></div>
          <div className="alien-eye"></div>
        </div>
        <div className="alien-mouth"></div>
      </div>
      <div className="alien-antenna"></div>
    </div>
  );
}
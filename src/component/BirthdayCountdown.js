import { useEffect, useState } from 'react';
import'../css/countdown.css';

const BirthdayCountdown = () => {
  const getNextBirthday = () => {
    const today = new Date();
    const currentYear = today.getFullYear();
    let birthdayThisYear = new Date(`${currentYear}-03-10T00:00:00`);

    if (today > birthdayThisYear) {
      birthdayThisYear = new Date(`${currentYear + 1}-03-10T00:00:00`);
    }

    return birthdayThisYear;
  };

  const calculateTimeLeft = () => {
    const now = new Date();
    const target = getNextBirthday();

    const difference = +target - +now;

    if (
      now.getDate() === target.getDate() &&
      now.getMonth() === target.getMonth()
    ) {
      return null; // It's birthday today
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (timeLeft === null) {
    return <dive className='celebrate'>🎉 Today is my birthday! 🎂</dive>;
  }

  return (
    <div>
      <div className='countdown'>
        {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
      </div>
    </div>
  );
};

export default BirthdayCountdown;

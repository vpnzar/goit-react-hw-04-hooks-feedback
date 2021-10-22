import './App.css';
import s from './components/Statistics/Statistics.module.css';
import { useState } from 'react';
import FeedbackOptions from './components/FeedbackOptions/FeedbackOptions';
import Statistics from './components/Statistics/Statistics ';
import Section from './components/Section/Section';
import Notification from './components/Notification/Notification';

function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const total = good + neutral + bad;

  const countPositiveFeedbackPercentage = () => {
    let difference = 0;
    const badNeutral = neutral + bad;
    badNeutral === 0 ? (difference = 100) : (difference = (good * 100) / total);
    return Math.floor(difference);
  };

  const handleFeedback = e => {
    let name = e.target.innerText;
    switch (name) {
      case 'good':
        setGood(prev => prev + 1);
        break;
      case 'neutral':
        setNeutral(prev => prev + 1);
        break;
      case 'bad':
        setBad(prev => prev + 1);
        break;
      default:
        console.log('Invalid type');
    }

    return [good, neutral, bad];
  };

  const objName = Object.keys({ good, neutral, bad });

  return (
    <div className="App">
      <div className={s.Statistics}>
        <Section title="Please leave feedback">
          <FeedbackOptions options={objName} onLeaveFeedback={handleFeedback} />
        </Section>
        <Section title="Statistics">
          {total === 0 ? (
            <Notification message="No feedback given" />
          ) : (
            <Statistics
              good={good}
              neutral={neutral}
              bad={bad}
              total={total}
              positivePercentage={countPositiveFeedbackPercentage()}
            />
          )}
        </Section>
      </div>
    </div>
  );
}

export default App;

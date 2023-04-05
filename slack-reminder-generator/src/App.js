import React, { useState } from 'react';
import InputForm from './components/InputForm';
import GeneratedCommand from './components/GeneratedCommand';

const App = () => {
  const [generatedCommands, setGeneratedCommands] = useState([]);

  const generateCommand = ({ deadline, intervals, content }) => {
    const deadlineDate = new Date(deadline);
    let commands = [];

    intervals.forEach((interval) => {
      if (interval === 'dailyBeforeWeek' || interval === 'every3DaysBeforeWeek') {
        const daysBefore = interval === 'dailyBeforeWeek' ? 7 : 3;
        const reminderDate = new Date(deadlineDate);
        reminderDate.setDate(reminderDate.getDate() - daysBefore);

        while (reminderDate <= deadlineDate) {
          commands.push(`/remind @channel ${content} ${reminderDate.toISOString().slice(0, 10)}`);
          reminderDate.setDate(reminderDate.getDate() + 1);
        }
      } else {
        const intervalDays = Number(interval);
        const reminderDate = new Date(deadlineDate);

        while (reminderDate >= new Date()) {
          commands.push(`/remind @channel ${content} ${reminderDate.toISOString().slice(0, 10)}`);
          reminderDate.setDate(reminderDate.getDate() - intervalDays);
        }
      }
    });

    setGeneratedCommands(commands.reverse());
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Slackリマインダーコマンド生成アプリ</h1>
      </header>
      <main>
        <InputForm onFormSubmit={generateCommand} />
        <GeneratedCommand commands={generatedCommands} />
      </main>
    </div>
  );
};

export default App;

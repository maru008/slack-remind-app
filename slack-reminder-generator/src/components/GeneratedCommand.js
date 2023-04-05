import React, { useState } from 'react';
import InputForm from './InputForm';

const GeneratedCommand = () => {
  const [generatedCommands, setGeneratedCommands] = useState([]);

  const generateCommand = ({ deadline, intervals, content }) => {
    const deadlineDate = new Date(deadline);
    let commands = [];

    Object.keys(intervals).forEach((interval) => {
      if (intervals[interval]) {
        const reminderDate = new Date(deadlineDate);

        if (interval === 'oneWeek') {
          while (reminderDate >= new Date()) {
            commands.push(`/remind @channel ${content} ${reminderDate.toISOString().slice(0, 10)}`);
            reminderDate.setDate(reminderDate.getDate() - 7);
          }
        } else if (interval === 'oneMonth') {
          while (reminderDate >= new Date()) {
            commands.push(`/remind @channel ${content} ${reminderDate.toISOString().slice(0, 10)}`);
            reminderDate.setMonth(reminderDate.getMonth() - 1);
          }
        } else if (interval === 'threeDays') {
          while (reminderDate >= new Date()) {
            commands.push(`/remind @channel ${content} ${reminderDate.toISOString().slice(0, 10)}`);
            reminderDate.setDate(reminderDate.getDate() - 3);
          }
        } else if (interval === 'dailyBeforeWeek' || interval === 'every3DaysBeforeWeek') {
          const daysBefore = interval === 'dailyBeforeWeek' ? 7 : 3;
          reminderDate.setDate(reminderDate.getDate() - daysBefore);

          while (reminderDate <= deadlineDate) {
            commands.push(`/remind @channel ${content} ${reminderDate.toISOString().slice(0, 10)}`);
            reminderDate.setDate(reminderDate.getDate() + 1);
          }
        }
      }
    });

    const uniqueCommands = [...new Set(commands.reverse())];
    setGeneratedCommands(uniqueCommands);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Slackリマインダーコマンド生成アプリ</h1>
      </header>
      <main>
        <InputForm onFormSubmit={generateCommand} />
        <div>
          <h2>生成されたリマインダーコマンド:</h2>
          <pre>{generatedCommands.join('\n')}</pre>
        </div>
      </main>
    </div>
  );
};

export default GeneratedCommand;

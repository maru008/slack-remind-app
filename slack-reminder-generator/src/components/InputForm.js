import React, { useState } from 'react';

const InputForm = ({ onFormSubmit }) => {
  const [content, setContent] = useState('');
  const [deadline, setDeadline] = useState('');
  const [intervals, setIntervals] = useState({
    oneWeek: false,
    oneMonth: false,
    threeDays: false,
    dailyBeforeWeek: false,
    every3DaysBeforeWeek: false,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onFormSubmit({ deadline, intervals, content });
  };

  const handleIntervalChange = (e) => {
    const { name, checked } = e.target;
    setIntervals({ ...intervals, [name]: checked });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          内容:
          <input type="text" value={content} onChange={(e) => setContent(e.target.value)} />
        </label>
      </div>
      <div>
        <label>
          締切:
          <input type="date" value={deadline} onChange={(e) => setDeadline(e.target.value)} />
        </label>
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            name="oneWeek"
            checked={intervals.oneWeek}
            onChange={handleIntervalChange}
          />
          1週間隔
        </label>
        <label>
          <input
            type="checkbox"
            name="oneMonth"
            checked={intervals.oneMonth}
            onChange={handleIntervalChange}
          />
          1ヶ月間隔
        </label>
        <label>
          <input
            type="checkbox"
            name="threeDays"
            checked={intervals.threeDays}
            onChange={handleIntervalChange}
          />
          3日間隔
        </label>
        <label>
          <input
            type="checkbox"
            name="dailyBeforeWeek"
            checked={intervals.dailyBeforeWeek}
            onChange={handleIntervalChange}
          />
          締切1週間前は毎日
        </label>
        <label>
          <input
            type="checkbox"
            name="every3DaysBeforeWeek"
            checked={intervals.every3DaysBeforeWeek}
            onChange={handleIntervalChange}
          />
          締切1週間前は3日間隔
        </label>
      </div>
      <button type="submit">コマンド作成</button>
    </form>
  );
};

export default InputForm;

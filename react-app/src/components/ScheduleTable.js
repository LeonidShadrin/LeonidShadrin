import React from 'react';

// Helper function to get background color for a cell
const getCellBackgroundColor = (data) => {
  if (data.asist && data.park) return 'darkgreen';
  if (data.asist) return 'pink';
  if (data.park) return 'yellow';
  return 'white';
};

const ScheduleTable = ({ data }) => {
  if (!data || data.length === 0) return <p>No data available</p>;

  // Extract all keys except date and weekday
  const categories = Object.keys(data[0].divisions);

  // Get dates for header row
  const dates = data.map(item => ({
    date: item.date,
    weekday: item.weekday
  }));

  return (
    <div style={{ overflowX: 'auto' }}>
      <table border="1" cellPadding="8" cellSpacing="0" style={{ borderCollapse: 'collapse', width: '100%' }}>
        <thead>
          <tr>
            <th style={{ position: 'sticky', left: 0, background: '#f2f2f2' }}>Category</th>
            {dates.map(({ date, weekday }, idx) => (
              <th
                key={idx}
                style={{
                  backgroundColor:
                    weekday === 'Saturday' || weekday === 'Sunday'
                      ? 'orange'
                      : 'inherit',
                  fontWeight: 'bold',
                }}
              > 
                {`${date.split('-')[2]}.${date.split('-')[1]}`} <br />
                {/* <small>({weekday})</small> */}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {categories.map((category, catIdx) => (
            <tr key={catIdx}>
              <td
                style={{
                  fontWeight: 'bold',
                  textAlign: 'left',
                  position: 'sticky',
                  left: 0,
                  background: '#f9f9f9',
                }}
              >
                {category}
              </td>
              {data.map((day, dayIdx) => {
                const entry = day.divisions[category] || {};
                return (
                  <td
                    key={dayIdx}
                    style={{
                      backgroundColor: getCellBackgroundColor(entry),
                      textAlign: 'center',
                    }}
                  >
                    {entry.total ?? '-'}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ScheduleTable;

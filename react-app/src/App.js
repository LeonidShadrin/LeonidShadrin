import React from 'react';
import ScheduleTable from './components/ScheduleTable';
// import scheduleData from './table.json';
import { getTableData } from './utils/get-table-data';

function App() {
  
  return (
    <div style={{ padding: '20px' }}>
      <h1>Schedule</h1>
      <ScheduleTable data={getTableData(7, 2025)} />
    </div>
  );
}

export default App;

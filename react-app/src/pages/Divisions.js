import React from 'react';
import ScheduleTable from './components/ScheduleTable';
import DownloadTable from './components/DownloadTable';
// import scheduleData from './table.json';
import { getTableData } from './utils/get-table-data';

function Divisions() {
  
  return (
    <div style={{ padding: '20px' }}>
      <h1>Schedule</h1>
      <DownloadTable data={getTableData(7, 2025)} />
      <ScheduleTable data={getTableData(7, 2025)} />
    </div>
  );
}

export default Divisions;

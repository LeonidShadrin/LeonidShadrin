import React from 'react';
import ScheduleTable from '../components/ScheduleTable';
import DownloadTable from '../components/DownloadTable';
// import scheduleData from './table.json';
import { getTableData } from '../utils/get-table-data';

function Divisions() {
  const data = getTableData(8, 2025);
  return (
    <div style={{ padding: '20px' }}>
          <h1>Schedule</h1>
          <DownloadTable data={data} />
          <ScheduleTable data={data} />
        </div>
  );
}

export default Divisions;

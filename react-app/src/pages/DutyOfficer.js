import React from 'react';
import DutyOfficerTable from '../components/DOTable';
import { getTableData } from '../utils/get-DO-data';

function DutyOfficer() {
  const data = getTableData(9, 2025);
  return (
    <div style={{ padding: '20px' }}>
      <h1>Черговий частини</h1>
      <DutyOfficerTable data={data} />
    </div>
  );
}

export default DutyOfficer;

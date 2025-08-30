import React from 'react';
import DOAsistTable from '../components/DOAsistTable';
import DownloadDOAsistTable from '../components/DownloadDOAsistTable';
import { getTableData } from '../utils/get-DO-asist-data';

function DutyOfficerAsist() {
  const data = getTableData(9, 2025);
  return (
    <div style={{ padding: '20px' }}>
      <h1>Помічник чергового частини</h1>
      <DownloadDOAsistTable data={data} />
      <DOAsistTable data={data} />
    </div>
  );
}

export default DutyOfficerAsist;

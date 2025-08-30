import React from 'react';
import * as ExcelJS from 'exceljs';
import { saveAs } from 'file-saver'; // ✅ Corrected import

// Helper function to get background color for a cell
const getCellBackgroundColor = (data) => {
  if (data.asist && data.park) return 'darkgreen';
  if (data.asist) return 'red';
  if (data.park) return 'yellow';
  return 'white';
};

// Map color names to hex codes
const colorMap = {
  red: 'ff0000',
  yellow: 'FFFFFF00',
  darkgreen: '33cc33',
  white: 'FFFFFFFF',
  orange: 'FFFFA500',
  brown: '9c5c35',
  lightgray: 'FFF0F0F0'
};

const categoriesMap = {
    "Рогак": "Рогак",
    "Лисий": "Лисий",
    "Горошко": "Горошко",
    "Глущенко": "Глущенко",
    "Перепадя": "Перепадя",
    "Євтуховський": "Євтуховський",
    "Пяста": "Пяста",
    "Марецький": "Марецький",
    "Бичкова": "Бичкова",
    "Бабинець": "Бабинець",
    "Янковський": "Янковський",
    "Нетрян": "Нетрян",
  };

const DownloadDOTable = ({ data }) => {
  if (!data || data.length === 0) return <p>No data available</p>;

  const categories = Object.keys(data[0].divisions);

  const dates = data.map(item => ({
    date: item.date,
    weekday: item.weekday
  }));

  const handleDownloadExcel = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Schedule');

    // Header row
    const headerRow = worksheet.addRow(['Підрозділ', ...dates.map(d => `${d.date.split('-')[2]}`)]);

    // Style header row
    headerRow.eachCell((cell) => {      
      cell.font = { bold: true };
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: ['Saturday', 'Sunday'].includes(dates[parseInt(cell.value)-1]?.weekday) ? colorMap.orange : colorMap.lightgray }
      };
    });

    // Data rows
    categories.forEach(category => {
      const rowData = [categoriesMap[category]];
      const colorData = [colorMap.brown]; // category column default color

      data.forEach(day => {
        const entry = day.divisions[category] || {};
        rowData.push(entry.asist ? 'X' : '');
        colorData.push(colorMap[getCellBackgroundColor(entry).toLowerCase()] || colorMap.white);
      });

      const row = worksheet.addRow(rowData);

      row.eachCell((cell, colNumber) => {
        const bgColor = colorData[colNumber - 1];
        cell.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: bgColor }
        };
        cell.alignment = { horizontal: 'center', vertical: 'center' };
      });
    });

    // Auto-size columns
    worksheet.columns.forEach(column => {
      // let maxLength = 0;
      // column.eachCell({ includeEmpty: true }, (cell) => {
      //   const columnLength = cell.value ? cell.value.toString().length : 10;
      //   if (columnLength > maxLength) maxLength = columnLength;
      // });
      column.width = 5; // maxLength < 10 ? 10 : maxLength > 30 ? 30 : maxLength;
    });

    // Generate buffer and download
    const buffer = await workbook.xlsx.writeBuffer();
    saveAs(new Blob([buffer]), 'Schedule.xlsx');
  };

  return (
    <div>
      <button
        onClick={handleDownloadExcel}
        style={{
          marginBottom: '10px',
          padding: '8px 16px',
          backgroundColor: '#4CAF50',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        Download Excel
      </button>

      {/* Keep your existing table rendering code here */}
      <div style={{ overflowX: 'auto' }}>
        <table border="1" cellPadding="8" cellSpacing="0" style={{ borderCollapse: 'collapse', width: '100%' }}>
          {/* Your current table JSX remains unchanged */}
          {/* You can paste it back here */}
        </table>
      </div>
    </div>
  );
};

export default DownloadDOTable;

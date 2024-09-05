import React, { useState } from 'react';
import DataTable from 'react-data-table-component';

// Sample data
const data = [
  { companyName: 'Apple Inc.', ticker: 'AAPL', stockPrice: '$192.58', marketCap: '$3.04T' },
  { companyName: 'Microsoft Corporation', ticker: 'MSFT', stockPrice: '$340.54', marketCap: '$2.56T' },
  { companyName: 'Alphabet Inc.', ticker: 'GOOGL', stockPrice: '$134.12', marketCap: '$1.72T' },
  { companyName: 'Amazon.com Inc.', ticker: 'AMZN', stockPrice: '$138.01', marketCap: '$1.42T' },
  { companyName: 'NVIDIA Corporation', ticker: 'NVDA', stockPrice: '$466.19', marketCap: '$1.16T' },
  { companyName: 'Tesla Inc.', ticker: 'TSLA', stockPrice: '$255.98', marketCap: '$811.00B' },
  { companyName: 'Meta Platforms Inc.', ticker: 'META', stockPrice: '$311.71', marketCap: '$816.00B' },
  { companyName: 'Berkshire Hathaway Inc.', ticker: 'BRK.B', stockPrice: '$354.08', marketCap: '$783.00B' },
  // Add other rows similarly...
];

const columns = [
  {
    name: 'Company Name',
    selector: row => row.companyName,
    sortable: false,
    cell: row => <span className="font-medium text-gray-900 dark:text-white">{row.companyName}</span>,
  },
  {
    name: 'Ticker',
    selector: row => row.ticker,
    sortable: false,
  },
  {
    name: 'Stock Price',
    selector: row => row.stockPrice,
    sortable: false,
  },
  {
    name: 'Market Capitalization',
    selector: row => row.marketCap,
    sortable: false,
  },
];

const TableComponent = () => {
  const [filterText, setFilterText] = useState('');

  // Filter logic
  const filteredData = data.filter(item => 
    item.companyName.toLowerCase().includes(filterText.toLowerCase()) ||
    item.ticker.toLowerCase().includes(filterText.toLowerCase())
  );

  return (
    <div className="w-full p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
      <input
        type="text"
        placeholder="Search..."
        className="mb-4 p-2 border border-gray-300 rounded w-full dark:bg-gray-700 dark:text-white"
        value={filterText}
        onChange={e => setFilterText(e.target.value)}
      />
      <DataTable
        columns={columns}
        data={filteredData}
        customStyles={{
          headCells: {
            style: {
              backgroundColor: '#f8f9fa',
              color: '#495057',
              fontWeight: 'bold',
              textAlign: 'left',
            },
          },
          rows: {
            style: {
              textAlign: 'left',
              backgroundColor: '#ffffff',
              color: '#343a40',
            },
          },
        }}
        noHeader
        pagination
      />
    </div>
  );
};

export default TableComponent;

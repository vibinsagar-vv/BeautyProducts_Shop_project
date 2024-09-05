import React, { useEffect, useRef, useState } from "react";
import { DataTable } from "simple-datatables";
import "simple-datatables/dist/style.css";

const SelectionTable = () => {
  const tableRef = useRef(null);
  const [table, setTable] = useState(null);
  const [multiSelect, setMultiSelect] = useState(true);
  const [rowNavigation, setRowNavigation] = useState(false);

  useEffect(() => {
    if (tableRef.current) {
      const initializeTable = () => {
        // Destroy the table if it already exists (cleanup)
        if (table) {
          table.destroy();
        }

        // Options for DataTable
        const options = {
          searchable: true,
          sortable: true, // Enable sorting
          fixedHeight: true,
        };

        // Initialize DataTable
        const dataTable = new DataTable(tableRef.current, options);

        // Add event listeners for selection logic
        dataTable.on("datatable.selectrow", (rowIndex, event) => {
          event.preventDefault();
          const row = dataTable.rows().data[rowIndex];

          // Manage row selection based on multiSelect flag
          if (row.classList.contains("selected")) {
            row.classList.remove("selected");
          } else {
            if (!multiSelect) {
              // Unselect all rows if multi-select is disabled
              dataTable.rows().nodes().forEach((r) => r.classList.remove("selected"));
            }
            row.classList.add("selected");
          }
        });

        setTable(dataTable);
      };

      const isMobile = window.matchMedia("(any-pointer:coarse)").matches;
      if (isMobile) {
        setRowNavigation(false);
      }

      initializeTable();
    }

    // Clean up on unmount
    return () => {
      if (table) {
        table.destroy();
      }
    };
  }, [tableRef, multiSelect, rowNavigation]);

  // Function to determine button class based on status
  const getStatusClass = (status) => {
    switch (status) {
      case 'Shipped':
        return 'bg-yellow-500 text-white';
      case 'Confirmed':
        return 'bg-red-500 text-white';
      case 'Completed':
        return 'bg-green-500 text-white';
      default:
        return 'bg-gray-200 text-gray-800';
    }
  };

  return (
    <div className="overflow-x-auto">
      <table
        ref={tableRef}
        className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 text-sm text-gray-700 dark:text-gray-400"
      >
        <thead className="bg-gray-50 dark:bg-gray-700">
          <tr>
            <th className="px-6 py-3 text-left font-medium text-gray-500 dark:text-gray-300">
              <div className="flex items-center">
                Name
                <svg
                  className="w-4 h-4 ms-1"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8 15l4 4 4-4m0-6l-4-4-4 4"
                  />
                </svg>
              </div>
            </th>
            <th className="px-6 py-3 text-left font-medium text-gray-500 dark:text-gray-300">
              <div className="flex items-center">
                Release Date
                <svg
                  className="w-4 h-4 ms-1"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8 15l4 4 4-4m0-6l-4-4-4 4"
                  />
                </svg>
              </div>
            </th>
            <th className="px-6 py-3 text-left font-medium text-gray-500 dark:text-gray-300">
              <div className="flex items-center">
                NPM Downloads
                <svg
                  className="w-4 h-4 ms-1"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8 15l4 4 4-4m0-6l-4-4-4 4"
                  />
                </svg>
              </div>
            </th>
            <th className="px-6 py-3 text-left font-medium text-gray-500 dark:text-gray-300">
              <div className="flex items-center">
                Growth
                <svg
                  className="w-4 h-4 ms-1"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8 15l4 4 4-4m0-6l-4-4-4 4"
                  />
                </svg>
              </div>
            </th>
            <th className="px-6 py-3 text-left font-medium text-gray-500 dark:text-gray-300">
              <div className="flex items-center">
                Order Status
                <svg
                  className="w-4 h-4 ms-1"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8 15l4 4 4-4m0-6l-4-4-4 4"
                  />
                </svg>
              </div>
            </th>
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
          {/* Table rows go here */}
          {[
            ["Flowbite", "2021/25/09", "269000", "49%", "Shipped"],
            ["React", "2013/24/05", "4500000", "24%", "Completed"],
            ["Angular", "2010/20/09", "2800000", "17%", "Confirmed"],
            ["Vue", "2014/12/02", "3600000", "30%", "Shipped"],
            ["Svelte", "2016/26/11", "1200000", "57%", "Completed"],
            ["Ember", "2011/08/12", "500000", "44%", "Confirmed"],
            ["Backbone", "2010/13/10", "300000", "9%", "Shipped"],
            ["jQuery", "2006/28/01", "6000000", "5%", "Completed"],
            ["Bootstrap", "2011/19/08", "1800000", "12%", "Confirmed"],
            ["Foundation", "2011/23/09", "700000", "8%", "Shipped"],
            ["Bulma", "2016/24/10", "500000", "7%", "Completed"],
            ["Next.js", "2016/25/10", "2300000", "45%", "Confirmed"],
            ["Nuxt.js", "2016/16/10", "900000", "50%", "Shipped"],
            ["Meteor", "2012/17/01", "1000000", "10%", "Completed"],
            ["Aurelia", "2015/08/07", "200000", "20%", "Confirmed"],
            ["Inferno", "2016/27/09", "100000", "35%", "Shipped"],
            ["Preact", "2015/16/08", "600000", "28%", "Completed"],
            ["Lit", "2018/28/05", "400000", "60%", "Confirmed"],
            ["Alpine.js", "2019/02/11", "300000", "70%", "Shipped"],
            ["Stimulus", "2018/06/03", "150000", "25%", "Completed"],
            ["Solid", "2021/05/07", "250000", "80%", "Confirmed"],
          ].map(([name, date, downloads, growth, status], idx) => (
            <tr
              key={idx}
              className="hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer"
            >
              <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {name}
              </td>
              <td className="px-6 py-4">{date}</td>
              <td className="px-6 py-4">{downloads}</td>
              <td className="px-6 py-4">{growth}</td>
              <td className="px-6 py-4">
                <button className={`px-4 py-2 rounded text-white ${getStatusClass(status)}`}>
                  {status}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SelectionTable;

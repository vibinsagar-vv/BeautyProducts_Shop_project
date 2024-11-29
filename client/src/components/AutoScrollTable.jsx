import React, { useEffect, useRef } from "react";

const AutoScrollTable = ({ getTableProps, getTableBodyProps, headerGroups, rows, prepareRow }) => {
  const tableContainerRef = useRef(null);

  useEffect(() => {
    const tableContainer = tableContainerRef.current;

    let scrollInterval;
    if (tableContainer) {
      scrollInterval = setInterval(() => {
        if (tableContainer.scrollTop + tableContainer.clientHeight >= tableContainer.scrollHeight) {
          // Reset to top when reaching the bottom
          tableContainer.scrollTop = 0;
        } else {
          // Scroll down
          tableContainer.scrollTop += 1; // Adjust scroll speed by changing the increment value
        }
      }, 50); // Adjust speed with the interval time in ms
    }

    return () => clearInterval(scrollInterval); // Cleanup interval on component unmount
  }, []);

  return (
    <div
      ref={tableContainerRef}
      className="overflow-y-scroll overflow-x-auto h-[200px] border-2 scrollbar-none"
    >
      <table
        {...getTableProps()}
        className="min-w-full divide-y divide-gray-200"
      >
        <thead className="bg-gray-50 py-3 border border-gray-500">
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  className="px-6 border-r-2 py-2 text-center border-gray-500 bg-pink-100 text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {column.render("Header")}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? " 🔽"
                        : " 🔼"
                      : ""}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody
          {...getTableBodyProps()}
          className="bg-white divide-y divide-gray-200"
        >
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <td
                    {...cell.getCellProps()}
                    className="px-6 py-4 whitespace-nowrap text-center text-xs text-gray-500"
                  >
                    {cell.render("Cell")}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default AutoScrollTable;

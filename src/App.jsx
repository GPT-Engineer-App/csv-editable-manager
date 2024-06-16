import React, { useState } from 'react';
import Papa from 'papaparse';
import { useTable, usePagination } from 'react-table';
import { FaPlus, FaTrash, FaDownload } from 'react-icons/fa';

function App() {
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    Papa.parse(file, {
      header: true,
      dynamicTyping: true,
      complete: (results) => {
        setData(results.data);
        setColumns(Object.keys(results.data[0]).map((key) => ({ Header: key, accessor: key })));
      },
    });
  };

  const handleAddRow = () => {
    const newRow = columns.reduce((acc, column) => {
      acc[column.accessor] = '';
      return acc;
    }, {});
    setData([...data, newRow]);
  };

  const handleRemoveRow = (index) => {
    const newData = data.filter((_, i) => i !== index);
    setData(newData);
  };

  const handleDownload = () => {
    const csv = Papa.unparse(data);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', 'edited_data.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable(
    {
      columns,
      data,
    },
    usePagination
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">CSV Upload and Edit Tool</h1>
      <input type="file" accept=".csv" onChange={handleFileUpload} className="mb-4" />
      <button onClick={handleAddRow} className="btn btn-primary mb-4">
        <FaPlus /> Add Row
      </button>
      <button onClick={handleDownload} className="btn btn-secondary mb-4">
        <FaDownload /> Download CSV
      </button>
      <table {...getTableProps()} className="table-auto w-full mb-4">
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()} className="px-4 py-2 border">{column.render('Header')}</th>
              ))}
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()} className="px-4 py-2 border">
                    <input
                      value={cell.value}
                      onChange={(e) => {
                        const newData = [...data];
                        newData[i][cell.column.id] = e.target.value;
                        setData(newData);
                      }}
                      className="w-full"
                    />
                  </td>
                ))}
                <td className="px-4 py-2 border">
                  <button onClick={() => handleRemoveRow(i)} className="btn btn-danger">
                    <FaTrash />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default App;
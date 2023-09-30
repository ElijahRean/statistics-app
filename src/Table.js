import React from 'react';
import { useTable, useFilters, useSortBy, usePagination } from 'react-table';

function Table({ data, gotoPage, canPreviousPage, previousPage, canNextPage, nextPage, pageCount }) {
  const columns = React.useMemo(
    () => [
      {
        Header: 'Country',
        accessor: 'countriesAndTerritories',
      },
      {
        Header: 'Cases',
        accessor: 'cases',
      },
      {
        Header: 'Deaths',
        accessor: 'deaths',
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    state: { pageIndex, pageSize },
    setPageSize,
    rows,
  } = useTable(
    {
      columns,
      data,
      initialState: { pageSize: 10 },
    },
    useFilters,
    useSortBy,
    usePagination
  );

  return (
    <div className="table-container">
      <table {...getTableProps()} className="table">
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render('Header')}
                  {column.canFilter && (
            <input
              type="text"
              value={column.filterValue || ''}
              onChange={(e) => {
                column.setFilter(e.target.value || undefined);
              }}
              placeholder={`Filter ${column.render('Header')}`}
            />
                  )}
                  <span>
                    {column.isSorted ? (column.isSortedDesc ?  ' 🔽' : ' 🔼') : ''}
                  </span>   
                  
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="pagination">
        <span>
          Display{' '}
          <select
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
            }}
          >
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                {pageSize}
              </option>
            ))}
          </select>{' '}
          rows per page
        </span>
        <span>
          Page{' '}
          <strong>
            {pageIndex + 1} of {Math.ceil(rows.length / pageSize)}
          </strong>{' '}
        </span>
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {'<<'}
        </button>
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {'<'}
        </button>
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          {'>'}
        </button>
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {'>>'}
        </button>
      </div>
    </div>
  );
}

export default Table;

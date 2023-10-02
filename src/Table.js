import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useTable, useFilters, useSortBy, usePagination } from 'react-table';

function Table({ data, dateRange, selectedCountry, onCountryChange }) {
  const [countryFilter, setCountryFilter] = useState(selectedCountry);

  const columns = React.useMemo(
    () => [
      {
        Header: 'Country',
        accessor: 'countriesAndTerritories',
        Filter: ({ column }) => {
          const { filterValue, setFilter } = column;
          return (
            <input
              value={countryFilter || ''}
              onChange={(e) => {
                setCountryFilter(e.target.value || undefined);
                setFilter(e.target.value || undefined);
              }}
              placeholder="Filter by country"
            />
          );
        },
      },
      {
        Header: 'Cases',
        accessor: 'cases',
      },
      {
        Header: 'Deaths',
        accessor: 'deaths',
      },
      {
        Header: 'All Cases',
        // accessor: 'deaths',
      },
      {
        Header: 'All Deaths',
        // accessor: 'deaths',
      },
      {
        Header: 'Cases per 1000',
        // accessor: 'deaths',
      },
      {
        Header: 'Deaths per 1000',
        // accessor: 'deaths',
      },
    ],
    []
  );

  // Initialize the table instance with data and columns
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    state: { pageIndex, pageSize },
    setPageSize,
    gotoPage,
    
  } = useTable(
    {
      columns,
      data: data, // Your data goes here
      initialState: { pageSize: 10 },
    },
    useFilters,
    useSortBy,
    usePagination
  );

 
  useEffect(() => {
    // Ensure that the country filter is applied only once when the selectedCountry prop changes
    const filteredData = data.filter((item) => {
      const isDateInRange =
        item.date >= dateRange.startDate && item.date <= dateRange.endDate;

      const isCountryMatched =
        countryFilter === 'All' ||
        item.countriesAndTerritories === countryFilter;

      return isDateInRange && isCountryMatched;
    });


    // Update the data with the filtered results
    // This assumes you have a setter for data, e.g., setData
    // setData(filteredData);

    // Note: Uncomment the above line once you have a way to set the filtered data in your parent component

    gotoPage(0);
  }, [data, dateRange, countryFilter, gotoPage]);

  return (
    <div className="table-container">
       <div className="filter-input">
        <label>Filter by Country: </label>
        <input
          value={countryFilter}
          onChange={(e) => setCountryFilter(e.target.value)}
          placeholder="All"
        />
      </div>
      <table {...getTableProps()} className="table">
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render('Header')}
                  <span>
                    {column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}
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
            {pageIndex + 1} of {Math.ceil(data.length / pageSize)}
          </strong>{' '}
        </span>
      </div>
    </div>
  );
}

Table.propTypes = {
  data: PropTypes.array.isRequired,
  dateRange: PropTypes.object.isRequired,
  selectedCountry: PropTypes.string.isRequired,
  onCountryChange: PropTypes.func.isRequired,
};

export default Table;

'use client';

import {
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { ArrowDown, ArrowUp, ArrowUpDown } from 'lucide-react';
import { useEffect, useState } from 'react';

import { columns } from '@/components/advocates-columns';
import { DataTablePagination } from '@/components/data-table-pagination';
import { DataTableSheet } from '@/components/data-table-sheet';
import { DataTableToolbar } from '@/components/data-table-toolbar';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { type Advocate } from '@/lib/api';
import { cn } from '@/lib/utils';

interface AdvocatesTableProps {
  advocates: Advocate[];
  isFetching: boolean;
  onRefresh: () => void;
}

export function AdvocatesTable({
  advocates,
  isFetching,
  onRefresh,
}: AdvocatesTableProps) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [{ pageIndex, pageSize }, setPagination] = useState({
    pageIndex: 0,
    pageSize: rowsPerPage,
  });
  const [selectedAdvocate, setSelectedAdvocate] = useState<Advocate | null>(
    null,
  );

  const pagination = { pageIndex, pageSize };

  const table = useReactTable({
    data: advocates,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: setPagination,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      pagination,
    },
    pageCount: Math.ceil(advocates.length / pageSize),
    manualPagination: false,
    globalFilterFn: (row, _columnId, filterValue) => {
      const searchValue = filterValue.toLowerCase();

      const firstName = String(row.getValue('firstName')).toLowerCase();
      if (firstName.includes(searchValue)) return true;

      const lastName = String(row.getValue('lastName')).toLowerCase();
      if (lastName.includes(searchValue)) return true;

      const city = String(row.getValue('city')).toLowerCase();
      if (city.includes(searchValue)) return true;

      const specialties = row.getValue('specialties') as string[];
      if (
        specialties.some((specialty) =>
          specialty.toLowerCase().includes(searchValue),
        )
      )
        return true;

      return false;
    },
  });

  useEffect(() => {
    setPagination({
      pageIndex: 0,
      pageSize: rowsPerPage,
    });
  }, [rowsPerPage]);

  return (
    <div className="space-y-4">
      <DataTableToolbar
        table={table}
        isFetching={isFetching}
        onRefresh={onRefresh}
      />
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className="whitespace-nowrap bg-muted/50 py-4"
                  >
                    {header.isPlaceholder ? null : (
                      <div
                        className={cn(
                          'flex items-center gap-2 text-sm font-semibold text-primary',
                          header.column.getCanSort() &&
                            'cursor-pointer select-none hover:text-primary/80',
                        )}
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                        {header.column.getCanSort() && (
                          <span className="text-muted-foreground">
                            {header.column.getIsSorted() === 'asc' && (
                              <ArrowUp className="h-4 w-4" />
                            )}
                            {header.column.getIsSorted() === 'desc' && (
                              <ArrowDown className="h-4 w-4" />
                            )}
                            {!header.column.getIsSorted() && (
                              <ArrowUpDown className="h-4 w-4" />
                            )}
                          </span>
                        )}
                      </div>
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                  onClick={() => setSelectedAdvocate(row.original)}
                  className="cursor-pointer hover:bg-muted/85"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination
        table={table}
        pageSize={pageSize}
        setRowsPerPage={setRowsPerPage}
      />
      <DataTableSheet
        data={selectedAdvocate}
        open={!!selectedAdvocate}
        onOpenChange={(open) => !open && setSelectedAdvocate(null)}
      />
    </div>
  );
}

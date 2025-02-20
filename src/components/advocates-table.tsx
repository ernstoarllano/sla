'use client';

import { AdvocatesTablePagination } from '@/components/advocate-table-pagination';
import { AdvocateDetailsSheet } from '@/components/advocates-details-sheet';
import { AdvocatesTableToolbar } from '@/components/advocates-table-toolbar';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { type Advocate } from '@/lib/api';
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
import { useEffect, useState } from 'react';
import { columns } from './advocates-columns';

interface AdvocatesTableProps {
  advocates: Advocate[];
}

export function AdvocatesTable({ advocates }: AdvocatesTableProps) {
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
  });

  useEffect(() => {
    setPagination({
      pageIndex: 0,
      pageSize: rowsPerPage,
    });
  }, [rowsPerPage]);

  return (
    <div className="space-y-4">
      <AdvocatesTableToolbar table={table} />
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="whitespace-nowrap">
                    {header.isPlaceholder ? null : (
                      <div
                        className={
                          header.column.getCanSort()
                            ? 'cursor-pointer select-none'
                            : ''
                        }
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
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
                  className="cursor-pointer hover:bg-muted/50"
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
      <AdvocatesTablePagination
        table={table}
        pageSize={pageSize}
        setRowsPerPage={setRowsPerPage}
      />
      <AdvocateDetailsSheet
        advocate={selectedAdvocate}
        open={!!selectedAdvocate}
        onOpenChange={(open) => !open && setSelectedAdvocate(null)}
      />
    </div>
  );
}

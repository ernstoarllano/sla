import { Table } from '@tanstack/react-table';

import { DataTableRefresh } from '@/components/data-table-refresh';
import { DataTableSearch } from '@/components/data-table-search';
import { DataTableViewOptions } from '@/components/data-table-view-options';

import { type Advocate } from '@/lib/api';

interface DataTableToolbarProps {
  table: Table<Advocate>;
  isFetching?: boolean;
  onRefresh?: () => void;
}

export function DataTableToolbar({
  table,
  isFetching,
  onRefresh,
}: DataTableToolbarProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <DataTableSearch table={table} />
      </div>
      <div className="flex items-center space-x-2">
        <DataTableRefresh isFetching={isFetching} onRefresh={onRefresh} />
        <DataTableViewOptions table={table} />
      </div>
    </div>
  );
}

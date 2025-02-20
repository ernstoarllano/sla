import { Table } from '@tanstack/react-table';

import { DataTableViewOptions } from '@/components/data-table-view-options';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { type Advocate } from '@/lib/api';

interface AdvocatesTableToolbarProps {
  table: Table<Advocate>;
}

export function AdvocatesTableToolbar({ table }: AdvocatesTableToolbarProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Filter by name..."
          value={
            (table.getColumn('firstName')?.getFilterValue() as string) ?? ''
          }
          onChange={(event) =>
            table.getColumn('firstName')?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {(table.getColumn('firstName')?.getFilterValue() as string)?.length >
          0 && (
          <Button
            variant="ghost"
            onClick={() => table.getColumn('firstName')?.setFilterValue('')}
            className="h-8 px-2 lg:px-3"
          >
            Reset
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  );
}

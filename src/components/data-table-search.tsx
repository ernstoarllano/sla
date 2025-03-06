import { Table } from '@tanstack/react-table';
import { Search, X } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { type Advocate } from '@/lib/api';

interface DataTableSearchProps {
  table: Table<Advocate>;
}

export function DataTableSearch({ table }: DataTableSearchProps) {
  const searchValue = table.getState().globalFilter ?? '';

  return (
    <div className="flex items-center gap-2">
      <div className="relative">
        <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search by name, city, or specialty..."
          value={searchValue}
          onChange={(event) => table.setGlobalFilter(event.target.value)}
          className="h-8 w-[150px] pl-8 lg:w-[250px]"
        />
        {searchValue.length > 0 && (
          <Button
            variant="ghost"
            onClick={() => table.setGlobalFilter('')}
            className="absolute right-1 top-1/2 h-6 w-6 -translate-y-1/2 p-1 hover:bg-transparent"
          >
            <X className="h-4 w-4 text-muted-foreground" />
            <span className="sr-only">Clear search</span>
          </Button>
        )}
      </div>
    </div>
  );
}

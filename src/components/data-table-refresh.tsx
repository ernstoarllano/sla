import { RefreshCw } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

import { cn } from '@/lib/utils';

interface DataTableRefreshProps {
  isFetching?: boolean;
  onRefresh?: () => void;
}

export function DataTableRefresh({
  isFetching,
  onRefresh,
}: DataTableRefreshProps) {
  if (!onRefresh) return null;

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="secondary"
            size="sm"
            onClick={onRefresh}
            disabled={isFetching}
            className="flex items-center gap-2 px-3 h-8"
          >
            <RefreshCw
              className={cn('h-4 w-4', isFetching && 'animate-spin')}
            />
            <span className="hidden sm:inline-block">Refresh List</span>
            <span className="sr-only">Refresh advocates list</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Update advocate list with latest data</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

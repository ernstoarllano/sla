'use client';

import { AdvocatesTable } from '@/components/advocates-table';
import { ThemeToggle } from '@/components/theme-toggle';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useAdvocates } from '@/hooks/use-advocates';
import { RefreshCw } from 'lucide-react';

export default function Home() {
  const { data: advocates = [], isFetching, refetch } = useAdvocates();

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <div className="px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div className="space-y-1">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Solace Advocates
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Manage and view all advocates in the system
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="icon"
              onClick={() => refetch()}
              disabled={isFetching}
              className="relative"
            >
              <RefreshCw
                className={`h-4 w-4 ${isFetching ? 'animate-spin' : ''}`}
              />
              <span className="sr-only">Refresh data</span>
            </Button>
            <ThemeToggle />
          </div>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Directory</CardTitle>
          </CardHeader>
          <CardContent>
            {isFetching ? (
              <div className="space-y-3">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
              </div>
            ) : (
              <AdvocatesTable advocates={advocates} />
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  );
}

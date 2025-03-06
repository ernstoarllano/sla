"use client";

import { AdvocatesTable } from "@/components/advocates-table";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useAdvocates } from "@/hooks/use-advocates";

export default function Home() {
  const { data: advocates = [], isFetching, refetch } = useAdvocates();

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <div className="px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div className="space-y-1">
            <h1 className="text-7xl font-bold text-gray-900 dark:text-white font-serif">
              Solace Advocates
            </h1>
            <p className="text-md text-gray-500 dark:text-gray-400">
              Manage and view all advocates in the system
            </p>
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
          </div>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Find Your Healthcare Advocate</CardTitle>
            <CardDescription className="text-neutral-dark-grey">
              Connect with experienced advocates who understand your unique
              healthcare journey
            </CardDescription>
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
              <AdvocatesTable
                advocates={advocates}
                isFetching={isFetching}
                onRefresh={refetch}
              />
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  );
}

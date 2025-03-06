"use client";

import { type ColumnDef } from "@tanstack/react-table";

import { Badge } from "@/components/ui/badge";

import { type Advocate } from "@/lib/api";

export const columns: ColumnDef<Advocate>[] = [
  {
    accessorKey: "firstName",
    header: "First Name",
  },
  {
    accessorKey: "lastName",
    header: "Last Name",
  },
  {
    accessorKey: "city",
    header: "City",
  },
  {
    accessorKey: "specialties",
    header: "Specialties",
    cell: ({ row }) => {
      const specialties = row.getValue("specialties") as string[];
      return (
        <div className="flex flex-wrap gap-1">
          {specialties.slice(0, 2).map((specialty, i) => (
            <Badge key={i} variant="secondary" className="font-normal">
              {specialty}
            </Badge>
          ))}
          {specialties.length > 2 && (
            <Badge variant="outline" className="font-normal">
              +{specialties.length - 2}
            </Badge>
          )}
        </div>
      );
    },
  },
];

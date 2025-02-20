import { Phone } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';

import { type Advocate } from '@/lib/api';

interface AdvocateDetailsSheetProps {
  advocate: Advocate | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AdvocateDetailsSheet({
  advocate,
  open,
  onOpenChange,
}: AdvocateDetailsSheetProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="sm:max-w-[540px]">
        {advocate && (
          <SheetHeader>
            <SheetTitle className="text-xl font-bold">
              {advocate.firstName} {advocate.lastName}
            </SheetTitle>
            <SheetDescription>
              <div className="mt-6 space-y-6">
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-gray-100">
                    Contact Information
                  </h3>
                  <div className="mt-2 space-y-2">
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <Phone className="mr-2 h-4 w-4" />
                      {advocate.phoneNumber}
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium text-gray-900 dark:text-gray-100">
                    Location
                  </h3>
                  <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                    {advocate.city}
                  </p>
                </div>

                <div>
                  <h3 className="font-medium text-gray-900 dark:text-gray-100">
                    Professional Details
                  </h3>
                  <div className="mt-2 space-y-2 text-sm text-gray-500 dark:text-gray-400">
                    <p>Degree: {advocate.degree}</p>
                    <p>Years of Experience: {advocate.yearsOfExperience}</p>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium text-gray-900 dark:text-gray-100">
                    Specialties
                  </h3>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {advocate.specialties.map((specialty, index) => (
                      <Badge key={index} variant="secondary">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </SheetDescription>
          </SheetHeader>
        )}
      </SheetContent>
    </Sheet>
  );
}

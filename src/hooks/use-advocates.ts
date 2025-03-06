import { useQuery } from '@tanstack/react-query';

import { fetchAdvocates, type Advocate } from '@/lib/api';

export function useAdvocates() {
  return useQuery({
    queryKey: ['advocates'],
    queryFn: fetchAdvocates,
  });
}

export function useAdvocatesSearch(advocates: Advocate[], searchTerm: string) {
  return advocates.filter((advocate) => {
    const term = searchTerm.toLowerCase();
    return (
      advocate.firstName.toLowerCase().includes(term) ||
      advocate.lastName.toLowerCase().includes(term) ||
      advocate.city.toLowerCase().includes(term) ||
      advocate.degree.toLowerCase().includes(term) ||
      advocate.specialties.some((s) => s.toLowerCase().includes(term)) ||
      advocate.yearsOfExperience.toString().includes(term)
    );
  });
}

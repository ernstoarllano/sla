import { z } from 'zod';

const advocateSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  city: z.string(),
  degree: z.string(),
  specialties: z.array(z.string()),
  yearsOfExperience: z.number(),
  phoneNumber: z.number(),
});

export type Advocate = z.infer<typeof advocateSchema>;

export async function fetchAdvocates() {
  try {
    const response = await fetch('/api/advocates');

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const json = await response.json();
    console.log('API Response:', json);

    const advocates = z.array(advocateSchema).parse(json.data);
    return advocates;
  } catch (error) {
    console.error('Error fetching advocates:', error);
    throw error;
  }
}

export interface City {
  id: string;
  name: string;
  country: string;
  code: string;
  timezone: string;
}

export const cities: City[] = [
  // Bangladesh
  { id: '1', name: 'Dhaka', country: 'Bangladesh', code: 'DAC', timezone: 'Asia/Dhaka' },
  { id: '2', name: 'Chattogram', country: 'Bangladesh', code: 'CGP', timezone: 'Asia/Dhaka' },
  { id: '3', name: 'Sylhet', country: 'Bangladesh', code: 'ZYL', timezone: 'Asia/Dhaka' },
  { id: '4', name: 'Cox\'s Bazar', country: 'Bangladesh', code: 'CXB', timezone: 'Asia/Dhaka' },
  { id: '5', name: 'Rajshahi', country: 'Bangladesh', code: 'RJH', timezone: 'Asia/Dhaka' },
  
  // International
  { id: '6', name: 'Dubai', country: 'UAE', code: 'DXB', timezone: 'Asia/Dubai' },
  { id: '7', name: 'Singapore', country: 'Singapore', code: 'SIN', timezone: 'Asia/Singapore' },
  { id: '8', name: 'Kuala Lumpur', country: 'Malaysia', code: 'KUL', timezone: 'Asia/Kuala_Lumpur' },
  { id: '9', name: 'Bangkok', country: 'Thailand', code: 'BKK', timezone: 'Asia/Bangkok' },
  { id: '10', name: 'London', country: 'UK', code: 'LHR', timezone: 'Europe/London' },
  { id: '11', name: 'New York', country: 'USA', code: 'JFK', timezone: 'America/New_York' },
  { id: '12', name: 'Los Angeles', country: 'USA', code: 'LAX', timezone: 'America/Los_Angeles' },
  { id: '13', name: 'Toronto', country: 'Canada', code: 'YYZ', timezone: 'America/Toronto' },
  { id: '14', name: 'Sydney', country: 'Australia', code: 'SYD', timezone: 'Australia/Sydney' },
  { id: '15', name: 'Tokyo', country: 'Japan', code: 'NRT', timezone: 'Asia/Tokyo' },
  { id: '16', name: 'Seoul', country: 'South Korea', code: 'ICN', timezone: 'Asia/Seoul' },
  { id: '17', name: 'Mumbai', country: 'India', code: 'BOM', timezone: 'Asia/Kolkata' },
  { id: '18', name: 'Delhi', country: 'India', code: 'DEL', timezone: 'Asia/Kolkata' },
  { id: '19', name: 'Istanbul', country: 'Turkey', code: 'IST', timezone: 'Europe/Istanbul' },
  { id: '20', name: 'Paris', country: 'France', code: 'CDG', timezone: 'Europe/Paris' },
];

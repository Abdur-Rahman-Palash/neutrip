export interface Airline {
  id: string;
  name: string;
  logo: string;
  code: string;
}

export const airlines: Airline[] = [
  {
    id: '1',
    name: 'Biman Bangladesh Airlines',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Biman_Bangladesh_Airlines_logo.svg/200px-Biman_Bangladesh_Airlines_logo.svg.png',
    code: 'BG'
  },
  {
    id: '2',
    name: 'US-Bangla Airlines',
    logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/4/4a/US-Bangla_Airlines_logo.svg/200px-US-Bangla_Airlines_logo.svg.png',
    code: 'BS'
  },
  {
    id: '3',
    name: 'Novoair',
    logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/4/4a/NovoAir_logo.svg/200px-NovoAir_logo.svg.png',
    code: 'VQ'
  },
  {
    id: '4',
    name: 'Air Arabia',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Air_Arabia_logo.svg/200px-Air_Arabia_logo.svg.png',
    code: 'G9'
  },
  {
    id: '5',
    name: 'Emirates',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Emirates_logo.svg/200px-Emirates_logo.svg.png',
    code: 'EK'
  },
  {
    id: '6',
    name: 'Qatar Airways',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Qatar_Airways_logo.svg/200px-Qatar_Airways_logo.svg.png',
    code: 'QR'
  },
  {
    id: '7',
    name: 'Singapore Airlines',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/Singapore_Airlines_logo.svg/200px-Singapore_Airlines_logo.svg.png',
    code: 'SQ'
  },
  {
    id: '8',
    name: 'Thai Airways',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Thai_Airways_Logo.svg/200px-Thai_Airways_Logo.svg.png',
    code: 'TG'
  },
  {
    id: '9',
    name: 'Malindo Air',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Malindo_Air_logo.svg/200px-Malindo_Air_logo.svg.png',
    code: 'OD'
  },
  {
    id: '10',
    name: 'Fly Dubai',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Flydubai_logo.svg/200px-Flydubai_logo.svg.png',
    code: 'FZ'
  }
];

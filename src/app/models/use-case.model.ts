// Use case models for the Digital Twin Analytics Platform

export interface UseCase {
  id: number;
  titleKey: string;
  locationKey: string;
  partnerKey: string;
  descriptionKey: string;
  icon: string;
  iconColor: string;
  active: boolean;
}

// Predefined use cases
export const USE_CASES: UseCase[] = [
  {
    id: 1,
    titleKey: 'useCases.cases.grain.title',
    locationKey: 'useCases.cases.grain.location',
    partnerKey: 'useCases.cases.grain.partner',
    descriptionKey: 'useCases.cases.grain.description',
    icon: 'wheat',
    iconColor: '#3d7c7a',
    active: true
  },
  {
    id: 2,
    titleKey: 'useCases.cases.fruits.title',
    locationKey: 'useCases.cases.fruits.location',
    partnerKey: 'useCases.cases.fruits.partner',
    descriptionKey: 'useCases.cases.fruits.description',
    icon: 'apple',
    iconColor: '#2d8b89',
    active: true
  },
  {
    id: 3,
    titleKey: 'useCases.cases.fish.title',
    locationKey: 'useCases.cases.fish.location',
    partnerKey: 'useCases.cases.fish.partner',
    descriptionKey: 'useCases.cases.fish.description',
    icon: 'fish',
    iconColor: '#2d6b6a',
    active: true
  },
  {
    id: 4,
    titleKey: 'useCases.cases.aquaculture.title',
    locationKey: 'useCases.cases.aquaculture.location',
    partnerKey: 'useCases.cases.aquaculture.partner',
    descriptionKey: 'useCases.cases.aquaculture.description',
    icon: 'droplet',
    iconColor: '#3d8b8a',
    active: false
  },
  {
    id: 5,
    titleKey: 'useCases.cases.dairy.title',
    locationKey: 'useCases.cases.dairy.location',
    partnerKey: 'useCases.cases.dairy.partner',
    descriptionKey: 'useCases.cases.dairy.description',
    icon: 'milk',
    iconColor: '#4a7c7a',
    active: false
  }
];

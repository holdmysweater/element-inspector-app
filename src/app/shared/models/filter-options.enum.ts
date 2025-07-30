export enum SortDirection {
  Asc = 'sort.direction.asc',
  Desc = 'sort.direction.desc'
}

export enum SortField {
  Name = 'name',
  CreationDate = 'creationDate',
  DueDate = 'dueDate'
}

export const SortDirectionIconsByField = {
  [SortField.Name]: {
    [SortDirection.Asc]: 'arrow-down-a-z',
    [SortDirection.Desc]: 'arrow-up-z-a'
  },
  [SortField.CreationDate]: {
    [SortDirection.Asc]: 'arrow-down-0-1',
    [SortDirection.Desc]: 'arrow-up-1-0'
  },
  [SortField.DueDate]: {
    [SortDirection.Asc]: 'arrow-down-0-1',
    [SortDirection.Desc]: 'arrow-up-1-0'
  }
} as const;

export const SortFieldIcons = {
  [SortField.Name]: 'letter-text',
  [SortField.CreationDate]: 'calendar-plus',
  [SortField.DueDate]: 'calendar-check',
} as const;

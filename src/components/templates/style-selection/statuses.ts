export const STYLE_CARD_STATUS_MAPPING = {
  NOT_PAID: '951f252d-972d-460b-80a0-bb82ea67c70e',
  BASIC: 'ec64a36b-15db-477a-9bfc-01dd02eb0807',
  PLUS: '59a90645-9c6c-4332-8894-9c4ef6b7b1a8',
  HEAT: '9ff56f5c-4325-4a3a-a965-e8e63b326947',
} as const;

export type StatusType = keyof typeof STYLE_CARD_STATUS_MAPPING;

export const STATUS_MAPPING: Record<number, string> = {
  0: '951f252d-972d-460b-80a0-bb82ea67c70e', // Не оплачен
  4590: 'ec64a36b-15db-477a-9bfc-01dd02eb0807', // Basic
  9990: '59a90645-9c6c-4332-8894-9c4ef6b7b1a8', // Plus
  17590: '9ff56f5c-4325-4a3a-a965-e8e63b326947', // Heat
};

export type RequestOrderType = {
  service?: string | undefined | null;
  name: string;
  phone: string;
  type: 'order' | 'consultation';
}

export type User = {
  id: string;
  email: string | undefined;
  password?: string;
  confirm_password?: string;
};

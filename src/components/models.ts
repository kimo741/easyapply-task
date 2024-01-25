
export interface Posts {
  body: string;
  id: number | string;
  title: string;
  userId: number | string;
}

export interface Users {
  id: string;
  name: string;
  username: string;
  address: object;
  email: string;
  phone: string | number;
  website: string;
  company: object;
}

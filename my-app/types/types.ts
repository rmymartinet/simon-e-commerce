import { Session } from 'next-auth';

export interface BetterAuthSession extends Session {
  user: {
    id: string;
    name: string;
    email: string;
    emailVerified: boolean;
    image?: string | null;
    createdAt: Date;
    updatedAt: Date;
  };
}

export interface CartItemProps {
  type: string;
  priceId?: string;
  imageUrl: string;
  mostPopular?: boolean;
  titlePlan: string;
  month: number;
  price: number;
  description?: string;
  discount?: string;
  includes?: string[];
  bgColor?: boolean;
  dayPrice?: string;
}

export interface UserDataProps {
  id: string;
  email: string;
  name: string;
  // Add other user properties as needed
}

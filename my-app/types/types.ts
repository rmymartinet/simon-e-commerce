import { motion } from "framer-motion";


export interface PurchaseItemProps {
  id: string;
  createdAt: Date;
  amount: number;
  subscriptionData: SubscriptionDataProps | null;
  userPurchaseData: ProgramDataPros | null;
}

export interface SubscriptionDataProps {
  id: string;
  purchaseId: string;
  titlePlan: string;
  startDate: Date;
  endDate: Date;
  status: string;
}

export interface ProgramDataPros {
  id: string;
  purchaseId: string;
  titlePlan: string;
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
  quantity?: number;
}

export interface UserDataProps {
  id: string;
  name: string | null;
  email: string;
  emailVerified: boolean;
  image: string | null;
  createdAt: Date;
  updatedAt: Date;
  stripeCustomerId: string | null;
  isSubscribed: boolean;
  subscriptionId: string | null;
  subscriptionEndDate: Date | null;
  Purchase: PurchaseItemProps[];
}

export interface CartContextProps {
  cart: CartItemProps[];
  setCart: React.Dispatch<React.SetStateAction<CartItemProps[]>>;
  updateCartQuantity: (itemId: string, newQuantity: number) => void;
  clearCart: () => void;
}

export interface CheckoutData {
  productData: CartItemProps[];
  filterName: string;
  total: number;
}

export interface CheckoutContextValue {
    checkoutData: CheckoutData | null;
    setCheckoutData: (data: CheckoutData | null) => void;
}



export interface AddToCartButtonProps {
  productData: ProductDataProps;
  isHighlighted: boolean;
}

export interface AuthContextType {
  user: { id: string; name: string; email: string } | null;
}

export interface AvailableOffersProps {
  title: string;
  follow: string;
  subtitle: string;
  features: string[];
}

export interface BackgroundYoutubeImgProps {
  iphoneRef: React.RefObject<HTMLDivElement | null>;
  imagesRefs: React.RefObject<(HTMLDivElement | null)[]>;
}

export interface BlogCardProps {
  width: string;
  imgSrc: string;
  title: string;
  subtitle: string;
  text: string;
}

export interface CardPriceProps {
  productData: ProductDataProps;
  filterName: string;
  session: BetterAuthSession | null;
  isHighlighted: boolean;
}

export interface CartContextProps {
  cart: CartItemProps[];
  setCart: React.Dispatch<React.SetStateAction<CartItemProps[]>>;
  updateCartQuantity: (itemId: string, newQuantity: number) => void;

  clearCart: () => void;
}

export interface CheckoutContextValue {
  checkoutData: CheckoutData | null;
  setCheckoutData: (data: CheckoutData | null) => void;
}

export interface CircleChartProps {
  data: {
    carbs: number;
    proteins: number;
    fats: number;
  };
}

export interface ContentSideFeaturesProps {
  title: string;
  description: string;
  titleRight: string;
  descriptionRight: string;
  titleLeft: string;
  descriptionLeft: string;
}

export interface EmbeddedCheckoutFormProps {
  closeButton: (show: boolean) => void;
  guest: boolean;
}

export interface FeedBackCardProps {
  firstName: string;
  imgUrl: string;
  text: string;
}

export interface FeaturesContainerProps {
  coaching: boolean;
  title: string;
  text: string;
  children: React.ReactNode;
}

export interface FilterBlogProps {
  posts: Post[];
  filteredPosts: string;
  setFilteredPosts: (tag: string) => void;
  clickedIndex: number;
  setClickedIndex: (index: number) => void;
}

export interface FilterProps {
  filterName: string;
  setFilterName: (name: string) => void;
}

export interface FormDataProps {
  grams: Grams;
  totalCalories: number;
  BMR: number;
}

export interface FormInputData {
  genre: string;
  setGenre: (genre: string) => void;
  age: number;
  setAge: (age: number) => void;
  height: number;
  setHeight: (height: number) => void;
  setWeight: (weight: number) => void;
  weight: number;
  targetWeight: number;
  activities: string;
  setTargetWeight: (targetWeight: number) => void;
  setActivities: (activities: string) => void;
  goals: string;
  setGoals: (goals: string) => void;
  weightChange: number;
  setWeightChange: (weightLoss: number) => void;
  bodyFatMode: boolean;
  setBodyFatMode: (mode: boolean) => void;
  trainingDays: number;
  setTrainingDays: (days: number) => void;
  sessionDuration: number;
  setSessionDuration: (duration: number) => void;
  intensity: string;
  setIntensity: (intensity: string) => void;
}

export interface FormProps {
  showResults: boolean;
  setShowResults: (show: boolean) => void;
  data: FormDataProps;
  inputData: FormInputData;
}

export interface Grams {
  carbs: {
    min: number;
    max: number;
  };
  proteins: {
    min: number;
    max: number;
  };
  fats: {
    min: number;
    max: number;
  };
}

export interface HandleActionProps {
  productData: ProductDataProps;
  filterName: string;
  setShowConnexion: (value: boolean) => void;
}

export interface ItemsFeaturesProps {
  logo: React.ReactNode;
  title: string;
  paragraph: string;
}

export interface LineChartWeightProps {
  startWeight: number;
  weightChange: number;
  targetWeight: number;
}

export interface OverviewFeatureLayoutProps {
  featureLayoutContent: ContentSideFeaturesProps;
  gradient?: string;
  isCoaching: boolean;
}

export interface OverviewLeftAndRightFeaturesProps {
  isCoaching: boolean;
  title: string;
  text: string;
}

export interface OverviewSectionProps {
  gradient?: string;
  bgColor?: string;
  titleContent?: string;
  descriptionContent?: string;
  featureLayoutContent: ContentSideFeaturesProps;
  isCoaching: boolean;
  children?: React.ReactNode;
  headerProps: OverViewHeaderProps;
}

export interface OverViewHeaderProps {
  logo: React.ReactNode;
  title: string;
  subtitle: string;
  description: string;
}

export interface Post {
  _id: string;
  title: string;
  image: string;
  slug: { current: string };
  publishedAt: string;
  teaser: string;
  tags: string[];
}

export interface ProductDataProps {
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

export interface PurpleLightProps {
  yposition?: string;
  xposition?: string;
  width: string;
  height: string;
}

export interface StarsProps {
  yposition: string;
  xposition: string;
  height: string;
  weight: string;
  isTop: boolean;
}

export interface StepCardProps {
  step: number;
  title: string;
  content: string;
  bgClass?: string;
  children: React.ReactNode;
}

export interface PurchaseItemProps {
  id: string;
  createdAt: Date;
  amount: number;
  subscriptionData: SubscriptionDataProps | null;
  userPurchaseData: ProgramDataPros | null;
}

export interface SubscriptionDataProps {
  id: string;
  purchaseId: string;
  titlePlan: string;
  startDate: Date;
  endDate: Date;
  status: string;
}

export interface ProgramDataPros {
  id: string;
  purchaseId: string;
  titlePlan: string;
}

export interface SubscriptionInfosProps {
  amount: number;
  subscriptionPlan: string;
  startDate: string | undefined;
  endDate: string | undefined;
  nextPaymentDate: string;
  isSubscribed: boolean;
}

export interface LayoutTransitionProps {
  children: React.ReactNode;
  className?: React.ComponentProps<typeof motion.div>["className"];
  style?: React.ComponentProps<typeof motion.div>["style"];
}

export type Step1_UserInfoProps = {
  formState: {
    genre: string;
    age: number;
    height: number;
    weight: number;
    activities: number;
    bodyFatMode: string;
    trainingDays: number;
    sessionDuration: number;
    intensity: number;
  };

  
  updateField: (
    field: keyof Step1_UserInfoProps["formState"],
    value: string | number,
  ) => void;
  errors: { [key: string]: string };
  setErrors: (errors: { [key: string]: string }) => void;
  setFormIsValid: (isValid: boolean) => void;
};

export type Step2_UserGoalsProps = {
  formState: {
    genre: string;
    age: number;
    height: number;
    weight: number;
    activities: number;
    bodyFatMode: string;
    trainingDays: number;
    sessionDuration: number;
    intensity: number;
  };
  setTotalCalories: React.Dispatch<React.SetStateAction<number>>;
  formIsValid: boolean;
  setTotalCaloriesTraining: React.Dispatch<React.SetStateAction<number>>;
  setTotalCaloriesRest: React.Dispatch<React.SetStateAction<number>>;
  setTrainingMacros: React.Dispatch<
    React.SetStateAction<{
      carbs: number;
      proteins: number;
      fats: number;
    } | null>
  >;
  setRestMacros: React.Dispatch<
    React.SetStateAction<{
      carbs: number;
      proteins: number;
      fats: number;
    } | null>
  >;
  goals: {
    carbs: number;
    proteins: number;
    fats: number;
  } | null;
  isTrainingDay: boolean;
  setIsTrainingDay: React.Dispatch<React.SetStateAction<boolean>>;
};

export type Step3UserDietProps = {
  setGoals: (macros: { carbs: number; proteins: number; fats: number }) => void;
};

export type Step4_ResultProps = {
  goalsTraining: { carbs: number; proteins: number; fats: number } | null;
  goalsRest: { carbs: number; proteins: number; fats: number } | null;
  totalCaloriesTraining: number;
  totalCaloriesRest: number;
  formIsValid: boolean;
  goals: { carbs: number; proteins: number; fats: number } | null;
  isTrainingDay: boolean;
  setIsTrainingDay: (isTrainingDay: boolean) => void;
};

export interface BetterAuthSession {
  session: {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    userId: string;
    expiresAt: Date;
    token: string;
    ipAddress?: string | null;
    userAgent?: string | null;
  };
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

export interface Invoice {
  id: string;
  number: string;
  created: number;
  amount_paid: number;
  invoice_pdf: string;
}

export interface AddToCartButtonProps {
  productData: ProductDataProps;
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
}

export interface CartContextProps {
  cart: CartItemProps[];
  setCart: React.Dispatch<React.SetStateAction<CartItemProps[]>>;
  isOpen: boolean; // Ajoutez cette ligne
  setIsOpen: (isOpen: boolean) => void;
  updateCartQuantity: (itemId: string, newQuantity: number) => void;
}

export interface CartItemProps {
  id: string;
  type: string;
  price: number;
  quantity?: number;
  titlePlan: string;
  img?: string;
}

export interface CheckoutContextValue {
  checkoutData: CheckoutData | null;
  setCheckoutData: (data: CheckoutData) => void;
}

export interface CheckoutData {
  productData: ProductDataProps;
  filterName: string;
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
  id: string;
  priceId?: string;
  imageUrl: string;
  mostPopular?: boolean;
  titlePlan: string;
  month: number;
  price: number;
  description: string;
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

export interface useAddToCartProps {
  type: string;
  id: string;
  titlePlan: string;
  img: string;
  price: number;
  month: number;
}

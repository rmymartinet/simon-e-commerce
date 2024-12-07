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

export interface CardPriceProps {
  title: string;
  mounth?: string;
  price: string;
  text: string;
  discount?: string;
  includes?: string[];
  bgColor?: boolean;
  dayPrice?: string;
}

export interface FeaturesContainerProps {
  title: string;
  text: string;
  children: React.ReactNode;
}

export interface FormProps {
  data: FormDataProps;
  inputData: FormInputData;
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

export interface FeedBackCardProps {
  firstName: string;
  imgUrl: string;
  text: string;
}

export interface AvailableOffersProps {
  title: string;
  follow: string;
  subtitle: string;
  features: string[];
}

export interface BlogCardProps {
  width: string;
  imgSrc: string;
  title: string;
  subtitle: string;
  text: string;
}

export interface LineChartWeightProps {
  startWeight: number;
  weightChange: number;
  targetWeight: number;
}

export interface StepCardProps {
  step: number;
  title: string;
  content: string;
  bgClass?: string;
  children: React.ReactNode;
}

export interface ItemsFeaturesProps {
  logo: React.ReactNode;
  title: string;
  paragraph: string;
}

export interface FilterProps {
  filterName: string;
  setFilterName: (name: string) => void;
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

export interface FilterBlogProps {
  posts: Post;
  filteredPosts: string;
  setFilteredPosts: React.Dispatch<React.SetStateAction<string>>;
  clickedIndex: number | null;
  setClickedIndex: (index: number | null) => void;
}

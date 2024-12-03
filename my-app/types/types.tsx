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
  gradient: string;
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

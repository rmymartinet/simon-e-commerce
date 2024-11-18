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
}

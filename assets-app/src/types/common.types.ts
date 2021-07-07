export enum AssetClass {
  CREDIT = "Credit",
  EQUITIES = "Equities",
  MACRO = "Macro",
}

export interface Asset {
  ticker: string;
  price: number;
  assetClass: AssetClass;
}

export enum SortDirection {
  ASC = "ascending",
  DESC = "descending",
}

export type ConfigParameters = {
  priority: number;
  className: string;
};

export type AssetColumnConfig = {
  [AssetClass.CREDIT]: ConfigParameters;
  [AssetClass.EQUITIES]: ConfigParameters;
  [AssetClass.MACRO]: ConfigParameters;
};

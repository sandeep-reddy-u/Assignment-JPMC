import {
  Asset,
  AssetClass,
  AssetColumnConfig,
  SortDirection,
} from "../types/common.types";

export const columns: {
  property: keyof Asset;
  displayValue: string;
}[] = [
  { property: "assetClass", displayValue: "Asset Class" },
  { property: "price", displayValue: "Price" },
  { property: "ticker", displayValue: "Ticker" },
];

const AssetClassConfig: AssetColumnConfig = {
  [AssetClass.EQUITIES]: {
    priority: 1,
    color: "blue",
  },
  [AssetClass.MACRO]: {
    priority: 2,
    color: "white",
  },
  [AssetClass.CREDIT]: {
    priority: 3,
    color: "green",
  },
};

export function getCompareFunction(
  sortBy: keyof Asset,
  sortDirection: SortDirection
) {
  if (sortBy === "assetClass") {
    return (a: Asset, b: Asset) => {
      const aConfig = AssetClassConfig[a.assetClass],
        bConfig = AssetClassConfig[b.assetClass];

      return sortDirection === SortDirection.ASC
        ? aConfig.priority - bConfig.priority
        : bConfig.priority - aConfig.priority;
    };
  } else {
    return (a: Asset, b: Asset) => {
      if (a[sortBy] > b[sortBy]) {
        return sortDirection === SortDirection.ASC ? 1 : -1;
      }
      if (a[sortBy] < b[sortBy]) {
        return sortDirection === SortDirection.ASC ? -1 : 1;
      }
      return 0;
    };
  }
}

export function getTableColumnHeaderClass(
  property: keyof Asset,
  sortParams: { sortBy: keyof Asset | undefined; sortDirection: SortDirection }
) {
  if (property === sortParams.sortBy) {
    return sortParams.sortDirection;
  }
  return "";
}

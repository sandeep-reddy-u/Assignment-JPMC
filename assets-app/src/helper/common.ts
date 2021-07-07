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

export const AssetClassConfig: AssetColumnConfig = {
  [AssetClass.EQUITIES]: {
    priority: 1,
    className: "bg-primary color-white",
  },
  [AssetClass.MACRO]: {
    priority: 2,
    className: "",
  },
  [AssetClass.CREDIT]: {
    priority: 3,
    className: "bg-success color-white",
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

export function getTableCellClass(asset: Asset, property: keyof Asset) {
  if (property === "price") {
    if (asset.price > 0) {
      return "text-primary price";
    }
    if (asset.price < 0) {
      return "text-danger price";
    }
    return "price";
  }
}

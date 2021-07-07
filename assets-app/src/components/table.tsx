import { MouseEvent, useEffect, useState } from "react";
import sampleData from "../data/sampleData.json";
import {
  columns,
  getCompareFunction,
  getTableColumnHeaderClass,
} from "../helper/common";
import { Asset, SortDirection } from "../types/common.types";

const assetsData = sampleData as Asset[];

export default function Table() {
  const [data, setData] = useState<Asset[]>(assetsData);

  const [sortBy, setSortBy] = useState<keyof Asset>();
  const [sortDirection, setSortDirection] = useState(SortDirection.ASC);

  useEffect(() => {
    if (sortBy === undefined) {
      setData(assetsData);
    } else {
      const data = [...assetsData];
      data.sort(getCompareFunction(sortBy, sortDirection));
      setData(data);
    }
  }, [sortBy, sortDirection]);

  function onHeaderClick(ev: MouseEvent<HTMLTableHeaderCellElement>) {
    const headerElement = ev.target as Element;
    const column = headerElement.getAttribute(
      "data-column-property"
    ) as keyof Asset;

    if (sortBy === column) {
      if (sortDirection === SortDirection.ASC) {
        setSortDirection(SortDirection.DESC);
      } else {
        setSortBy(undefined);
      }
    } else {
      setSortBy(column);
      setSortDirection(SortDirection.ASC);
    }
  }

  return (
    <section>
      {data.length > 0 ? (
        <table>
          <thead>
            <tr>
              {columns.map((column) => (
                <th
                  key={"header_" + column.property}
                  onClick={onHeaderClick}
                  data-column-property={column.property}
                  className={getTableColumnHeaderClass(column.property, {
                    sortBy,
                    sortDirection,
                  })}
                >
                  {column.displayValue}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((asset) => (
              <tr key={"row_" + asset.assetClass + "_" + asset.ticker}>
                {columns.map((column) => (
                  <td key={"cell_" + column.property}>
                    {asset[column.property]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        "No assets found"
      )}
    </section>
  );
}

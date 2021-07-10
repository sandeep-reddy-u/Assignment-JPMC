import {
  render,
  screen,
  cleanup,
  getByTestId,
  fireEvent,
} from "@testing-library/react";
import Table from "../table";
import assetsData from "../../../data/sampleData.json";
import { Asset, AssetClass } from "../../../types/common.types";
import { AssetClassConfig, columns } from "../../../helper/common";

afterEach(cleanup);

test("Show 'No assets found' text when assets list is empty", async () => {
  render(<Table assetsData={[]} />);

  const noAssetsTextElement = screen.getByText("No assets found");
  expect(noAssetsTextElement).toBeInTheDocument();

  const tableElement = screen.queryByTestId("assets-table");
  expect(tableElement).not.toBeInTheDocument();
});

test("Do not show 'No assets found' text when assets list is not empty", async () => {
  render(<Table assetsData={assetsData as Asset[]} />);

  const noAssetsTextElement = screen.queryByText("No assets found");
  expect(noAssetsTextElement).not.toBeInTheDocument();
});

test("Do not render table when assets list is empty", async () => {
  render(<Table assetsData={[]} />);

  const tableElement = screen.queryByTestId("assets-table");
  expect(tableElement).not.toBeInTheDocument();
});

test("Render table when assets list is empty", async () => {
  render(<Table assetsData={assetsData as Asset[]} />);

  const tableElement = screen.queryByTestId("assets-table");
  expect(tableElement).toBeInTheDocument();
});

test("Render table headers - assetClass, price, ticker", async () => {
  render(<Table assetsData={assetsData as Asset[]} />);

  columns.forEach((column) => {
    const columnHeaderElement = screen.getByTestId(
      `column-header-${column.property}`
    );
    expect(columnHeaderElement).toHaveTextContent(column.displayValue);
  });
});

test("Each row should display the correct data of asset", async () => {
  const { container } = render(<Table assetsData={assetsData as Asset[]} />);

  assetsData.forEach((asset, rowIndex) => {
    getByTestId(container, `row-${rowIndex}`);

    columns.forEach((column, columnIndex) => {
      const cell = getByTestId(container, `cell-${rowIndex}-${columnIndex}`);
      expect(cell.innerHTML).toEqual(asset[column.property] + "");
    });
  });
});

test("Sort by 'Assert Class' column ascending", () => {
  const { container } = render(<Table assetsData={assetsData as Asset[]} />);

  fireEvent.click(getByTestId(container, "column-header-assetClass"));
  for (let i = 1; i < assetsData.length; i++) {
    getByTestId(container, `row-${i}`);
    const previousCell = getByTestId(container, `cell-${i - 1}-${0}`);
    const currentCell = getByTestId(container, `cell-${i}-${0}`);

    const previousCellPriority =
      AssetClassConfig[previousCell.innerHTML as AssetClass].priority;
    const currentCellPriority =
      AssetClassConfig[currentCell.innerHTML as AssetClass].priority;

    expect(previousCellPriority).toBeDefined();
    expect(currentCellPriority).toBeDefined();
    expect(previousCellPriority).toBeLessThanOrEqual(currentCellPriority);
  }
});

test("Sort by 'Assert Class' column descending", () => {
  const { container } = render(<Table assetsData={assetsData as Asset[]} />);

  fireEvent.click(getByTestId(container, "column-header-assetClass"));
  fireEvent.click(getByTestId(container, "column-header-assetClass"));

  for (let i = 1; i < assetsData.length; i++) {
    getByTestId(container, `row-${i}`);
    const previousCell = getByTestId(container, `cell-${i - 1}-${0}`);
    const currentCell = getByTestId(container, `cell-${i}-${0}`);

    const previousCellPriority =
      AssetClassConfig[previousCell.innerHTML as AssetClass].priority;
    const currentCellPriority =
      AssetClassConfig[currentCell.innerHTML as AssetClass].priority;

    expect(previousCellPriority).toBeDefined();
    expect(currentCellPriority).toBeDefined();
    expect(previousCellPriority).toBeGreaterThanOrEqual(currentCellPriority);
  }
});

test("Sort by 'price' column ascending", () => {
  const { container } = render(<Table assetsData={assetsData as Asset[]} />);

  fireEvent.click(getByTestId(container, "column-header-price"));

  for (let i = 1; i < assetsData.length; i++) {
    getByTestId(container, `row-${i}`);
    const previousCell = getByTestId(container, `cell-${i - 1}-${1}`);
    const currentCell = getByTestId(container, `cell-${i}-${1}`);

    expect(previousCell.innerHTML).not.toBeNaN();
    expect(currentCell.innerHTML).not.toBeNaN();
    expect(Number(previousCell.innerHTML)).toBeLessThanOrEqual(
      Number(currentCell.innerHTML)
    );
  }
});

test("Sort by 'price' column descending", () => {
  const { container } = render(<Table assetsData={assetsData as Asset[]} />);

  fireEvent.click(getByTestId(container, "column-header-price"));
  fireEvent.click(getByTestId(container, "column-header-price"));

  for (let i = 1; i < assetsData.length; i++) {
    getByTestId(container, `row-${i}`);
    const previousCell = getByTestId(container, `cell-${i - 1}-${1}`);
    const currentCell = getByTestId(container, `cell-${i}-${1}`);

    expect(previousCell.innerHTML).not.toBeNaN();
    expect(currentCell.innerHTML).not.toBeNaN();
    expect(Number(previousCell.innerHTML)).toBeGreaterThanOrEqual(
      Number(currentCell.innerHTML)
    );
  }
});

test("Sort by 'ticker' column ascending", () => {
  const { container } = render(<Table assetsData={assetsData as Asset[]} />);

  fireEvent.click(getByTestId(container, "column-header-ticker"));

  for (let i = 1; i < assetsData.length; i++) {
    getByTestId(container, `row-${i}`);
    const previousCell = getByTestId(container, `cell-${i - 1}-${2}`);
    const currentCell = getByTestId(container, `cell-${i}-${2}`);

    expect(previousCell.innerHTML <= currentCell.innerHTML).toBe(true);
  }
});

test("Sort by 'ticker' column descending", () => {
  const { container } = render(<Table assetsData={assetsData as Asset[]} />);

  fireEvent.click(getByTestId(container, "column-header-ticker"));
  fireEvent.click(getByTestId(container, "column-header-ticker"));

  for (let i = 1; i < assetsData.length; i++) {
    getByTestId(container, `row-${i}`);
    const previousCell = getByTestId(container, `cell-${i - 1}-${2}`);
    const currentCell = getByTestId(container, `cell-${i}-${2}`);

    expect(previousCell.innerHTML >= currentCell.innerHTML).toBe(true);
  }
});

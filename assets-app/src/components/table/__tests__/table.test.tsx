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

describe("Should assets table", () => {
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

  test("Render table when assets list is not empty", async () => {
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

  describe("Sort assets table by", () => {
    test("'Assert Class' column in ascending order on 'Assert Class' header click once", () => {
      const { container } = render(
        <Table assetsData={assetsData as Asset[]} />
      );

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

    test("'Assert Class' column in descending order on 'Assert Class' header click twice", () => {
      const { container } = render(
        <Table assetsData={assetsData as Asset[]} />
      );

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
        expect(previousCellPriority).toBeGreaterThanOrEqual(
          currentCellPriority
        );
      }
    });

    test("'Price' column in ascending order on 'Price' header click once", () => {
      const { container } = render(
        <Table assetsData={assetsData as Asset[]} />
      );

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

    test("'Price' column in descending order on 'Price' header click twice", () => {
      const { container } = render(
        <Table assetsData={assetsData as Asset[]} />
      );

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

    test("'Ticker' column in ascending order on 'Ticker' header click once", () => {
      const { container } = render(
        <Table assetsData={assetsData as Asset[]} />
      );

      fireEvent.click(getByTestId(container, "column-header-ticker"));

      for (let i = 1; i < assetsData.length; i++) {
        getByTestId(container, `row-${i}`);
        const previousCell = getByTestId(container, `cell-${i - 1}-${2}`);
        const currentCell = getByTestId(container, `cell-${i}-${2}`);

        expect(previousCell.innerHTML <= currentCell.innerHTML).toBe(true);
      }
    });

    test("'Ticker' column in descending order on 'Ticker' header click twice", () => {
      const { container } = render(
        <Table assetsData={assetsData as Asset[]} />
      );

      fireEvent.click(getByTestId(container, "column-header-ticker"));
      fireEvent.click(getByTestId(container, "column-header-ticker"));

      for (let i = 1; i < assetsData.length; i++) {
        getByTestId(container, `row-${i}`);
        const previousCell = getByTestId(container, `cell-${i - 1}-${2}`);
        const currentCell = getByTestId(container, `cell-${i}-${2}`);

        expect(previousCell.innerHTML >= currentCell.innerHTML).toBe(true);
      }
    });
  });

  test("should show price in blue color if positive and red color if negative and default color if zero", () => {
    const { container } = render(<Table assetsData={assetsData as Asset[]} />);

    for (let i = 0; i < assetsData.length; i++) {
      getByTestId(container, `row-${i}`);
      const priceElement = getByTestId(container, `cell-${i}-${1}`);

      expect(priceElement.innerHTML).not.toBeNaN();

      expect(priceElement).toHaveClass(
        Number(priceElement.innerHTML) > 0
          ? "text-primary price"
          : Number(priceElement.innerHTML) < 0
          ? "text-danger price"
          : "price",
        { exact: true }
      );
    }
  });
});

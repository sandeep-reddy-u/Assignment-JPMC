import assetsData from "../data/sampleData.json";

enum AssetClass {
  CREDIT = "Credit",
  EQUITIES = "Equities",
  MACRO = "Macro",
}
interface Asset {
  ticker: string;
  price: number;
  assetClass: AssetClass;
}

export default function Table() {
  const data = assetsData as Asset[];
  return (
    <section>
      {data.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Asset Class</th>
              <th>Price</th>
              <th>Ticker</th>
            </tr>
          </thead>
          <tbody>
            {data.map((asset) => (
              <tr>
                <td>{asset.assetClass}</td>
                <td>{asset.price}</td>
                <td>{asset.ticker}</td>
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

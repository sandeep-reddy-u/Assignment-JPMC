import "./App.scss";
import Header from "./components/header/header";
import Table from "./components/table/table";
import sampleData from "./data/sampleData.json";
import { Asset } from "./types/common.types";

function App() {
  return (
    <div className="App">
      <Header />
      <Table assetsData={sampleData as Asset[]} />
    </div>
  );
}

export default App;

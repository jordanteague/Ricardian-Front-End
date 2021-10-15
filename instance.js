import web3 from "./web3";
import RicardianLLC from "./artifacts/contracts/RicardianLLC.sol/RicardianLLC.json";

const instance = new web3.eth.Contract(
  RicardianLLC.abi,
  "0xf5f0e310d54b0731a86c378b21b7b3c6a69255e1"
);

export default instance;

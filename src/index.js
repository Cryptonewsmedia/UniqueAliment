import Portis from "@portis/web3";
import Web3 from "web3";
import EthSigUtil from "eth-sig-util";

const portis = new Portis("211b48db-e8cc-4b68-82ad-bf781727ea9e", "rinkeby");
const web3 = new Web3(portis.provider);

(async () => {
  const accounts = await web3.eth.getAccounts();
  print(`Wallet address: ${accounts[0].toLowerCase()}`);

  const message = "Hello World!";
  const messageHex = "0x" + new Buffer(message, "utf8").toString("hex");
  const signedMessage = await web3.currentProvider.send("personal_sign", [
    messageHex,
    accounts[0]
  ]);
  print(`Signed message: ${signedMessage}`);

  const recovered = EthSigUtil.recoverPersonalSignature({
    data: messageHex,
    sig: signedMessage
  });
  print(
    `Recovered successfully: ${recovered.toLowerCase() ===
      accounts[0].toLowerCase()}`
  );
})();

function print(str) {
  const p = document.createElement("p");
  p.innerText = str;
  document.getElementById("app").appendChild(p);
}

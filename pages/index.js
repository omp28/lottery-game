import { useState } from "react";
import Web3Modal from "web3modal";
import { ethers } from "ethers";
import EnterLottery from "../components/EnterLottery";
import ParticipantsTable from "../components/ParticipantsTable";
import WinnersDisplay from "../components/WinnersDisplay";

export default function Home() {
  const [walletAddress, setWalletAddress] = useState("");
  const [participants, setParticipants] = useState([]);
  const [winners, setWinners] = useState([]);

  const connectWallet = async () => {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const address = await signer.getAddress();
    setWalletAddress(address);
  };

  const addParticipant = (address) => {
    setParticipants([...participants, address]);
  };

  const drawWinners = () => {
    const shuffled = participants.sort(() => 0.5 - Math.random());
    const selectedWinners = shuffled.slice(0, 3).map((address, index) => ({
      address,
      prize: ethers.utils.parseEther((0.00001 + index * 0.000005).toString()),
    }));
    setWinners(selectedWinners);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 ">
      <button
        className="px-4 py-2 text-white bg-blue-500 rounded"
        onClick={connectWallet}
      >
        Connect Wallet
      </button>
      {walletAddress && <p className=" py-4">Connected: {walletAddress}</p>}
      {walletAddress && (
        <>
          <EnterLottery onEnter={addParticipant} />
          <ParticipantsTable participants={participants} />
          <button
            onClick={drawWinners}
            className="px-4 py-2 mt-4 text-white bg-red-500 rounded"
          >
            Draw Winners
          </button>
          <WinnersDisplay winners={winners} />
        </>
      )}
    </div>
  );
}

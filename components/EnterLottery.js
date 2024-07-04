import { useForm } from "react-hook-form";
import { ethers } from "ethers";

export default function EnterLottery({ onEnter }) {
  const { handleSubmit } = useForm();

  const onSubmit = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const tx = await signer.sendTransaction({
      to: "0xb7B7A57ebDce5e43bb7D091DF0Aae31a6C0700c2",
      value: ethers.utils.parseEther("0.000015"),
    });
    await tx.wait();
    onEnter(await signer.getAddress());
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <button
        type="submit"
        className="px-4 py-2 text-white bg-green-500 rounded"
      >
        Enter Lottery
      </button>
    </form>
  );
}

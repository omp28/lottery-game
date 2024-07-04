import { ethers } from "ethers";

export default function WinnersDisplay({ winners }) {
  return (
    <div className="mt-4">
      {winners.length > 0 ? (
        <ul>
          {winners.map((winner, index) => (
            <li key={index}>
              {winner.address}: {ethers.utils.formatEther(winner.prize)} ETH
            </li>
          ))}
        </ul>
      ) : (
        <p>No winners yet.</p>
      )}
    </div>
  );
}

export default function ParticipantsTable({ participants }) {
  return (
    <table className="min-w-full mt-4">
      <thead>
        <tr>
          <th className="px-4 py-2">Participant Address</th>
        </tr>
      </thead>
      <tbody>
        {participants.map((address, index) => (
          <tr key={index}>
            <td className="px-4 py-2 border">{address}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

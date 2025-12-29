export default function TransactionTable({ transactions }) {
  if (transactions.length === 0) {
    return <p className="empty-msg">No transactions found</p>;
  }

  return (
    <table className="table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Type</th>
          <th>Amount</th>
          <th>Balance After</th>
          <th>Date</th>
          <th>User</th>
          <th>Email</th>
        </tr>
      </thead>
      <tbody>
        {transactions.map((tx) => (
          <tr key={tx.transactionId}>
            <td>{tx.transactionId}</td>
            <td>{tx.transactionType}</td>
            <td>{tx.amount}</td>
            <td>{tx.balanceAfter}</td>
            <td>{new Date(tx.timestamp).toLocaleString()}</td>
            <td>{tx.userName}</td>
            <td>{tx.userEmail}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default function TransactionTable({ transactions }) {
  if (!Array.isArray(transactions) || transactions.length === 0) {
    return <div className="empty-msg">No transactions found</div>;
  }

  return (
    <div className="table-wrapper">
      <table className="transaction-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Type</th>
            <th>Amount</th>
            <th>Balance After</th>
            <th>Date</th>
          </tr>
        </thead>

        <tbody>
          {transactions.map((tx, index) => {
            const type = tx?.type ?? "UNKNOWN";
            const typeClass =
              typeof type === "string" ? type.toLowerCase() : "unknown";

            const date = tx?.transactionDate
              ? new Date(tx.transactionDate).toLocaleString()
              : "-";

            return (
              <tr key={tx?.transactionId ?? index}>
                <td>{tx?.transactionId ?? "-"}</td>

                <td>
                  <span className={`tx-type ${typeClass}`}>{type}</span>
                </td>

                <td>₹ {tx?.amount?.toLocaleString() ?? "-"}</td>
                <td>₹ {tx?.balanceAfter?.toLocaleString() ?? "-"}</td>
                <td>{date}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

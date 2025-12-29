import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "../../styles/forms.css";
import "../../styles/Transactions.css";
import { getTransactionsByAccount } from "../../services/api";
import { getAccountNumber } from "../../services/auth";

export default function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const accountNumber = getAccountNumber();

  const [pageNumber, setPageNumber] = useState(0);
  const size = 5; 
  const [totalPages, setTotalPages] = useState(0);

  const fetchTransactions = async (page = 0) => {
    setLoading(true);

    try {
      const res = await getTransactionsByAccount({
        accountNumber,
        pageNumber: page,
        size,
      });

      setTransactions(res.content);
      setTotalPages(res.totalPages);
      setPageNumber(page);

      if (res.content.length === 0) {
        toast.info("No transactions found");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to load transactions");
    } finally {
      setLoading(false);
    }
  };

  // 👇 Auto load on page open
  useEffect(() => {
    fetchTransactions(0);
  }, []);

  return (
    <div className="page">
      <h2 className="page-title">Transaction History</h2>

      {/* Loader */}
      {loading && <p>Loading transactions...</p>}

      {/* Table */}
      {!loading && transactions.length > 0 && (
        <>
          <div className="table-wrapper">
            <table className="transaction-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Type</th>
                  <th>Amount</th>
                  <th>Balance After</th>
                  <th>Date & Time</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((tx) => (
                  <tr key={tx.transactionId}>
                    <td>{tx.transactionId}</td>
                    <td>
                      <span className={`tx-type ${tx.type.toLowerCase()}`}>
                        {tx.type}
                      </span>
                    </td>
                    <td>₹ {tx.amount.toLocaleString("en-IN")}</td>
                    <td>₹ {tx.balanceAfter.toLocaleString("en-IN")}</td>
                    <td>{new Date(tx.timestamp).toLocaleString("en-IN")}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="pagination">
            <button
              className="page-btn"
              disabled={pageNumber === 0}
              onClick={() => fetchTransactions(pageNumber - 1)}
            >
              Prev
            </button>

            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                className={`page-btn ${pageNumber === index ? "active" : ""}`}
                onClick={() => fetchTransactions(index)}
              >
                {index + 1}
              </button>
            ))}

            <button
              className="page-btn"
              disabled={pageNumber === totalPages - 1}
              onClick={() => fetchTransactions(pageNumber + 1)}
            >
              Next
            </button>
          </div>
        </>
      )}

      {!loading && transactions.length === 0 && (
        <div className="no-transactions">No transaction history available.</div>
      )}
    </div>
  );
}

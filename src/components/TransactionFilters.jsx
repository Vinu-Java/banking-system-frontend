import "../styles/transactions.css";

export default function TransactionFilters({
  filters,
  setFilters,
  onSearch,
  loading,
  isUserPage = false,
}) {
  return (
    <div className="txn-filter-container">
      <div className="txn-filter-grid">
        {/* Account Number (manager only) */}
        {!isUserPage && (
          <div className="txn-field">
            <label>Account Number</label>
            <input
              type="text"
              value={filters.accountNumber || ""}
              onChange={(e) =>
                setFilters({ ...filters, accountNumber: e.target.value })
              }
            />
          </div>
        )}

        {/* Transaction Type */}
        <div className={`txn-field ${isUserPage ? "full-width" : ""}`}>
          <label>Transaction Type</label>
          <select
            value={filters.transactionType}
            onChange={(e) =>
              setFilters({ ...filters, transactionType: e.target.value })
            }
          >
            <option value="ALL">All</option>
            <option value="DEPOSIT">Deposit</option>
            <option value="WITHDRAW">Withdraw</option>
            <option value="TRANSFER">Transfer</option>
          </select>
        </div>

        {/* Start Date */}
        <div className="txn-field">
          <label>Start Date</label>
          <input
            type="date"
            value={filters.fromDate}
            onChange={(e) =>
              setFilters({ ...filters, fromDate: e.target.value })
            }
          />
        </div>

        {/* End Date */}
        <div className="txn-field">
          <label>End Date</label>
          <input
            type="date"
            value={filters.toDate}
            onChange={(e) => setFilters({ ...filters, toDate: e.target.value })}
          />
        </div>
      </div>

      <div className="txn-filter-action">
        <button onClick={onSearch} disabled={loading}>
          {loading ? "Loading..." : "Fetch Transactions"}
        </button>
      </div>
    </div>
  );
}

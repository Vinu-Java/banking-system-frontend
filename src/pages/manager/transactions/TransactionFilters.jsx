export default function TransactionFilters({
  filters,
  setFilters,
  onSearch,
  loading,
}) {
  return (
    <div className="form">
      <div className="form-group">
        <label>Account Number</label>
        <input
          type="text"
          className="form-input"
          value={filters.accountNumber}
          onChange={(e) =>
            setFilters({ ...filters, accountNumber: e.target.value })
          }
        />
      </div>

      <div className="form-group">
        <label>From Date</label>
        <input
          type="date"
          className="form-input"
          value={filters.fromDate}
          onChange={(e) => setFilters({ ...filters, fromDate: e.target.value })}
        />
      </div>

      <div className="form-group">
        <label>To Date</label>
        <input
          type="date"
          className="form-input"
          value={filters.toDate}
          onChange={(e) => setFilters({ ...filters, toDate: e.target.value })}
        />
      </div>

      <div className="form-group">
        <label>Transaction Type</label>
        <select
          className="form-input"
          value={filters.transactionType}
          onChange={(e) =>
            setFilters({ ...filters, transactionType: e.target.value })
          }
        >
          <option value="">ALL</option>
          <option value="DEPOSIT">Deposit</option>
          <option value="WITHDRAW">Withdraw</option>
          <option value="TRANSFER">Transfer</option>
        </select>
      </div>

      <button className="form-submit-btn" onClick={onSearch} disabled={loading}>
        {loading ? "Loading..." : "Fetch Transactions"}
      </button>
    </div>
  );
}

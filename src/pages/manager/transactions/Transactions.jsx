import { useState } from "react";
import { toast } from "react-toastify";
import { getTransactions } from "../../../services/api";
import TransactionFilters from "./TransactionFilters";
import TransactionTable from "./TransactionTable";
import Pagination from "./Pagination";
import "../../../styles/forms.css";

export default function Transactions() {
  const [filters, setFilters] = useState({
    accountNumber: "",
    fromDate: "",
    toDate: "",
    transactionType: "",
    pageNumber: 0,
    size: 5,
  });

  const [transactions, setTransactions] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchTransactions = async (page = 0) => {
    if (!filters.fromDate || !filters.toDate) {
      toast.error("From date and To date are required");
      return;
    }

    setLoading(true);

    try {
      const payload = {
        ...filters,
        pageNumber: page,
        transactionType: filters.transactionType || null,
        accountNumber: filters.accountNumber || null,
      };

      const res = await getTransactions(payload);

      setTransactions(res.content);
      setTotalPages(res.totalPages);
      setFilters({ ...filters, pageNumber: page });
    } catch {
      toast.error("Failed to load transactions");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <h2 className="page-title">Transaction History</h2>

      <TransactionFilters
        filters={filters}
        setFilters={setFilters}
        onSearch={() => fetchTransactions(0)}
        loading={loading}
      />

      <TransactionTable transactions={transactions} />

      <Pagination
        currentPage={filters.pageNumber}
        totalPages={totalPages}
        onPageChange={fetchTransactions}
      />
    </div>
  );
}

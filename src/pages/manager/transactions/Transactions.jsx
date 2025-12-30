import { useState } from "react";
import { toast } from "react-toastify";
import {
  getAllTransactionsByDate,
  getAllTransactionsByType,
} from "../../../services/api";
import TransactionFilters from "./TransactionFilters";
import TransactionTable from "./TransactionTable";
import Pagination from "./Pagination";
import "../../../styles/forms.css";

export default function Transactions() {
  const [filters, setFilters] = useState({
    accountNumber: "",
    fromDate: "",
    toDate: "",
    transactionType: "ALL", 
    pageNumber: 0,
    size: 5,
  });

  const [transactions, setTransactions] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchTransactions = async (page = 0) => {
    if (!filters.accountNumber) {
      toast.error("Account number is required");
      return;
    }

    setLoading(true);

    try {
      let payload;
      let res;

      if (filters.transactionType === "ALL") {
        payload = {
          accountNumber: filters.accountNumber,
          pageNumber: page,
          size: filters.size,
        };

        res = await getAllTransactionsByDate(payload);
      }

      else {
        if (!filters.fromDate || !filters.toDate) {
          toast.error("From date and To date are required");
          setLoading(false);
          return;
        }

        payload = {
          accountNumber: filters.accountNumber,
          fromDate: filters.fromDate,
          toDate: filters.toDate,
          pageNumber: page,
          size: filters.size,
          transactionType: filters.transactionType,
        };

        res = await getAllTransactionsByType(payload);
      }

      setTransactions(res.content || []);
      setTotalPages(res.totalPages || 0);

      setFilters((prev) => ({
        ...prev,
        pageNumber: page,
      }));
    } catch (error) {
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

      <TransactionTable transactions={transactions} loading={loading} />

      <Pagination
        currentPage={filters.pageNumber}
        totalPages={totalPages}
        onPageChange={fetchTransactions}
      />
    </div>
  );
}

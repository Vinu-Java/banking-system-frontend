import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  getAllTransactionsByDate,
  getAllTransactionsByType,
} from "../../services/api";
import TransactionFilters from "../../components/TransactionFilters";
import TransactionTable from "../../components/TransactionTable";
import Pagination from "../../components/Pagination";
import "../../styles/forms.css";
import { getAccountNumber } from "../../services/auth";

export default function UserTransactions() {
  const accountNumber = getAccountNumber();

  const [filters, setFilters] = useState({
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
    if (!accountNumber) {
      toast.error("Session expired. Please login again.");
      return;
    }

    setLoading(true);

    try {
      let payload = {
        accountNumber,
        pageNumber: page,
        size: filters.size,
      };

      let res;

      // ✅ CASE 1: No filters OR transactionType = ALL
      if (
        filters.transactionType === "ALL" &&
        !filters.fromDate &&
        !filters.toDate
      ) {
        res = await getAllTransactionsByDate(payload);
      }

      // ✅ CASE 2: Date filter OR transaction type filter applied
      else {
        // If user selected dates, ensure both are present
        if (
          (filters.fromDate && !filters.toDate) ||
          (!filters.fromDate && filters.toDate)
        ) {
          toast.error("Please select both From Date and To Date");
          setLoading(false);
          return;
        }

        payload = {
          ...payload,
          fromDate: filters.fromDate || null,
          toDate: filters.toDate || null,
          transactionType: filters.transactionType,
        };

        res = await getAllTransactionsByType(payload);
      }

      setTransactions(res?.content || []);
      setTotalPages(res?.totalPages || 0);

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

  // ✅ Load ALL transactions immediately on page load
  useEffect(() => {
    fetchTransactions(0);
  }, []);

  return (
    <div className="page">
      <h2 className="page-title">My Transactions</h2>

      <TransactionFilters
        filters={filters}
        setFilters={setFilters}
        onSearch={() => fetchTransactions(0)}
        loading={loading}
        isUserPage={true} 
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

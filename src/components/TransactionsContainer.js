import React, { useEffect, useState } from "react";
import styled from "styled-components";
import TransactionItem from "./TransactionItem";

// Styled components
const Container = styled.div``;
const Heading = styled.h2`
  font-size: 25px;
  font-weight: 600;
`;
const SearchInput = styled.input`
  width: 100%;
  padding: 15px 20px;
  outline: none;
  border-radius: 5px;
  margin: 5px 0;
  border: 1px solid #e6e8e9;
  background-color: #e6e8e9;
  margin-bottom: 25px;
`;
const TransactionItems = styled.div``;

// Component for displaying transaction items
const TransactionsContainer = ({ transactions, removeTransaction }) => {
  // State for search input and filtered transactions
  const [searchInput, setSearchInput] = useState("");
  const [filteredTransactions, setFilteredTransactions] = useState(transactions);

  // Function to filter data based on search input
  const filteredData = (searchInput) => {
    if (!searchInput || !searchInput.trim().length) {
      setFilteredTransactions(transactions);
      return;
    }

    let filtered = [...filteredTransactions];
    filtered = filtered.filter(
      (item) =>
        item.details.toLowerCase().includes(searchInput.toLowerCase().trim())
    );
    setFilteredTransactions(filtered);
  };

  // Effect to update filtered transactions when transactions or search input changes
  useEffect(() => {
    filteredData(searchInput);
  }, [transactions, searchInput]);

  // JSX for rendering transactions container
  return (
    <Container>
      <Heading>Transactions</Heading>

      <SearchInput
        type="text"
        placeholder="Search here"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
      />

      <TransactionItems>
        {/* Conditional rendering based on filtered transactions */}
        {filteredTransactions?.length ? (
          filteredTransactions.map((transaction) => (
            <TransactionItem
              transaction={transaction}
              key={transaction.id}
              removeTransaction={removeTransaction}
            />
          ))
        ) : (
          <p>No Transactions</p>
        )}
      </TransactionItems>
    </Container>
  );
};

export default TransactionsContainer;

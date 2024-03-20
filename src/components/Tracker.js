import React, { useEffect, useState } from "react";
import styled from "styled-components";
import AddTransaction from "./AddTransaction"; // Import component for adding transactions
import OverviewComponent from "./OverviewComponent"; // Import component for expense/income overview
import TransactionsContainer from "./TransactionsContainer"; // Import component for displaying transactions

// Container styled component with adjustments
const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 600px;
  max-width: 100%;
  background-color: #f5f5f5; /* Light gray background */
  padding: 30px 20px;
  border-radius: 5px;
  margin: 10px;
  /* Added a subtle box-shadow for depth */
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
`;

// Heading styled component with font size adjustment
const Heading = styled.h1`
  font-size: 24px; /* Adjusted font size to 24px */
  font-weight: bold;
  text-align: center;
  margin-bottom: 20px;
`;

// TransactionDetails styled component with minor adjustments
const TransactionDetails = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  margin-bottom: 25px;
`;

// THeading styled component with color change
const THeading = styled.div`
  font-size: 24px; /* Adjusted font size to 24px */
  font-weight: bold;
  text-align: center;
  margin-bottom: 20px;
  color: #333; /* Darker text color */
`;

// ExpenseBox styled component with color change
const ExpenseBox = styled.div`
  flex: 1;
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 10px 20px;
  background-color: #f5f5f5;
  & span {
    font-weight: bold;
    font-size: 20px; /* Adjusted font size to 20px */
    display: block;
    color: ${(props) => (props.isExpense ? "red" : "green")};
  }
`;

// IncomeBox styled component (inherits styles from ExpenseBox)
const IncomeBox = styled(ExpenseBox)`
  /* Inherits styles from ExpenseBox */
`;

const Tracker = () => {
  // Unique comment explaining state variables
  const [toggle, setToggle] = useState(false); // Controls AddTransaction visibility
  const [transactions, setTransactions] = useState([]); // Array to store transactions
  const [expense, setExpense] = useState(0); // Total expense
  const [income, setIncome] = useState(0); // Total income

  // Unique comment explaining AddTransactions function (moved inside component for better organization)
  const AddTransactions = (payload) => {
    const transactionArray = [...transactions];
    transactionArray.push(payload);
    setTransactions(transactionArray);
  };

  // Function to remove a transaction
  const removeTransaction = (id) => {
    const updatedTransactions = transactions.filter(
      (transaction) => transaction.id !== id
    );
    setTransactions(updatedTransactions);
  };

  // Function to calculate total expense and income
  const calculateTransactions = () => {
    let exp = 0;
    let inc = 0;

    transactions.map((item) => {
      if (item.transType === "expense") {
        exp = exp + item.amount;
      } else {
        inc = inc + item.amount;
      }
    });

    setExpense(exp);
    setIncome(inc);
  };

  // useEffect hook to calculate transactions on change
  useEffect(() => {
    calculateTransactions();
  }, [transactions]);

return ( 
	<Container> 
		<THeading>Expense Tracker</THeading> 
	<Heading>Expenses</Heading> 
	<OverviewComponent 
		toggle={toggle} 
		setToggle={setToggle} 
		expense={expense} 
		income={income} 
	/> 

	{toggle && ( 
		<AddTransaction 
		setToggle={setToggle} 
		AddTransactions={AddTransactions} 
		/> 
	)} 

	<TransactionDetails> 
		<ExpenseBox isExpense> 
		Expense <span>₹{expense}</span> 
		</ExpenseBox> 

		<IncomeBox> 
		Budget <span>₹{income}</span> 
		</IncomeBox> 
	</TransactionDetails> 

	<TransactionsContainer 
		transactions={transactions} 
		removeTransaction={removeTransaction} 
	/> 
	</Container> 
); 
}; 

export default Tracker; 

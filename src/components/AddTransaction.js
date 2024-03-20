// This component is responsible for adding transactions.
// It utilizes useState hook from React to manage component state.
// It uses styled-components for styling.

import { useState } from "react";
import styled from "styled-components";

// Styled container for the transaction form.
const Container = styled.div`
  text-align: center;
  border: 1px solid #000;
  padding: 20px;
  border-radius: 5px;
  margin-bottom: 25px;
`;

// Styled input fields for amount and details.
const Input = styled.input`
  width: 100%;
  padding: 15px 20px;
  outline: none;
  border-radius: 5px;
  margin: 5px 0;
  border: 1px solid #000;
`;

// Styled container for radio buttons.
const RadioContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

// Styled label for radio buttons.
const Label = styled.label`
  margin-left: 10px;
  cursor: pointer;
`;

// Styled radio button container.
const RadioBtn = styled(RadioContainer)`
  margin: 10px 20px 10px 0;
`;

// Styled submit button.
const SubmitBtn = styled.button`
  background-color: #44e610;
  color: #fff;
  border-radius: 5px;
  padding: 10px 20px;
  border: none;
  outline: none;
  cursor: pointer;
  &:hover {
    background-color: #44e610;
  }
`;

// AddTransaction component
const AddTransaction = ({ setToggle, AddTransactions }) => {
  // State variables for amount, details, and transaction type
  const [amount, setAmount] = useState("");
  const [details, setDetails] = useState("");
  const [transType, setTransType] = useState("expense");

  // Function to add transaction data
  const AddTransactionData = () => {
    AddTransactions({
      amount: Number(amount),
      details,
      transType,
      id: Date.now(),
    });
    setToggle();
  };

  // JSX for the transaction form
  return (
    <Container>
      {/* Input field for amount */}
      <Input
        type={"number"}
        placeholder="Enter Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      {/* Input field for details */}
      <Input
        type={"text"}
        placeholder="Enter Details"
        value={details}
        onChange={(e) => setDetails(e.target.value)}
      />

      {/* Radio buttons for transaction type */}
      <RadioContainer>
        {/* Expense radio button */}
        <RadioBtn>
          <input
            type="radio"
            id="expense"
            name="type"
            value={"expense"}
            checked={transType === "expense"}
            onChange={(e) => setTransType(e.target.value)}
          />
          <Label htmlFor="expense">Expense</Label>
        </RadioBtn>

        {/* Income radio button */}
        <RadioBtn>
          <input
            type="radio"
            id="income"
            name="type"
            value={"income"}
            checked={transType === "income"}
            onChange={(e) => setTransType(e.target.value)}
          />
          <Label htmlFor="income">Budget</Label>
        </RadioBtn>
      </RadioContainer>

      {/* Submit button to add transaction */}
      <SubmitBtn onClick={AddTransactionData}>Add Transaction</SubmitBtn>
    </Container>
  );
};

export default AddTransaction;

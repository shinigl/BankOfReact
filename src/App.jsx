import React, { useState } from "react";
import { Chart as ChartJs } from "chart.js/auto";
import { Pie } from "react-chartjs-2";
import { Slider, Typography, MenuItem, Select } from "@mui/material";
import "./App.css";

function App() {
  const [homeValue, setHomeValue] = useState(3000);
  const [downPayment, setDownPayment] = useState(600);
  const [loanAmount, setLoanAmount] = useState(2400);
  const [interestRate, setInterestRate] = useState(5);
  const [tenure, setTenure] = useState(5);

  const monthlyRate = interestRate / 12 / 100;
  const months = tenure * 12;
  const monthlyPayment =
    loanAmount > 0
      ? (loanAmount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -months))
      : 0;

  const interestPaid = monthlyPayment * months - loanAmount;
  const principalPaid = loanAmount;

  return (
    <div style={{ padding: "20px" }}>
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        style={{ color: "#1976D2" }}
      >
        Bank of React
      </Typography>
      <div className="div">
        <div className="div1">
          {/* Home Value */}
          <Typography variant="h6">Home Value</Typography>
          <Typography variant="h4">${homeValue}</Typography>
          <Slider
            aria-label="Temperature"
            value={homeValue}
            min={1000}
            max={10000}
            step={100}
            marks
            onChange={(e, value) => {
              setHomeValue(value);
              setLoanAmount(value - downPayment);
            }}
          />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              color: "gray",
              fontFamily: "Helvetica",
            }}
          >
            <span>$ 1000</span>
            <span>$ 10000</span>
          </div>

          {/* Down Payment */}
          <Typography variant="h6">Down Payment</Typography>
          <Typography variant="h4">${downPayment}</Typography>
          <Slider
            value={downPayment}
            min={0}
            max={homeValue}
            step={100}
            marks
            onChange={(e, value) => {
              setDownPayment(value);
              setLoanAmount(homeValue - value);
            }}
          />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              color: "gray",
              fontFamily: "Helvetica",
            }}
          >
            <span>$ 0</span>
            <span>$ {homeValue}</span>
          </div>
          {/* Loan Amount */}
          <Typography variant="h6">Loan Amount</Typography>
          <Typography variant="h4">${loanAmount}</Typography>
          <Slider
            value={loanAmount}
            min={0}
            max={homeValue}
            step={100}
            marks
            onChange={(e, value) => {
              setLoanAmount(value);
              setDownPayment(homeValue - value);
            }}
          />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              color: "gray",
              fontFamily: "Helvetica",
            }}
          >
            <span>$ 0</span>
            <span>$ {homeValue}</span>
          </div>
          {/* Interest Rate */}
          <Typography variant="h6">Interest Rate</Typography>
          <Typography variant="h4">% {interestRate}</Typography>
          <Slider
            value={interestRate}
            min={2}
            max={18}
            marks
            step={0.1}
            onChange={(e, value) => setInterestRate(value)}
          />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              color: "gray",
              fontFamily: "Helvetica",
            }}
          >
            <span>2%</span>
            <span>18%</span>
          </div>
          {/* Tenure */}
          <Typography variant="h6">Tenure</Typography>
          <Select
            value={tenure}
            onChange={(e) => setTenure(e.target.value)}
            fullWidth
          >
            <MenuItem value={5}>5 years</MenuItem>
            <MenuItem value={10}>10 years</MenuItem>
            <MenuItem value={15}>15 years</MenuItem>
            <MenuItem value={20}>20 years</MenuItem>
          </Select>
        </div>

        {/* Pie Chart */}
        <div className="pie">
          <Typography variant="h5" align="center">
            Monthly Payment: ${monthlyPayment.toFixed(2)}
          </Typography>
          <Pie
            data={{
              labels: ["Principal", "Interest"],
              datasets: [
                {
                  label: "Ration of principle and intrest",
                  data:
                    loanAmount === 0 ? [1, 0] : [principalPaid, interestPaid],
                  backgroundColor: ["#FFD9E1", "#CDEBFF"],
                  borderColor: ["#FF5277", "#52B9FE"],
                  borderWidth: 1,
                },
              ],
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
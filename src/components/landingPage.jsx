
import React, { Component, Fragment } from 'react';
import Select from 'react-select';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import Loader from 'react-loader-spinner'
import { getCurrencies, getCalculatedExchange } from '../redux/action-creators'

class LandingPage extends Component {
  state = {
    selectedOption1: '',
    selectedOption2: '',
    amount: '',
  }
  

  componentDidMount() {
    const {getCurrencies } = this.props;
    getCurrencies();
    localStorage.clear()
  }

  handleChangeBase = (selectedOption1) => {
    this.setState({ selectedOption1: selectedOption1.value});
  }
  handleAmount = (e) => {
    this.setState({amount : e.target.value})
  }

  notifyBase = () => toast.info("Please select your currency")
  notifyBaseQuote = () => toast.info("Select both base and quote currency")
  notifyQuote = () => toast.info("Please select your exchange currency")
  notifyAmount = () => toast.info("Please enter amount to convert")
  onSubmit = e => {
    const { getCalculatedExchange } = this.props;
    const { selectedOption1, selectedOption2, amount } = this.state
    e.preventDefault();
    this.setState({
      selectedOption1, selectedOption2, amount
    })
    if (selectedOption1 === '' && selectedOption2 === '') {
      return this.notifyBaseQuote()
    }
    if (selectedOption1 === '') {
      return this.notifyBase()
    }
    if (selectedOption2 === '') {
      return this.notifyQuote()
    }
    if (amount === '') {
      return this.notifyAmount()
    }
    getCalculatedExchange(selectedOption1, selectedOption2, amount)
  }
  getAvailableCurrencies = () => {
    const { currencies} = this.props; 
    if(currencies === undefined) {
      return <Loader
      type="Audio"
      color="#00BFFF"
      height={100}
      width={100}
      timeout={3000} 
   />
    };
    const selectedCurrencies = currencies.map(remove => remove.quoteRate )
    const currenciesToSelect = selectedCurrencies.map(assign => ({value: assign, label: assign}))
    return currenciesToSelect;
  }

  getExchangeRate = () => {
    const { exchangeRate } = this.props; 
    if(exchangeRate === undefined) {
      return 0;
    };
    return exchangeRate.exchangeRate
  }

  calculatedMoneyValue = () => {
    const { exchangeRate } = this.props; 
    if(exchangeRate === undefined) {
      return 0;
    };
    return  exchangeRate.answer
  }

  handleChangeQuote = (selectedOption2) => {
    this.setState({ selectedOption2: selectedOption2.value });
  }

  history = () => {
    const convertHistory = JSON.parse(localStorage.getItem('history'));
    if(convertHistory === null ){
      return <p className="no-history text-muted pt-4">No history yet, convert some currency to see some magic</p>;
    }
    const beautifulHistory = <div>

{convertHistory.map(hist => (
          <ul className="history-list bg bg-outline-info border-bottom rounded-lg shadow-sm border-info" key={hist.id}>
              <li className="list-history"><span>Amount:</span> {hist.amount}</li>
              <li className="list-history"> <span>Exchanges:</span>  {hist.exchangeRate}</li>
              <li className="list-history"> <span>Money value:</span>  {hist.answer}</li>
              <li className="list-history"> <span>Currencies:</span> {hist.baseRate}/{hist.quoteRate}</li>
          </ul>
        ))}
    </div>
    return beautifulHistory;
  }

  render() {
    const { selectedOption1, selectedOption2 } = this.state;
    return (
      <Fragment>
        <main className="col col-12 main-container">
          <div className="header-section">
            <h1>Simple Currency Convertor</h1>
          </div>
        <div className="sub-container shadow border rounded-lg">
        <div className=" footer bg bg-outline-info border-top border-left rounded shadow-sm border-info text-center p-3 ">
        Select currencies to be converted
          </div>
          <div className="amount-converted">
          <div className="select-option-left">
            <Select 
            name="base-currency"
            placeholder="Select your currency"
            value={selectedOption1.value}
            onChange={this.handleChangeBase}
            isSearchable={true}
            options={this.getAvailableCurrencies()}
            />
          </div> 
          <div className="select-option-left">
            <Select 
            name="quote-currency"
            placeholder="Select your exchange"
            value={selectedOption2.value}
            onChange={this.handleChangeQuote}
            isSearchable={true}
            options={this.getAvailableCurrencies()}
            />
          </div>
          </div>
        </div>

        <div className="sub-container below shadow border rounded-lg">
          <div className="amount-converted">
          <div className="enter-amount">
            <label htmlFor="amount">Enter Amount here</label> <br/>
            <input className="shadow-sm border enter-text rounded" type="number" onChange={this.handleAmount} defaultValue={this.state.amount} placeholder="0"/>
          </div> 
          <div className="exchange-rate">
            <label htmlFor="exchanges">Exchange Rate</label> <br/>
            <div onChange={this.exchangeRate}  className="exchange-rate-const shadow-sm border rounded">{this.getExchangeRate()}</div>
          </div>
          <div className="exchange-rate">
            <label htmlFor="exchanges">Money value</label> <br/>
            <div className="exchange-rate-answer shadow-sm border-info rounded" >{this.calculatedMoneyValue()}</div>
          </div>
          </div>
          <button onClick={this.onSubmit} className="btn btn-info ">Convert</button>
        </div>


        <div className="sub-container  below shadow border rounded-lg">
        <div className=" footer bg bg-outline-info border-top rounded shadow-sm border-info text-center p-3 ">Conversion History</div>
          <div className="amount-converted">
            {this.history()}
          </div>
          <div className=" footer-copyright bg bg-outline-info border-bottom rounded-lg shadow-sm border-info text-center pb-3 pt-3 ">copyright &#9400; 2019</div>
        </div>
        </main>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  currencies: state.accessExchange.currencies,
  exchangeRate: state.accessExchange.rates
}
)
export default connect(mapStateToProps, 
  {
    getCurrencies,getCalculatedExchange
  })(LandingPage);

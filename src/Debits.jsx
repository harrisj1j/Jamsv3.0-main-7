import React from "react";
import ReactDOM from "react-dom";

export  class Debits extends React.Component {
  constructor() {
    super();
    this.state = {
      debit: 0,
      debits: [{ debit: 0 }],
      debitsTotal: 0
    };
  }

  handleDebitChange = evt => {
    this.setState({ debit: evt.target.value });
  };

  handledebitsChange = idx => evt => {
    const newdebits = this.state.debits.map((debits, sidx) => {
      if (idx !== sidx) return debits;
      return { ...debits, debit: evt.target.value };
    });

    this.setState({ debits: newdebits });
  };

  handleSubmit = evt => {
    evt.preventDefault();

    const { debit, debits } = this.state;
    debits.forEach((debit)=> {
      this.debitsTotal += debit;
      console.log(this.debitsTotal)
    })
    alert(`Incorporated: ${debit} with ${debits.length} debits`);
  };

  handleAdddebits = () => {
    this.setState({
      debits: this.state.debits.concat([{ debit: 0 }])
    });
  };

  handleRemovedebits = idx => () => {
    this.setState({
      debits: this.state.debits.filter((s, sidx) => idx !== sidx)
    });
  };

  render() {
    return (
      <form className="debits-form" onSubmit={this.handleSubmit}>

        <h4>Debits</h4>

        {this.state.debits.map((debits, idx) => (
          <div className="debits">
            <input
              type="number"
              placeholder={`Add #${idx + 1} debit`}
              value={debits.debit}
              onChange={this.handledebitsChange(idx)}
            />
            <button
              type="button"
              onClick={this.handleRemovedebits(idx)}
              className="custom-button"
            >
              -
            </button>
          </div>
        ))}
        <button 
          type="button"
          onClick={this.handleAdddebits}
          className="custom-button"
        >
          + Debit
        </button>
        <button onClick={this.handleSubmit}className="custom-button">Add</button>
      </form>
    );
  }
}

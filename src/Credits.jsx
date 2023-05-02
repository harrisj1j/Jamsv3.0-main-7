import React from "react";
import ReactDOM from "react-dom";

export  class Credits extends React.Component {
  constructor() {
    super();
    this.state = {
      credit: 0,
      credits: [{ credit: 0 }],
      creditsTotal: 0
    };
  }

  handlecreditChange = evt => {
    this.setState({ credit: evt.target.value });
  };

  handlecreditsChange = idx => evt => {
    const newcredits = this.state.credits.map((credits, sidx) => {
      if (idx !== sidx) return credits;
      return { ...credits, credit: evt.target.value };
    });

    this.setState({ credits: newcredits });
  };

  handleSubmit = evt => {
    const { credit, credits } = this.state;
    this.credits.forEach((credit)=> {
      this.creditsTotal +=credit;
    })
    alert(`Incorporated: ${credit} with ${credits.length} credits`);
  };

  handleAddcredits = () => {
    this.setState({
      credits: this.state.credits.concat([{ credit: "" }])
    });
  };

  handleRemovecredits = idx => () => {
    this.setState({
      credits: this.state.credits.filter((s, sidx) => idx !== sidx)
    });
  };

  render() {
    return (
      <form className="debits-form" onSubmit={this.handleSubmit}>

        <h4>credits</h4>

        {this.state.credits.map((credits, idx) => (
          <div className="credits">
            <input
              type="number"
              placeholder={`Add #${idx + 1} credit`}
              value={credits.credit}
              onChange={this.handlecreditsChange(idx)}
            />
            <button
              type="button"
              onClick={this.handleRemovecredits(idx)}
              className="custom-button"
            >
              -
            </button>
          </div>
        ))}
        <button 
          type="button"
          onClick={this.handleAddcredits}
          className="custom-button"
        >
          + credit
        </button>
        <button className="custom-button">Add</button>
      </form>
    );
  }
}

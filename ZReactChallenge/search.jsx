import React from 'react';

class Search extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      lastRequest: "pizza",
      rankByDistance: false
    }
    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const { lastRequest, rankByDistance } = this.state;
    this.props.handleSearch(lastRequest, rankByDistance);
  }

  handleInput(e) {
    e.preventDefault();
    this.setState({lastRequest: e.target.value});
  }

  toggleRankSelector(flag) {
    this.setState({rankByDistance: flag});
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} id="search-form">
        <button id="submit" type="submit" className="fa fa-2x fa-search"></button>
        <input id="search" type="text" onChange={this.handleInput} placeholder="Find a place" value={this.state.lastRequest} />
        <div id="rank-selector">
          <span><input type="radio" name="rank" value="popularity" onChange={() => this.toggleRankSelector(false)} checked={!this.state.rankByDistance}/>Popularity</span>
          <span><input type="radio" name="rank" value="distance" onChange={() => this.toggleRankSelector(true)} checked={this.state.rankByDistance}/>Distance</span>
        </div>
      </form>
    )
  }
};

export default Search;

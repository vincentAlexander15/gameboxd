import React, { Component } from 'react';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      isLoaded: false,
    }
  }

  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(res => res.json())
      .then(json => {
        this.setState({
          data: json,
          isLoaded: true,
        })
      });
  }

  render () {

    var { isLoaded, data } = this.state;

    if (!isLoaded) {
      return <div>Loading...</div>
    } else {
      return (
        <div className="App">
          <ul>
            {data.map(datum => (
              <li key={datum.id}>
                Name: {datum.name} | Email: {datum.email}
              </li>
            ))};
          </ul>
        </div>
      );
    }
      

  }

}

export default App;

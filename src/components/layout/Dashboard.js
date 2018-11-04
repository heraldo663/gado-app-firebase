import React, { Component } from 'react'
import Animals from './../animals/Animals'
import Sidebar from './Siderbar';

class Dashboard extends Component {
  render() {
    return (
      <div className="row">
        <div className="col-md-10">
          <Animals></Animals>
        </div>
        <div className="col-md-2">
          <Sidebar />
        </div>
      </div>
    )
  }
}

export default Dashboard;
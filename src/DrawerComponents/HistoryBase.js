import React, { Component } from 'react';
import { callApi } from '../utilities/serverApi';
const emptyState = {
  historyList: [],
  page: 1,
  perPage: 5,
  loading: true
};
export default class History extends Component {
  constructor(props) {
    super(props);
    this.state = { ...emptyState };
  }
  onEndReached = () => {
    console.warn('OnEndReached', this.state.page);
    let data = {
      perPage:
        this.state.count - this.state.historyList.length <= 5 ? this.state.count - this.state.historyList.length : 5,
      page: this.state.page,
      fields: {
        driverId: { userId: { picture: 1, fullname: 1 } },
        patientAddress: 1,
        hospitalAddress: 1,
        updatedAt: 1,
        vehicleNo: 1
      },
      filter: {
        status: 'Complete',
        patientId: this.props.user.id
      }
    };
    let headers = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      authorization: `Bearer ${this.props.token}`
    };
    let a =
      this.state.count - this.state.historyList.length <= 5 ? this.state.count - this.state.historyList.length : 5;
    if (this.state.count - this.state.historyList.length != 0) {
      let b = this.state.count - this.state.historyList.length != 0;
      callApi('post', 'v1/daffo/Trips/getOwn', data, headers)
        .then(response => {
          console.log('History response', response);
          this.setState({
            historyList: this.state.historyList.concat(response.data),
            page: this.state.page + 1,
            loading: false
          });
        })
        .catch(err => {});
    }
  };
  componentDidMount() {
    let data = {
      page: this.state.page,
      perPage: 5,
      filter: { status: 'Complete', patientId: this.props.user.id },
      fields: {
        driverId: { userId: { picture: 1, fullname: 1 } },
        patientAddress: 1,
        updatedAt: 1,
        hospitalAddress: 1,
        vehicleNo: 1
      }
    };
    let headers = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      authorization: `Bearer ${this.props.token}`
    };
    callApi('post', 'v1/daffo/Trips/count', data, headers)
      .then(result => {
        this.setState({ count: result.data.count });
        callApi('post', 'v1/daffo/Trips/getOwn', data, headers)
          .then(response => {
            this.setState({
              loading: false,
              historyList: response.data,
              page: this.state.page + 1
            });
          })
          .catch(err => {});
      })
      .catch(err => {});
  }
}

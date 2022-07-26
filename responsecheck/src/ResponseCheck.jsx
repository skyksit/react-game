import React, { Component } from 'react';

class ResponseCheck extends Component {
  state = {
    backstate: 'waiting',
    message: '클릭해서 시작하세요.',
    result: [],
  };

  onClickScreen = () => {
    const { backstate } = this.state;
    if (backstate === 'waiting') {
      this.setState({
        backstate: 'ready',
        message: '초록색이 되면 클릭하세요.',
      });
      this.timeOut = setTimeout(() => {
        this.setState({
          backstate: 'now',
          message: '지금 클릭',
        });
      }
      , 1000);
    } else if (backstate === 'ready') {
      clearTimeout(this.timeOut);
      this.setState({
        backstate: 'waiting',
        message: '너무 성급하시군요! 초록색이 된 후에 클릭하세요.',
      });
    } else if (backstate === 'now') {
      this.setState({
        backstate: 'waiting',
        message: '클릭해서 시작하세요.',
      });
    }
  }

  renderAverage = () => {
    const { result } = this.state;
    return result.length === 0 ? null : <div>평균 시간: {result.reduce((a, c) => a + c) / result.length} ms</div>
  };
  
  render() {
    <>
      <div
        id='screen'
        className={this.state.backstate}
        onClick={this.onClickScreen}
      >
        <div className='message'>{this.state.message}</div>
      </div>
      {this.renderAverage()}
    </>
  }
}

export default ResponseCheck;
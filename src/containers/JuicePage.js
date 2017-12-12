import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../actions/juiceActions';
// import Sauce from '../components/Sauce';
import styled from 'react-emotion';

const StyledButton = styled.button(props => {
    const { hue, faith } = props;

    return [
        `
        background-color: ${hue};
        color: ${faith || 'grey'};
        width: 100px;
        `
    ]
});

export class Juice extends React.Component {

  render() {
    return (
    <div>
    <StyledButton hue="blue" faith="white" onClick={() => this.props.actions.fetchAll('Curiosities', 1, 'Grid view')}>
        Fetch Data
    </StyledButton>
    {this.props.fetching ? 'Loading' : ''}
    </div>
    );
  }
}

Juice.propTypes = {
  actions: PropTypes.object.isRequired,
  // app state is required
};

function mapStateToProps(state) {
  return {
    // app state you want to access
    fetching: state.data.CuriositiesLoading,
    curiousities: state.data.CuriositiesData
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Juice);
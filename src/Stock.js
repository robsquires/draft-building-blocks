import React from 'react';
import { ContentState } from 'draft-js';


const Stock = (props) => {
  const { symbol, price } = props.contentState.getEntity(props.entityKey).getData();

  return (
    <span style={{ background: '#ffa9a9' }} title={`${symbol} - Last price ${price}`}>
      {props.children}
    </span>
  );
};

Stock.propTypes = {
  contentState: React.PropTypes.instanceOf(ContentState),
  entityKey: React.PropTypes.string,
  children: React.PropTypes.node,
};

export default Stock;

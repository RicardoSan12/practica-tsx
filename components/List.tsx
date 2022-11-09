import * as React from 'react';
// import { useState, useEffect } from 'react';
import { subscriptor } from '../types';

interface Props {
  children?: React.ReactNode;
  subs: subscriptor[];
}

const List: React.FC<Props> = ({ subs }) => {
  return (
    <div className="List">
      {subs.map<JSX.Element>((item) => {
        return (
          <div>
            <h3>{item.name}</h3>
            <img src={item.avatar} alt={item.avatar} />
            <p>
              Lleva: {item.month} meses {item.description?.toUpperCase()}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default List;

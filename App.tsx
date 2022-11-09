import * as React from 'react';
import { useState, useEffect } from 'react';
import './style.css';
import List from './components/List';
import Form from './components/Form';

import {subscriptor} from './types'

interface AppState {
  subs: subscriptor[];
  total: number;
}
const initialState = [
  {
    avatar: 'imagenesdespidi.com',
    name: 'OscarMen',
    month: 8,
    id: 5,
    description: 'soy nuevo aqui',
  },
];

export default function App() {
  const [sub, setSub] = useState<AppState['subs']>([]);
  const [totalSubs, setTotalSubs] = useState<AppState['total']>(0);

  useEffect(() => {
    setSub(initialState);
    setTotalSubs(20);
  }, []);

  return (
    <div className="App">
      <List subs={sub} />
      <h4>Todas las subcripciones {totalSubs}</h4>
      <Form onNewSub={setSub}/>
    </div>
  );
}

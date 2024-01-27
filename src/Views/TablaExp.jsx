// src/Views/TablaExp.jsx
import React from 'react';
import Expedientes from './Repo/TBL/expedientes';
import Header from './HeaderSe';
import Menu from './Repo/MenuAd';

const TablaExp = () => {
  return (

<div>
<Header />
<Menu />

      <center><h1>Expedientes</h1></center>
      <Expedientes />
    </div>
  );
};

export default TablaExp;

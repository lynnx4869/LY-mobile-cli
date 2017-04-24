import React from 'react';
import ReactDOM from 'react-dom';

let appNode = document.getElementById('app');

import HttpUtil from './Helper/HttpUtil'
window.CaiTuo = {
    Http: HttpUtil
};

// 路由控制
import Routes from './Manifest/Routes';

ReactDOM.render(Routes, appNode);

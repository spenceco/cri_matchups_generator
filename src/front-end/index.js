import React from 'react';
import { createRoot } from "react-dom/client";
import App from './App.js';
import './index.css';
import { StateProvider } from './state/StateContext';



const container = document.getElementById("root");
const root = createRoot(container);

root.render(
	<StateProvider>
		<App />
	</StateProvider>
		
);
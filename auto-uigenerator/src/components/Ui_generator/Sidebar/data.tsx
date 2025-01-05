import React from 'react';
import Button from './button';
import Button2 from './button2';
import Login from '../../Login';
import DeleteItem from '../../DeleteItem';
import {
	FaBehance,
	FaFacebook,
	FaLinkedin,
	FaTwitter,
	FaSketch,
	FaHome,
	FaUserFriends,
	FaFolderOpen,
	FaCalendarAlt,
} from 'react-icons/fa';

import { HiDocument } from 'react-icons/hi';

export type Task={
	id:number;
	tid: number;
	elementId: number;
	name: string;
	text: string;
	content: JSX.Element| string;
	icon: JSX.Element|string;
	column?: string;
	props:{[key:string]:any};
	x:number;
	y:number;
	width?:number;
	height?:number;
}

export const Tasks:Task[] = [
	{
		id:0,
		tid: 1,
		elementId:1,
		name: 'Button',
		text: 'home',
		content: React.createElement(Button),
		props:{},
		icon: React.createElement(FaHome, { className: "w-5 h-5" }),
		column: 'exporter',
		x:0,
		y:0,
		width:200,
		height:100
	},
	{
		id:0,
		tid: 2,
		elementId:2,
		name: '/grocery-bud',
		text: 'team',
		content:React.createElement(Login),
		icon: React.createElement(FaUserFriends, { className: "w-5 h-5" }),
		props:{},
		column: 'exporter',
		x:0,
		y:0,
		width:200,
		height:100
	},
	{
		id:0,
		tid: 3,
		elementId:3,
		name: '/navbar',
		text: 'projects',
		content:React.createElement(Button2),
		icon: React.createElement(FaFolderOpen, { className: "w-5 h-5" }),
		props:{},
		column: 'exporter',
		x:0,
		y:0,
		width:200,
		height:100
	},
	{
		id:0,
		tid: 4,
		elementId:4,
		name: '/sidebar',
		text: 'calendar',
		content:"<button>This is home</button>",
		icon: React.createElement(FaCalendarAlt, { className: "w-5 h-5" }),
		props:{},
		column: 'exporter',
		x:0,
		y:0,
		width:200,
		height:100
	},
	{
		id:0,
		tid: 5,
		elementId:5,
		name: '/sidebar',
		text: 'documents',
		content:"<button>This is home</button>",
		icon: React.createElement(HiDocument, { className: "w-5 h-5" }),
		props:{},
		column: 'exporter',
		x:0,
		y:0,
		width:200,
		height:100
	},
];

export type socialType = [
	{
		tid: number;
		url: string;
		icon: JSX.Element;
		text: string;
	}
]


export   type column={
    id:string,
    url:string,
  }

// export function ReturnComponent(task: Task): JSX.Element | string {
//   const task=
// }

export type coordinates={topLeft:{x:number,y:number},
bottomRight:{x:number,y:number},
topRight:{x:number,y:number}
bottomLeft:{x:number,y:number}}
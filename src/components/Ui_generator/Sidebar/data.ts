import React from 'react';
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
	id: number;
	url: string;
	text: string;
	icon: JSX.Element;
	column?: string;
	x:number;
	y:number;
}

export const Tasks:Task[] = [
	{
		id: 1,
		url: '/color-shade-generator',
		text: 'home',
		icon: React.createElement(FaHome, { className: "w-5 h-5" }),
		column: 'exporter',
		x:0,
		y:0
	},
	{
		id: 2,
		url: '/grocery-bud',
		text: 'team',
		icon: React.createElement(FaUserFriends, { className: "w-5 h-5" }),
		column: 'exporter',
		x:0,
		y:0
	},
	{
		id: 3,
		url: '/navbar',
		text: 'projects',
		icon: React.createElement(FaFolderOpen, { className: "w-5 h-5" }),
		column: 'exporter',
		x:0,
		y:0
	},
	{
		id: 4,
		url: '/sidebar',
		text: 'calendar',
		icon: React.createElement(FaCalendarAlt, { className: "w-5 h-5" }),
		column: 'exporter',
		x:0,
		y:0
	},
	{
		id: 5,
		url: '/sidebar',
		text: 'documents',
		icon: React.createElement(HiDocument, { className: "w-5 h-5" }),
		column: 'exporter',
		x:0,
		y:0
	},
];

export type socialType = [
	{
		id: number;
		url: string;
		icon: JSX.Element;
		text: string;
	}
]


export   type column={
    id:string,
    url:string,
  }

export type coordinates={topLeft:{x:number,y:number},
bottomRight:{x:number,y:number},
topRight:{x:number,y:number}
bottomLeft:{x:number,y:number}}
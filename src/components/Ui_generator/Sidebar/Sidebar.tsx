import React, { useState } from 'react';
import { HiOutlineSearch, HiTicket, HiX } from 'react-icons/hi';
import { MdSettings } from 'react-icons/md';
import {Task } from './data';
import { useGlobalContext } from './Context';
import { useDroppable } from '@dnd-kit/core';
import { column as columnType } from './data';
import ReactCompo from './ReactCompo';
import { useRef } from 'react';
type columnProps={
	column: columnType;
	tasks: Task[]
}

const Sidebar = ({column,tasks}:columnProps)=> {
	const { isSidebarOpen, closeSidebar } = useGlobalContext();
console.log(closeSidebar, isSidebarOpen);
	
	return (

		<div
			className={`transition-all  duration-500 flex-col  fixed top-0 ${
				isSidebarOpen ? 'left-0' : '-left-64'
			}`}
		>
			<div className="flex h-screen flex-col bg-white  w-64 px-4 py-8 border-r min-h-screen relative">
				<button
					onClick={closeSidebar}
					className="absolute top-1 right-1  text-gray-600 w-8 h-8 rounded-full flex items-center justify-center active:bg-gray-300 focus:outline-none ml-6 hover:bg-gray-200 hover:text-gray-800"
				>
					<HiX className="w-5 h-5" />
				</button>
				<h2 className="text-3xl font-semibold text-gray-800">
					<span className="text-indigo-500 ml-1">Auto-UI GENERATOR</span>
				</h2>
				<div className="relative mt-6">
					<label
						className="absolute inset-y-0 left-0 pl-3 flex items-center "
						htmlFor="searchP"
					>
						<HiOutlineSearch className="w-5 h-5 text-gray-400 hover:text-gray-500" />
					</label>
					<input
						id="searchP"
						type="text"
						placeholder="Search"
						className="w-full border border-gray-300 hover:border-gray-400 pl-10 py-3 pr-4 text-gray-700 rounded-md focus:outline-none focus:ring focus:border-blue-500"
					/>
				</div>
				
				<div className="flex flex-col mt-6  justify-between flex-1">
					<div className="text">
						{tasks.map((task, index) => {
							return (
								 <ReactCompo key={task.id}   coordinates={null} task={task} index={index} />
							);
						})}
						
					</div>
					
				</div>
			</div>
		</div>
	);
};

export default Sidebar;
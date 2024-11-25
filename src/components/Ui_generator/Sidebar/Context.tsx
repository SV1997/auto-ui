import React, { useState, useContext, createContext, ReactNode } from 'react';

interface AppContextType {
  isSidebarOpen: boolean;
  openSidebar: () => void;
  closeSidebar: () => void;
}

// Initialize the context with default values and typings
const AppContext = createContext<AppContextType>({
  isSidebarOpen: true,
  openSidebar: () => {},
  closeSidebar: () => {}
});

interface AppProviderProps {
  children: ReactNode;
}

const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
	const [isSidebarOpen, setIsSidebarOpen] = useState(true);

	const openSidebar = () => {
		setIsSidebarOpen(true);
	};

	const closeSidebar = () => {
		console.log('close');
		
		setIsSidebarOpen(false);
	};

	return (
		<AppContext.Provider value={{ isSidebarOpen, openSidebar, closeSidebar }}>
			{children}
		</AppContext.Provider>
	);
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };

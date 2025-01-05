import { createSlice } from "@reduxjs/toolkit";
import { Task } from "../components/Ui_generator/Sidebar/data";
interface elementState {
    initialElements: { elements: Task[] };
}

const initialState: elementState = {
    initialElements: { elements: [] },
}

const elementsSlice = createSlice({
    name: "coordinates",
    initialState,
    reducers: {
        setInitialElements:(state, action: { payload: Task })=>{
            state.initialElements.elements.push(action.payload)
        },
        updateInitialElements:(state, action: { payload: Task })=>{
        const id=action.payload.tid || null;
        state.initialElements.elements=state.initialElements.elements.map((coord)=>{
            if(coord.tid===id){
                return {...coord, ...action.payload}
            }
            return coord;
        }
    )
    },
    firstelement:(state, action: { payload: Task[] })=>{
        state.initialElements.elements= action.payload
    },
    cleanArray:(state)=>{
        state.initialElements.elements=[];
    }
}})

export const {setInitialElements, updateInitialElements, cleanArray, firstelement}= elementsSlice.actions;
export default elementsSlice.reducer
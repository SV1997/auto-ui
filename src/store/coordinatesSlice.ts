import { createSlice } from "@reduxjs/toolkit";

interface CoordinatesState {
    initialCoordinaes: { coordinates: any[] };
}

const initialState: CoordinatesState = {
    initialCoordinaes: { coordinates: [] },
}

const coordinatesSlice = createSlice({
    name: "coordinates",
    initialState,
    reducers: {
        setInitialCoordinates:(state, action: { payload: {} })=>{
            state.initialCoordinaes.coordinates.push(action.payload)
        },
        updateInitialCoordinates:(state, action: { payload: { id: number, exported:boolean, column: string } })=>{
        const id=action.payload.id || null;
        state.initialCoordinaes.coordinates=state.initialCoordinaes.coordinates.map((coord)=>{
            if(coord.id===id){
                return {...coord, ...action.payload}
            }
            return coord;
        }
    )
    }
}})

export const {setInitialCoordinates, updateInitialCoordinates}= coordinatesSlice.actions;
export default coordinatesSlice.reducer
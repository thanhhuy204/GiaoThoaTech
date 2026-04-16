import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

interface TaskState {
  tasks: string[]
  status: 'idle' | 'loading' | 'failed'
}

const initialState: TaskState = {
  tasks: [],
  status: 'idle',
}

const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<string>) => {
      state.tasks.push(action.payload)
    },
  },
})

export const { addTask } = taskSlice.actions

export const selectTask = (state: { task: TaskState }) => state.task

export const taskReducer = taskSlice.reducer


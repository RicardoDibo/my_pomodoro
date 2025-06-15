import React, { useEffect, useReducer, useRef } from "react";
import { initialTaskState } from "./initialTaskState";
import { TaskContext } from "./TaskContext";
import { taskReducer } from "./taskReducer";
import { TimerWorkerManager } from "../../workers/timerWorkerManager";
import { loadBeep } from "../../utils/loadBeep";
import type { TaskStateModel } from "../../models/TaskStateModel";

export type TaskContextProviderProps = {
  children: React.ReactNode;
};

export function TaskContextProvider({ children }: TaskContextProviderProps) {
  const [state, dispatch] = useReducer(taskReducer, initialTaskState, () => {
    const storedState = localStorage.getItem('state');
    
    if (storedState === null) return initialTaskState;

    const parsedStorageState = JSON.parse(storedState) as TaskStateModel;

    return {
      ...parsedStorageState,
      activeTask: null,
      secondsRemaining: 0,
      formattedSecondsRemaining: '00:00',
    };
  });
  const playBeepRef = useRef<ReturnType<typeof loadBeep> | null>(null);
  const worker = TimerWorkerManager.getInstance();
  
  worker.onmessage(event => {
    const { countDownSeconds } = event.data;
    console.log(event.data);

    if(playBeepRef.current) {
      playBeepRef.current();
      console.log('Beep played');
      playBeepRef.current = null;
    }

    if(countDownSeconds <= 0) {
      dispatch({ type: 'COMPLETE_TASK' });
      worker.terminate();
    } else {
      dispatch({
        type: 'COUNT_DOWN',
        payload: { secondsRemaining: countDownSeconds },
      });
    }
  });

  useEffect(() => {
    localStorage.setItem('state', JSON.stringify(state));
    console.log(state);

    if(!state.activeTask) {
      console.log('No active task, terminating worker');
      worker.terminate();
    }

    document.title = `${state.formattedSecondsRemaining} - My Pomodoro`;
    
    worker.postMessage(state);
  }, [worker, state]);

  useEffect(() => {
    if(state.activeTask && playBeepRef.current === null) {
      playBeepRef.current = loadBeep();
    } else {
      console.log('No active task, clearing beep reference');
      playBeepRef.current = null;
    }
  }, [state.activeTask]);

  return (
    <TaskContext.Provider value={{ state, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
}
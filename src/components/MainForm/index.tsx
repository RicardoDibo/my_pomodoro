import { PlayCircleIcon, StopCircleIcon } from "lucide-react";
import { DefaultButton } from "../DefaultButton";
import { DefaultInput } from "../DefaultInput";
import { Cycles } from "../Cycles";
import { useRef } from "react";
import type { TaskModel } from "../../models/TaskModel";
import { useTaskContext } from "../../contexts/TaskContext/useTaskContext";
import { getNextCycle } from "../../utils/getNextCycle";
import { getNextCycleType } from "../../utils/getNextCycleType";
import { Tips } from "../Tips";

export function MainForm() {
  const { state, dispatch } = useTaskContext();
  const numberNameInput = useRef<HTMLInputElement>(null);

  const nextCycle = getNextCycle(state.currentCycle);
  const nextCycleType = getNextCycleType(nextCycle);

  const handleCrateNewTask = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!numberNameInput.current) return; // Ensure the ref is not null

    const taskName = numberNameInput.current.value.trim();
    if (!taskName) {
      alert('Please enter a task name');
      return;
    }

    const newTask: TaskModel = {
      id: Date.now().toString(),
      name: taskName,
      startDate: Date.now(),
      completedDate: null,
      interruptDate: null,
      duration: state.config[nextCycleType],
      type: nextCycleType,
    };

    dispatch({
      type: 'START_TASK',
      payload: newTask,
    });
  };

  function handleInterruptTask() {
    dispatch({type: 'INTERRUPT_TASK'});
  }

  return (
    <form onSubmit={handleCrateNewTask} className='form' action=''>
      <div className='formRow'>
        <DefaultInput 
          id='myInput' 
          type='text' 
          labelText='Task'
          placeholder='Type your task here'
          ref={numberNameInput}
          disabled={!!state.activeTask}
        />
      </div>
          
      <div className='formRow'>
        <Tips />
      </div>
      
      {state.currentCycle > 0 && (
        <div className='formRow'>
          <Cycles />
        </div>
      )}
      
      <div className='formRow'>
        {!state.activeTask ? (
          <DefaultButton 
            icon={<PlayCircleIcon />} 
            aria-label="Start task"
            title="Start task"
            type="submit"
            key="start-task-button"
          />
        ) : (
          <DefaultButton 
            icon={<StopCircleIcon />} 
            aria-label="Stop task"
            title="Stop task"
            color="red"
            type="button"
            onClick={handleInterruptTask}
            key="stop-task-button"
          />
        )}
      </div>
    </form>
  );
}
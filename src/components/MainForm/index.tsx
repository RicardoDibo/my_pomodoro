import { PlayCircleIcon, StopCircleIcon } from "lucide-react";
import { DefaultButton } from "../DefaultButton";
import { DefaultInput } from "../DefaultInput";
import { Cycles } from "../Cycles";
import { useRef } from "react";
import type { TaskModel } from "../../models/TaskModel";
import { useTaskContext } from "../../contexts/TaskContext/useTaskContext";
import { getNextCycle } from "../../utils/getNextCycle";
import { getNextCycleType } from "../../utils/getNextCycleType";
import { formatSecondsToMinutes } from "../../utils/formatSecondsToMinutes";

export function MainForm() {
  const { state, setState } = useTaskContext();
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

    const secondsRemaining = newTask.duration * 60;

    setState((prevState) => {
      return {
        ...prevState,
        activeTask: newTask,
        currentCycle: nextCycle,
        secondsRemaining, // check
        formattedSecondsRemaining: formatSecondsToMinutes(secondsRemaining),
        tasks: [...prevState.tasks, newTask],
      };  
    });
    
    console.log('New task created:', taskName);
  };

  function handleInterruptTask() {
    setState((prevState) => {
      return {
        ...prevState,
        activeTask: null,
        secondsRemaining: 0, // check
        formattedSecondsRemaining: '00:00',
        tasks: prevState.tasks.map(
          task => {
            if (prevState.activeTask?.id === task.id) {
              return { ...task, interruptDate: Date.now()}
            }
            return task;
          }
        ),
      };  
    });
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
        <p>
          Next cycle: 25min
        </p>
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
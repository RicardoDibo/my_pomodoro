import { useTaskContext } from "../../contexts/TaskContext/useTaskContext";
import { getNextCycle } from "../../utils/getNextCycle";
import { getNextCycleType } from "../../utils/getNextCycleType";

export function Tips() {
  const { state } = useTaskContext();
  const nextCycle = getNextCycle(state.currentCycle);
  const nextCycleType = getNextCycleType(nextCycle);

  const tipsForWhenActiveTask = {
    workTime: <span>Stay focused for {state.config.workTime} min</span>,
    shortBreakTime: <span>Stay focused for {state.config.workTime} min</span>,
    longBreakTime: <span>Take a long break</span>,
  }

  const tipsForNoActiveTask = {
    workTime: <span>Next cycle is a {state.config.workTime} min</span>,
    shortBreakTime: <span>Next cycle is a {state.config.workTime} min</span>,
    longBreakTime: <span>Take a long {state.config.workTime} min break</span>,
  }

  return (
    <>
      {!!state.activeTask && tipsForWhenActiveTask[state.activeTask.type] /*True*/} 
      {!state.activeTask && tipsForNoActiveTask[nextCycleType] /*False*/}
    </>
  )
}
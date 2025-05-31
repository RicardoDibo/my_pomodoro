import { useTaskContext } from '../../contexts/TaskContext/useTaskContext';
import { getNextCycle } from '../../utils/getNextCycle';
import { getNextCycleType } from '../../utils/getNextCycleType';
import styles from './styles.module.css'

export function Cycles() {
  const { state } = useTaskContext();

  const cycleStep = Array.from({ length: state.currentCycle });

  const cicleDescriptionMap = {
    workTime: 'Work',
    shortBreakTime: 'Short Break',
    longBreakTime: 'Long Break',
  }

  return (
    <div className={styles.cycles}>
        <span>Cycles:</span>
        <div className={styles.cycleDots}>
            {
              cycleStep.map((_, index) => {
                const nextCycle = getNextCycle(index);
                const nextCycleType = getNextCycleType(nextCycle);
                return (
                  <span 
                    className={`${styles.cycleDot} ${styles[nextCycleType]}`}
                    aria-label={`${cicleDescriptionMap[nextCycleType]} cycle indicator`}
                    title={`${cicleDescriptionMap[nextCycleType]} cycle indicator`}
                    key={`${nextCycleType}_${nextCycle}_${index}`}
                  ></span>
                );
              })
            }
        </div>
    </div>
  );
}

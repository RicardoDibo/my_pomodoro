import type { TaskModel } from "../../models/TaskModel"

export type TaskActionTypes =
  | 'START_TASK'
  | 'INTERRUPT_TASK'
  | 'RESET_STATE'
  | 'COUNT_DOWN'
  | 'COMPLETE_TASK'
  ;
  
export type TaskActionsWithPayload = {
  type: 'START_TASK';
  payload: TaskModel;
} | {
  type: 'COUNT_DOWN';
  payload: { secondsRemaining: number };
};

export type TaskActionsWithoutPayload = {
  type: 'RESET_STATE';
} | {
  type: 'INTERRUPT_TASK';
} | {
  type: 'COMPLETE_TASK';
};

export type TaskActionModel =
  | TaskActionsWithPayload
  | TaskActionsWithoutPayload;
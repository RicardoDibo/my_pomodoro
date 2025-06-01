import type { TaskModel } from "../../models/TaskModel"

export type TaskActionTypes =
  | 'START_TASK'
  | 'INTERRUPT_TASK'
  | 'RESET_STATE';
  
export type TaskActionsWithPayload ={
  type: 'START_TASK';
  payload: TaskModel;
}
  

export type TaskActionsWithoutPayload = {
  type: 'RESET_STATE';
} | {
  type: 'INTERRUPT_TASK';
};

export type TaskActionModel =
  | TaskActionsWithPayload
  | TaskActionsWithoutPayload;
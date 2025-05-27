import { PlayCircleIcon } from "lucide-react";
import { DefaultButton } from "../DefaultButton";
import { DefaultInput } from "../DefaultInput";
import { Cycles } from "../Cycles";
import type { HomeProps } from "../../pages/Home";

export function MainForm({ state } : HomeProps) {
  return (
    <form className='form' action=''>
      <div className='formRow'>
        <DefaultInput 
          id='myInput' 
          type='text' 
          labelText='Task'
          placeholder='Type your task here'
        />
      </div>
          
      <div className='formRow'>
        <p>
          Next cycle: {state.config.workTime}min
        </p>
      </div>
          
      <div className='formRow'>
        <Cycles />
      </div>
      
      <div className='formRow'>
        <DefaultButton icon={<PlayCircleIcon />} />
      </div>
    </form>
  );
}
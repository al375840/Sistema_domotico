import { Toggable } from "./toggable";
import { WithState } from "./withState";


export interface Device extends WithState,Toggable {
  id?: string;
  type: string;
}
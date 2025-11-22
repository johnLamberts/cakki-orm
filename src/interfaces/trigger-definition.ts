import { TTriggerEvent } from "../types/trigger-event.type";
import { TTriggerTiming } from "../types/trigger-time.type";

export interface ITriggerDefinition {
  name: string;
  timing: TTriggerTiming;
  event: TTriggerEvent;
  table: string;
  statement: string;
}

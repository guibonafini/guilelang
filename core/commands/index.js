import { Command } from "./Command.js";
import { Software } from "./Software.js";
import { FunctionCall } from "./FunctionCall.js";
import { If } from "./If.js";
import { FunctionDefinition } from "./FunctionDefinition.js";
import { While } from "./While.js";
import { Operator } from "./Operator.js";
import { Comparison } from "./Comparison.js";
import { LogicalGate } from "./LogicalGate.js";
import { PrimitiveNumber } from "./PrimitiveNumber.js";
import { PrimitiveString } from "./PrimitiveString.js";
import { Variable } from "./Variable.js";
import { Assign } from "./Assign.js";
import { Closure } from "./Closure.js";
import { Break } from "./Break.js";
import { Return } from "./Return.js";

Command.register('software', Software);
Command.register('function_call', FunctionCall);
Command.register('fn', FunctionDefinition);
Command.register('while', While);
Command.register('if', If);
Command.register('operator', Operator);
Command.register('comparison', Comparison);
Command.register('logical_gate', LogicalGate);
Command.register('number', PrimitiveNumber);
Command.register('string', PrimitiveString);
Command.register('variable', Variable);
Command.register('assign', Assign);
Command.register('closure', Closure);
Command.register('break', Break);
Command.register('return', Return);

export { Software }
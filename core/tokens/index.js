import { Assign } from "../commands/Assign.js";
import { Break } from "../commands/Break.js";
import { Closure } from "../commands/Closure.js";
import { Comparison } from "../commands/Comparison.js";
import { If } from "../commands/If.js";
import { FunctionDefinition } from "../commands/FunctionDefinition.js";
import { PrimitiveNumber } from "../commands/PrimitiveNumber.js";
import { PrimitiveString } from "../commands/PrimitiveString.js";
import { FunctionCall } from "../commands/FunctionCall.js";
import { Operator } from "../commands/Operator.js";
import { While } from "../commands/While.js";
import { LogicalGate } from "../commands/LogicalGate.js";
import { Variable } from "../commands/Variable.js";
import { Return } from "../commands/Return.js";

//To ignore
import { CommentLine } from "./CommentLine.js";
import { EndClosure } from "./EndClosure.js";
import { EndCommand } from "./EndCommand.js";
import { EndIf } from "./EndIf.js";
import { EndFn } from "./EndFn.js";
import { EndWhile } from "./EndWhile.js";


export default {
    tokens: [
        CommentLine,
        Return,
        FunctionDefinition,
        EndFn,
        If,
        EndIf,
        While,
        EndWhile,
        Closure,
        EndClosure,
        FunctionCall,
        EndCommand,
        PrimitiveString,
        PrimitiveNumber,
        Assign,
        Operator,
        Comparison,
        LogicalGate,
        Break,
        Variable
    ]
}
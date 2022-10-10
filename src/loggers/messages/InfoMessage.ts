import {LogMessageInterface} from "../interfaces/LogMessageInterface";
import {LogType} from "../enums/LogType";
import {LogMessageType} from "../enums/LogMessageType";
import {AbstractLogMessage} from "../abstracts/AbstractLogMessage";

export class InfoMessage extends AbstractLogMessage implements LogMessageInterface {
	constructor(
		messageType: LogMessageType,
		message: string,
		object?: any|undefined,
	) {
		super(LogType.Info, messageType, message, object);
	}
}

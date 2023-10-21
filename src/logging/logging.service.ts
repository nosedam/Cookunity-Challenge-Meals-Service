import { Injectable, Logger } from '@nestjs/common';
import { RequestService } from 'src/request/request.service';

@Injectable()
export class LoggingService {

    private logger: Logger = new Logger("HTTP")

    constructor(private requestService: RequestService) {}

    public log(obj: Record<string, any>) {

        obj["traceId"] = this.requestService.getTraceId()
        if (!obj.level) {
            obj["level"] = "info"
        }

        this.logger.log(JSON.stringify(obj))
    }

    public info(message: string) {
        this.log({"message": message, "level": "info"})
    }

}

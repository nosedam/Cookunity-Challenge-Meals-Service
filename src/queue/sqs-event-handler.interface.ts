export interface SqsEventHandler {
    process(event: any): Promise<void>
}
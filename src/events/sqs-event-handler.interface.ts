export interface SqsEventHandler {
    process(data: any): Promise<void>
}
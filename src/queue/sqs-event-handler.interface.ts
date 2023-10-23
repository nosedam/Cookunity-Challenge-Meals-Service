export interface SqsEventHandler {
    process(event: any): void
}
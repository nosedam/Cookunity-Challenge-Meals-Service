import { plainToInstance } from "class-transformer"

export class SqsMessageDto {

    Type: string
    MessageId: string
    TopicArn: string
    Message: string
    Timestamp: string
    SignatureVersion: string
    Signature: string
    SigningCertURL: string
    UnsubscribeURL: string

  }
  
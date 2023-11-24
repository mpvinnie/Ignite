import { Entity } from '@/core/entities/entity'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

export interface AttachmentProps {
  shipmentId: UniqueEntityId
  title: string
  url: string
}

export class Attachment extends Entity<AttachmentProps> {
  static create(props: AttachmentProps, id?: UniqueEntityId) {
    const attachment = new Attachment(props, id)

    return attachment
  }

  get shipmentId() {
    return this.props.shipmentId
  }

  get title() {
    return this.props.title
  }

  get url() {
    return this.props.url
  }
}

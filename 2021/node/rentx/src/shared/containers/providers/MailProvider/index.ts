import { container } from 'tsyringe'

import EtherealMailProvider from './implementations/EtherealMailProvider'
import IMailProvider from './models/IMailProvider'

const providers = {
  ethereal: new EtherealMailProvider()
}

container.registerInstance<IMailProvider>('MailProvider', providers.ethereal)

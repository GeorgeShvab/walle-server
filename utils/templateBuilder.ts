import nunjucks from 'nunjucks'
import dotenv from 'dotenv'

dotenv.config()

const CLIENT_ADDRESS = process.env.CLIENT_ADDRESS

if (!CLIENT_ADDRESS) throw new Error('No client address')

nunjucks.configure('templates', { autoescape: true })

const templeteBuilder = (name: string, args?: Object) => {
  return nunjucks.render(name, { ...args, homeAddress: CLIENT_ADDRESS })
}

export default templeteBuilder

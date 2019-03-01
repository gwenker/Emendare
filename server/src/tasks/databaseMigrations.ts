import { Text, User } from '../models'
import { IText, IUser } from '../../../interfaces'

export const databaseMigrations = async () => {
  // Remove old rules text properties
  const texts: IText[] = await Text.model.find()
  texts.forEach(async text => {
    if (typeof text.rules !== 'undefined') {
      delete text.rules
      await text.save()
    }
  })

  // Remove old activationToken if already activated user
  const users: IUser[] = await User.model.find()
  users.forEach(async user => {
    if (user.activated && user.activationToken) {
      user.activationToken = null
      await user.save()
    }
  })
}
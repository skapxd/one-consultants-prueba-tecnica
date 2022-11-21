import { CustomSettings } from '#/customSettings'
import { IAcademic } from '#/src/globalState/academicSlice'
import { IUser } from '#/src/globalState/userSlice'

export interface IPostSaveDataService {
  user: IUser
  academic: IAcademic
}

export const postSaveDataService = async (props: IPostSaveDataService) => {
  const { academic, user } = props

  if (!academic) throw new Error('"academic" param is required')
  if (Object.values(academic).length !== 4) throw new Error(`Missing academic props: ${JSON.stringify(academic, null, 2)}`)

  if (!user) throw new Error('"user" param is required')
  if (Object.values(user).length !== 3) throw new Error(`Missing "user" props: ${JSON.stringify(user, null, 2)}`)

  const config = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ academic, user })
  }

  const url = CustomSettings.getUrlBaseServer('/students')

  const resp = await fetch(url, config)
  const json = await resp.json()
  if (resp.status >= 400) throw new Error(JSON.stringify(json.message, null, 2))
  return json
}

'use server'
//server side logic functions 

//include neon db which is postgress actually
import { db } from '@/db'
import { CaseColor, CaseFinish, CaseMaterial, PhoneModel } from '@prisma/client'


export type SaveConfigArgs = {
  color: CaseColor
  finish: CaseFinish
  material: CaseMaterial
  model: PhoneModel
  configId: string
}

//this function is repsonsible for saving your phone case prepared by the user , 
export async function saveConfig({
  color,
  finish,
  material,
  model,
  configId,
}: SaveConfigArgs) {
  await db.configuration.update({
    where: { id: configId },
    data: { color, finish, material, model },
  })
}
import { createUploadthing, type FileRouter } from 'uploadthing/next'
import { z } from 'zod'
import sharp from 'sharp'
// import { db } from '@/db'

const f = createUploadthing()

export const ourFileRouter = {

  //this will run when the user has entered the image, 
  imageUploader: f({ image: { maxFileSize: '4MB' } })
    .input(z.object({ configId: z.string().optional() }))
    //Taking in input then passing it with async function
    .middleware(async ({ input }) => {
      return { input }
    })
    .onUploadComplete(async ({ metadata, file }) => {
      const { configId } = metadata.input

      const res = await fetch(file.url)
      const buffer = await res.arrayBuffer()

      const imgMetadata = await sharp(buffer).metadata()
      const { width, height } = imgMetadata

      if (!configId) {
        const configuration = 2

        return { configId}
      } else {
        const updatedConfiguration = 1

        return { configId }
      }
    }),
} satisfies FileRouter

export type OurFileRouter = typeof ourFileRouter
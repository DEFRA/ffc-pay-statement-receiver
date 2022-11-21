const { DefaultAzureCredential } = require('@azure/identity')
const { BlobServiceClient } = require('@azure/storage-blob')
const config = require('./config').storageConfig
let blobServiceClient

if (config.useConnectionStr) {
  console.log('Using connection string for BlobServiceClient')
  blobServiceClient = BlobServiceClient.fromConnectionString(config.connectionStr)
} else {
  console.log('Using DefaultAzureCredential for BlobServiceClient')
  const uri = `https://${config.storageAccount}.blob.core.windows.net`
  blobServiceClient = new BlobServiceClient(uri, new DefaultAzureCredential())
}

const container = blobServiceClient.getContainerClient(config.container)


const getFileStream = async (filename) => {
  const client = container.getBlockBlobClient(`${config.folder}/${filename}`)
  console.log(client)


  try {
    return await client.download(0)
  } catch (err) {
    console.log(err)
    throw new Error('File does not exist ' +  filename)
  }
}

module.exports = {
  getFileStream
}

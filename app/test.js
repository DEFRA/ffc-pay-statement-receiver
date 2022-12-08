const { BlobServiceClient } = require('@azure/storage-blob')

const test = async () => {
  const blobClient = BlobServiceClient.fromConnectionString('bluh')
  const container = blobClient.getContainerClient('container')
  const client = container.getBlockBlobClient('folder/filename')
  return await client.download()
}

module.exports = test

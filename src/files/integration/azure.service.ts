import { Injectable, OnModuleInit } from '@nestjs/common';

import { BlobServiceClient, ContainerClient } from '@azure/storage-blob';

@Injectable()
export class AzureBlobService implements OnModuleInit {
  private containerClient: ContainerClient;
  private blobServiceClient: BlobServiceClient;
  private containerName = 'image';

  constructor() {}

  async onModuleInit() {
    try {
      const AZURE_STORAGE_STRING = process.env.AZURE_STORAGE_STRING;

      if (!AZURE_STORAGE_STRING) {
        throw Error('Azure Storage Connection string not found');
      }

      const blobServiceClient =
        BlobServiceClient.fromConnectionString(AZURE_STORAGE_STRING);

      this.blobServiceClient = blobServiceClient;

      this.containerClient = blobServiceClient.getContainerClient(
        this.containerName,
      );

      const exists = await this.containerClient.exists();

      if (!exists) {
        const createContainerResponse = await this.containerClient.create();

        console.log(
          `Container From Azure Blob created successfully: ${createContainerResponse.requestId}`,
        );
      } else {
        console.log('Container From Azure Blob already exists.');
      }

      // this.containerClient.setAccessPolicy('container');
    } catch (err) {
      console.error(`Error: ${err.message}`);
    }
  }

  async uploadBlobToContainer(blobName: string, content: Buffer | string) {
    try {
      if (!this.containerClient) {
        throw new Error('Container client is not initialized');
      }

      const blockBlobClient = this.containerClient.getBlockBlobClient(blobName);

      const uploadBlobResponse = await blockBlobClient.upload(
        content,
        Buffer.byteLength(content),
      );

      return uploadBlobResponse;
    } catch (err) {
      console.error(`Error uploading blob: ${err.message}`);
    }
  }

  async getFileUrl(blobName: string): Promise<string> {
    try {
      if (!this.containerClient) {
        throw new Error('Container client is not initialized');
      }

      const blobClient = this.containerClient.getBlobClient(blobName);
      return blobClient.url;
    } catch (err) {
      console.error(`Error uploading blob: ${err.message}`);
    }
  }

  async deleteBlob(blobName: string): Promise<void> {
    try {
      const containerClient = this.blobServiceClient.getContainerClient(
        this.containerName,
      );
      const blobClient = containerClient.getBlobClient(blobName);

      const deleteResponse = await blobClient.delete();
      console.log(
        `Deleted blob ${blobName} successfully`,
        deleteResponse.requestId,
      );
    } catch (error) {
      console.error(`Error deleting blob ${blobName}:`, error.message);
      throw error;
    }
  }
}

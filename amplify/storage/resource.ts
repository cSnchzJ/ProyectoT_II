import { defineStorage } from '@aws-amplify/backend';

export const storage = defineStorage({
  name: 'archivosStorage',
  access: (allow) => ({
    "archivos/*": [allow.authenticated.to(["read", "write", "delete"])],
  })
});
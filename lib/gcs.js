import { Storage } from '@google-cloud/storage';

const bucketName = process.env.GCS_BUCKET || 'orenses-sites';
const storage = new Storage();

const bucket = storage.bucket(bucketName);

export async function listTemplates() {
  const [files] = await bucket.getFiles({ prefix: 'templates/' });
  const templateKeys = new Set();
  for (const file of files) {
    const parts = file.name.split('/');
    if (parts.length > 1 && parts[0] === 'templates' && parts[1]) {
      templateKeys.add(parts[1]);
    }
  }
  return Array.from(templateKeys);
}

export async function readFile(path) {
  const file = bucket.file(path);
  const [exists] = await file.exists();
  if (!exists) {
    return null;
  }
  const [contents] = await file.download();
  return contents.toString('utf-8');
}

export async function writeFile(path, contents, contentType = 'text/plain') {
  const file = bucket.file(path);
  await file.save(contents, {
    contentType,
    resumable: false,
    public: false,
    metadata: {
      cacheControl: 'no-cache'
    }
  });
}

export async function copyPrefix(sourcePrefix, destinationPrefix) {
  const [files] = await bucket.getFiles({ prefix: sourcePrefix });
  await Promise.all(
    files.map(async (file) => {
      const destinationName = file.name.replace(sourcePrefix, destinationPrefix);
      await file.copy(bucket.file(destinationName));
    })
  );
}

export async function movePrefix(sourcePrefix, destinationPrefix) {
  const [files] = await bucket.getFiles({ prefix: sourcePrefix });
  await Promise.all(
    files.map(async (file) => {
      const destinationName = file.name.replace(sourcePrefix, destinationPrefix);
      await file.copy(bucket.file(destinationName));
    })
  );
  await Promise.all(files.map((file) => file.delete()));
}

import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
export const uploadPropertyImage = async (blob: Blob, userUid: string) => {
  const fileRef = ref(getStorage(), `property/${userUid}/${Date.now()}`);
  const result = await uploadBytes(fileRef, blob);
  // @ts-ignore
  blob.close();

  return await getDownloadURL(fileRef);
};

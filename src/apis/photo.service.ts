import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';

/**
 * Documentation source:
 * https://capacitorjs.com/docs/apis/camera?_gl=1*12j1dot*_ga*MjY4Nzk3Mzk3LjE2MzE3ODQyMDg.*_ga_REH9TJF6KF*MTY2OTYyMzI4My4zNC4wLjE2Njk2MjMyODMuMC4wLjA.
 * image.webPath will contain a path that can be set as an image src.
 * You can access the original file using image.path, which can be passed to the Filesystem API to read
 * the raw data of the image, if desired (or pass resultType: CameraResultType.Base64 to getPhoto)
 */
export const takePicture = async (): Promise<Photo> =>
  await Camera.getPhoto({
    resultType: CameraResultType.Uri,
    source: CameraSource.Camera,
    quality: 100,
  });

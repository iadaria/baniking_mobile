import { Dispatch, SetStateAction } from 'react';
import ImagePicker, { Options } from 'react-native-image-crop-picker';

export const imageOptions: Options = {
  width: 400,
  height: 400,
  //width: 1024,
  //height: 1024,
  compressImageMaxWidth: 1024,
  compressImageMaxHeight: 1024,
  avoidEmptySpaceAroundImage: true,
  cropping: true,
  cropperCircleOverlay: true,
  mediaType: 'photo',
};

interface IProps {
  setAvatarImage: Dispatch<SetStateAction<string>>;
}

export const takePhotoFromCamera = () => ImagePicker.openCamera(imageOptions);

export const choosePhotoFromLibrary = () => ImagePicker.openPicker(imageOptions);

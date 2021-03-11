import React, { useEffect, useState } from 'react';
import { ActivityIndicator, TextInput, Image, TouchableOpacity, ScrollView, ImageBackground } from 'react-native';
import { connect } from 'react-redux';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { AppText, Block } from '~/src/app/common/components/UI';
import { getBathes as getBathesAction } from '~/src/features/bathes/store/bathActions';
import { IRootState } from '~/src/app/store/rootReducer';
import { IBath } from '~/src/app/models/bath';
import { FilterIcon, ListIcon, SearchIcon, bathOneImg, KolosIcon } from '~/src/assets';
import { styles } from './styles';
import { colors, sizes } from '~/src/app/common/constants';
import { Stars } from '~/src/app/common/components/Stars';
import ImageResizer, { Response } from 'react-native-image-resizer';
import { getRandomBathImage } from '../../../../app/utils/bathUtility';
import LinearGradient from 'react-native-linear-gradient';

interface IProps {
  loading: boolean;
  bathes: IBath[] | null;
  getBathes: () => void;
}

export function BathesScreenContainer({ loading, bathes, getBathes }: IProps) {
  const image = '../../../../assets/images/png/testCard.jpg';
  const [newImg, setNewImg] = useState<Response>();
  const backImage = getRandomBathImage();

  /* useEffect(() => {
    if (getBathes && getBathes.length < 8) {
      getBathes();
    }
  }, [getBathes]); */

  // useEffect(() => {
  //   const resolve = Image.resolveAssetSource(testCardImg);
  //   // const width = Dimensions.get('screen').width - wp(sizes.offset.base) * 2;
  //   const width = windowWidth - wp(sizes.offset.base) * 2;
  //   console.log(resolve);
  //   ImageResizer.createResizedImage(resolve.uri, width, width, 'PNG', 100)
  //     .then((response: Response) => {
  //       console.log('[BathesScreen/resize/done] response', response);
  //       setNewImg(response);
  //     })
  //     .catch((error) => console.log('[BathesScreen/resize error]', error));
  //   /* Image.getSize(testCardImg, (width: number, height: number) => {
  //     console.log('[BathesScreen/useEffect', width, height);
  //   }); */
  // }, []);

  if (loading) {
    return (
      <Block full center middle>
        <ActivityIndicator size="small" color={colors.secondary} />
      </Block>
    );
  }
  // rating
  const testRating = 4.1;

  return (
    <ScrollView>
      <Block full base>
        <AppText margin={[0, 0, 2]} h1>
          Каталог бань
        </AppText>
        <Block center row>
          <Block style={styles.searchWrapper} center row>
            <TextInput style={styles.searchInput} placeholder="Что вы ищите?" />
            <TouchableOpacity style={styles.searchIconButton} onPress={() => console.log('search')}>
              <SearchIcon style={styles.searchIcon} />
            </TouchableOpacity>
          </Block>
          <TouchableOpacity style={styles.filter} onPress={() => console.log('filter open')}>
            <FilterIcon />
          </TouchableOpacity>
        </Block>
        <Block style={styles.sort} center row>
          <AppText>Сортировать</AppText>
          <ListIcon />
        </Block>
        {/* Card */}
        <ImageBackground style={styles.backgroundImage} imageStyle={styles.imageStyle} source={bathOneImg}>
          <LinearGradient
            colors={[colors.primary, 'transparent']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.gradient}>
            <Block>
              <KolosIcon style={{ position: 'absolute', left: -wp(5.5), top: wp(1.2) }} />
              <AppText trajan header transform="uppercase" height={27}>
                Nordik spa & Lounge
              </AppText>
            </Block>
            <AppText secondary tag>
              Нордская баня с лаунтджем
            </AppText>
            <Stars rating={testRating} />
            <AppText lightUltra tag color={colors.bath.address}>
              Mосква ул Византийская, д,5
              <AppText medium secondary>
                {'   3 км'}
              </AppText>
            </AppText>
            <AppText style={styles.phone}>8 900 123 45 68</AppText>
          </LinearGradient>
        </ImageBackground>

        {/* <Image source={testCardImg} />
        {newImg && (
          <Image style={{ height: newImg?.height, width: newImg?.width }} source={{ uri: newImg?.uri }} />
        )} */}
        {/* {bathes?.map(({ name }: Partial<IBath>, index: number) => {
          return (
            <Block key={`key-`} margin={[5, 0]} card>
              <AppText trajan header transform="uppercase" height={6}>
                {name}
              </AppText>
            </Block>
          );
        })} */}
      </Block>
    </ScrollView>
  );
}

const BathesScreenConnected = connect(
  ({ bath }: IRootState) => ({
    loading: bath.loading,
    bathes: bath.bathes,
  }),
  {
    getBathes: getBathesAction,
  },
)(BathesScreenContainer);

export { BathesScreenConnected as BathesScreen };

import React, { useEffect } from 'react';
import { ActivityIndicator, Image, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { AppText, Block, Divider, AppProgress } from '~/src/app/common/components/UI';
import { colors, sizes } from '~/src/app/common/constants';
import { getCabinetData as getCabinetDataAction } from '~/src/features/profiles/store/profileActions';
import { IRootState } from '~/src/app/store/rootReducer';
import { ICabinet } from '~/src/app/models/profile';
import { AuthLogoLeft, AuthLogoRight, ColumnIcon } from '~/src/assets';
import { USER_IMAGE_PATH } from '~/src/app/common/constants/common';
import { styles } from './styles';

interface IProps {
  loading: boolean;
  cabinetData: ICabinet;
  getCabinetData: () => void;
}

function CabinetContainer({ loading, cabinetData, getCabinetData }: IProps) {
  const { full_name, level, points, meetings_count, avatar, levels } = cabinetData || {};

  useEffect(() => {
    getCabinetData();
  }, [getCabinetData]);

  if (loading) {
    return (
      <Block full center middle>
        <ActivityIndicator size="small" color={colors.secondary} />
      </Block>
    );
  }

  return (
    <Block full base>
      <AppText h1>Личный кабинет</AppText>
      {/* Name & Avatar block */}
      <Block flex={0.8} /* margin={[7, 0, 12]}  */ middle>
        <Block margin={[0, 0, 2]} style={styles.avatarBorder}>
          <Image style={styles.avatar} source={{ uri: USER_IMAGE_PATH }} />
        </Block>
        <AppText center trajan size={sizes.profile.name} color={colors.profile.name}>
          {full_name}
        </AppText>
        <Block margin={[1, 0]} row middle center>
          <AuthLogoLeft />
          <AppText style={{ marginHorizontal: 15 }} h2 trajan transform="uppercase">
            Магистр
          </AppText>
          <AuthLogoRight />
        </Block>
      </Block>
      {/* Progress step  block */}
      <Divider />
      <Block middle>
        <AppText center>Статус</AppText>
        <Block margin={[3, 0]}>
          <AppProgress completed={33.33} />
        </Block>
      </Block>
      {/* Metting header block */}
      <Block margin={[7, 0, 0]} row middle>
        <TouchableOpacity
          onPress={() => {
            console.log('naviation to 10 mettings');
          }}>
          <AppText center light secondary>
            {'еще 10 собраний '}
          </AppText>
        </TouchableOpacity>
        <AppText center light>
          до следующего уровня
        </AppText>
      </Block>
      {/* Column block */}
      <Block flex={0.2} margin={[0, 0, 1]} center bottom>
        <ColumnIcon />
      </Block>
    </Block>
  );
}

const CabinetConnected = connect(
  ({ profile }: IRootState) => ({
    loading: profile.loading,
    cabinetData: profile.currentUserCabinet,
  }),
  {
    getCabinetData: getCabinetDataAction,
  },
)(CabinetContainer);

export { CabinetConnected as CabinetScreen };

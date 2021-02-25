import React from 'react';
import { AppText, Block } from '~/src/app/common/components/UI';
import { AppButton } from '~/src/app/common/components/UI/AppButton';
import { sizes } from '~/src/app/common/constants';
import { Sex } from '~/src/app/models/profile';
import { FemaleIcon, MaleIcon } from '~/src/assets';
import { styles } from './styles';

interface IProps {
  sex: Sex;
  setSex: (sex: Sex) => void;
}

export function SexSwitch({ sex, setSex }: IProps) {
  return (
    <Block margin={[0.6, 0, 1]} row>
      <AppButton style={[styles.sex, sex !== Sex.Male && styles.sexPassive]} onPress={() => setSex(Sex.Male)}>
        <MaleIcon />
        <Block margin={[0, sizes.offset.between]} />
        <AppText bold center>
          Мужское
        </AppText>
      </AppButton>
      <Block margin={[0, sizes.offset.between / 2]} />
      <AppButton style={[styles.sex, sex !== Sex.Female && styles.sexPassive]} onPress={() => setSex(Sex.Female)}>
        <FemaleIcon />
        <Block margin={[0, sizes.offset.between]} />
        <AppText bold center>
          Женское
        </AppText>
      </AppButton>
    </Block>
  );
}

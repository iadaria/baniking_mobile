import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { AppInput, AppText, Block } from '~/src/app/common/components/UI';
import { sizes } from '~/src/app/common/constants';
import { colors } from '~/src/app/common/constants/colors';

export function BaseSettingsScreen() {
  return (
    <Block full base debug>
      <Block margin={[0, 0, 2]}>
        <AppText h1>Основные настройки</AppText>
      </Block>
      {/* Form */}

      <AppText style={styles.label} semibold>
        Фамилия
      </AppText>
      <AppInput
        style={styles.input}
        id="surname"
        placeholder="Введите Фамилию"
        maxLength={50}
        defaultValue="Петренко"
      />

      <AppText style={styles.label} semibold>
        Имя
      </AppText>
      <AppInput style={styles.input} id="name" placeholder="Введите Имя" maxLength={50} defaultValue="Александр" />

      <AppText style={styles.label} semibold>
        Отчество
      </AppText>
      <AppInput style={styles.input} id="middle_name" placeholder="Введите Отчество" maxLength={50} />

      <AppText style={styles.label} semibold>
        Дата рождения
      </AppText>
      <AppInput
        style={styles.input}
        id="birth_date"
        placeholder="ДД/ММ/ГГГГ"
        maxLength={50}
        number
        mask="[00]{.}[00]{.}[9900]"
      />

      <AppText style={styles.label} semibold>
        Пол
      </AppText>
      <AppInput style={styles.input} id="sex" placeholder="Введите Пол" maxLength={50} />

      <AppText style={styles.label} semibold>
        Мобильный телефон
      </AppText>
      <AppInput style={styles.input} id="surname" placeholder="Введите Мобильный телефон" maxLength={50} />

      <AppText style={styles.label} semibold>
        Email
      </AppText>
      <AppInput style={styles.input} id="surname" placeholder="Введите Email" maxLength={50} />

      <AppText style={styles.label} semibold>
        Аватарка
      </AppText>
      <AppInput style={styles.input} id="surname" placeholder="Введите Фамилию" maxLength={50} />
    </Block>
  );
}

const styles = StyleSheet.create({
  label: {
    textAlign: 'left',
    fontSize: wp(sizes.text.label),
  },
  input: {
    borderColor: colors.input.borderEdit,
    height: hp(sizes.input.heightEdit),
    color: colors.text.base,
    fontSize: wp(sizes.input.text),
  },
});

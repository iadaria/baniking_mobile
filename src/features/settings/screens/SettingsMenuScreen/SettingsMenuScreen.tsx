import React from 'react';
import { ParamListBase } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Header } from '~/src/app/common/components/Header';
import { AppText, Block, Divider } from '~/src/app/common/components/UI';
import { MenuItem } from '~/src/assets';
import { routes } from '~/src/navigation/helpers/routes';

interface IProps {
  navigation: StackNavigationProp<ParamListBase>;
}

export function SettingsMenuScreen({ navigation }: IProps) {
  return (
    <Block full base>
      <Header />
      <AppText h1>Настройки</AppText>
      {/* Menu items */}

      <Block margin={[3, 0]}>
        <TouchableOpacity
          style={styles.item}
          onPress={() => navigation.navigate(routes.settingsTab.ProfileScreen)}>
          <AppText>Основные настройки</AppText>
          <MenuItem />
        </TouchableOpacity>

        <Divider height={1} />

        <TouchableOpacity
          style={styles.item}
          onPress={() => navigation.navigate(routes.settingsTab.SafeScreen)}>
          <AppText>Безопасность</AppText>
          <MenuItem />
        </TouchableOpacity>

        <Divider height={1} />

        <TouchableOpacity
          style={styles.item}
          onPress={() =>
            navigation.navigate(routes.settingsTab.NotificationsScreen)
          }>
          <AppText>Уведомления</AppText>
          <MenuItem />
        </TouchableOpacity>

        <Divider height={1} />

        <TouchableOpacity
          style={styles.item}
          onPress={() => navigation.navigate(routes.settingsTab.RulesScreen)}>
          <AppText>Правило приложения</AppText>
          <MenuItem />
        </TouchableOpacity>

        <Divider height={1} />

        <TouchableOpacity
          style={styles.item}
          onPress={() =>
            navigation.navigate(routes.settingsTab.ContractScreen)
          }>
          <AppText>Пользовательское соглашение</AppText>
          <MenuItem />
        </TouchableOpacity>

        <Divider height={1} />

        <TouchableOpacity
          style={styles.item}
          onPress={() => navigation.navigate(routes.settingsTab.HelpScreen)}>
          <AppText>Помощь</AppText>
          <MenuItem />
        </TouchableOpacity>

        <Divider height={1} />
      </Block>
    </Block>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

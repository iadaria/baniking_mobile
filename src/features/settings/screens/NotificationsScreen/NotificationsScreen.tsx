import React from 'react';
import { StyleSheet } from 'react-native';
import { AppText, Block, Divider, AppSwitch } from '~/src/app/common/components/UI';
import { AppPermission, PERMISSION_TYPE } from '~/src/app/common/components/AppPersmission';

export function NotificationsScreen() {
  async function handleNotifyPermission() {
    console.log('[NotificationsScreen/handleNotificationsPermission]');
    await AppPermission.requestNotifyPermission();
  }

  return (
    <Block full base>
      <AppText h1>Уведомления</AppText>

      <Block margin={[3, 0]}>
        <Block style={styles.item} center>
          <AppText>Новостная рассылка (Email)</AppText>
          <AppSwitch />
        </Block>

        <Divider style={styles.divider} height={1.5} />

        <Block style={styles.item} center>
          <AppText>Приглашения на собрания (Push)</AppText>
          <AppSwitch onPress={async () => await handleNotifyPermission()} />
        </Block>

        <Divider style={styles.divider} height={1.5} />

        <Block style={styles.item} center>
          <AppText>Приглашения на собрания (Email) </AppText>
          <AppSwitch />
        </Block>

        <Divider style={styles.divider} height={1.5} />

        <Block style={styles.item} center>
          <AppText>Изменение статуса (Push) </AppText>
          <AppSwitch />
        </Block>

        <Divider style={styles.divider} height={1.5} />

        <Block style={styles.item} center>
          <AppText>Участие в собраниях (Push) </AppText>
          <AppSwitch />
        </Block>

        <Divider style={styles.divider} height={1.5} />

        <Block style={styles.item} center>
          <AppText>Участие в собраниях (Email) </AppText>
          <AppSwitch />
        </Block>

        <Divider style={styles.divider} height={1.5} />

        <Block style={styles.item} center>
          <AppText>Новостная рассылка (Email) </AppText>
          <AppSwitch />
        </Block>

        <Divider style={styles.divider} height={1.5} />
      </Block>
    </Block>
  );
}

const styles = StyleSheet.create({
  divider: {
    marginVertical: 10,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

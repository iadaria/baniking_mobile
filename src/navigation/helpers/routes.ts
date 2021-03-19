export default {
  navigators: {
    DrawerNavigator: 'DrawerNavigator',
    AuthNavigator: 'AuthNavigator',
  },
  drawerNavigator: {
    ProfileTab: 'ProfileTab',
    BathesTab: 'BathesTab',
    MeetingsTab: 'MeetingsTab',
    ReceiptsTab: 'ReceiptsTab',
    SettingsTab: 'SettingsTab',
    QrTab: 'QrTab',
  },
  authNavigator: {
    LoginScreen: 'LoginScreen',
    RegisterScreen: 'RegisterScreen',
    ResetPasswordScreen: 'ResetPasswordScreen',
  },
  profileTab: {
    // ProfileScreen: 'ProfileScreen',
    CabinetScreen: 'CabinetScreen',
  },
  bathesTab: {
    BathesScreen: 'BathesScreen',
    BathScreen: 'BathScreen',
  },
  settingsTab: {
    // BaseSettingsScreen: 'BaseSettingsScreen',
    ProfileScreen: 'ProfileScreen',
    SafeScreen: 'SafeScreen',
    NotificationsScreen: 'NotificationsScreen',
    RulesScreen: 'RulesScreen',
    ContractScreen: 'ContractScreen',
    HelpScreen: 'HelpScreen',
  },
  qrTab: {
    QrScreen: 'QrScreen',
  },
};

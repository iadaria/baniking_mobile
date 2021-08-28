export const routes = {
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
    VerifyScreen: 'VerifyScreen',
    RegisterCompleteScreen: 'RegisterCompleteScreen',
  },
  profileTab: {
    // ProfileScreen: 'ProfileScreen',
    CabinetScreen: 'CabinetScreen',
  },
  bathesTab: {
    Bathes: 'BathesScreen',
    BathesFilter: 'BathesFilterScreen',
    Bath: 'BathScreen',
    DestinationMap: 'DestinationMap',
    BathesPhotos: 'BathesPhotosScreen',
    OrderCall: 'OrderCallScreen',
    SelectCity: 'SelectCityScreen',
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

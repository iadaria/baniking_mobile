import { ISocialAccount } from '../models/user';
import { SocialProvider } from '~/src/app/models/user';

export function refreshAccounts(
  accounts: ISocialAccount[] | undefined,
  newAccount: ISocialAccount,
): ISocialAccount[] | undefined {
  const deletedProviderAccounts = accounts?.filter(
    (account: ISocialAccount) => account.provider !== newAccount.provider,
  );
  deletedProviderAccounts?.push(newAccount);

  return deletedProviderAccounts;
}

export const isGoogle = (provider: SocialProvider) => provider === SocialProvider.Google;
export const isVK = (provider: SocialProvider) => provider === SocialProvider.VK;
export const isYandex = (provider: SocialProvider) => provider === SocialProvider.Yandex;
export const isFacebook = (provider: SocialProvider) => provider === SocialProvider.Facebook;

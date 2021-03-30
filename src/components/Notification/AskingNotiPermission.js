import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';

const AskingNotificationPermissonToken = async () => {
  let token;
  const { status: existingStatus } = await Permissions.getAsync(
    Permissions.NOTIFICATIONS,
  );
  let finalStatus = existingStatus;
  if (existingStatus !== 'granted') {
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    finalStatus = status;
  }
  if (finalStatus !== 'granted') {
    console.log("Échec de l'obtention du jeton push pour la notification push!");
    return (token = '');
  }
  token = (await Notifications.getExpoPushTokenAsync()).data;
  return token;
};

export default AskingNotificationPermissonToken;

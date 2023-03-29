import { CssBaseline } from '@mui/material';
import { Playground } from '@/components/playground/playground';
import PubNub from 'pubnub';
import { PubNubProvider } from 'pubnub-react';

const pubnub = new PubNub({
  publishKey: import.meta.env.VITE_PUBLISH_KEY,
  subscribeKey: import.meta.env.VITE_SUBSCRIBE_KEY,
  userId: import.meta.env.VITE_USER_ID,
});

export default function App() {
  return (
    <PubNubProvider client={pubnub}>
      <CssBaseline />
      <Playground />
    </PubNubProvider>
  );
}

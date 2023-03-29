import { useState, useEffect } from 'react';
import { getRandomId } from '@/utills/getRandomId';
import { MessageEvent } from 'pubnub';
import { Box, Button, Fade } from '@mui/material';
import { usePubNub } from 'pubnub-react';
import { UseGetGameStatusReturnType, useGetGameStatus } from '@/components/playground/hooks/useGetGameStatus';
import { StyledContainer, StyledLoader, StyledParagraph } from '@/components/playground/styled-components';
import { MatrixType, PlayOption, MessageDataType, Message } from '@/types';
import { Grid } from '@/components/grid/grid';
import { UseGetDefaultPlayerReturnType, useGetDefaultPlayer } from './hooks/useGetDefaultPlayer';

const id: string = getRandomId();
const DEFAULT_CHANNEL = 'default-channel';

const getInitialMatrix = (): MatrixType[][] => [...new Array(3)].map(() => [null, null, null]);

export const Playground = () => {
  const pubnub = usePubNub();
  const [matrixData, setMatrixData] = useState<MatrixType[][]>(getInitialMatrix());
  const [isDisabled, setIsDisabled] = useState<boolean>(false);

  const { isEnded, winPlayer, winCombination, reset }: UseGetGameStatusReturnType = useGetGameStatus(matrixData);
  const { isLoading, playerVariant, setPlayerVariant }: UseGetDefaultPlayerReturnType = useGetDefaultPlayer();

  useEffect(() => {
    if (!playerVariant) return;
    pubnub.subscribe({ channels: [DEFAULT_CHANNEL] });
    sendMessage(Message.JOIN);
  }, [playerVariant]);

  useEffect(() => {
    pubnub.addListener(handleMessage);
    return () => {
      pubnub.removeListener(handleMessage);
    };
  }, [matrixData, playerVariant]);

  const onSelect = (updatedData: MessageDataType) => {
    const newData: MessageDataType = { ...updatedData, value: playerVariant as PlayOption };
    sendMessage(Message.CHANGE, newData);
    updateData(newData);
    setIsDisabled(true);
  };

  const updateData = (updatedData: MessageDataType) => {
    const { row, column, value } = updatedData;
    const newData = [...matrixData];
    newData[row][column] = value as PlayOption;
    setMatrixData(newData);
  };

  const handleMessage = {
    message: (event: MessageEvent) => {
      if (event.message.data.id === id) return;
      switch (event.message.type) {
        case Message.CHANGE:
          if (event.message.data.id !== id) {
            setIsDisabled(false);
          }
          updateData(event.message.data);
          break;
        case Message.JOIN:
          sendMessage(Message.INITIALIZE, { selectedVariant: playerVariant } as MessageDataType);
          break;
        case Message.INITIALIZE:
          setIsDisabled(true);
          setPlayerVariant(event.message.data.selectedVariant === PlayOption.O ? PlayOption.X : PlayOption.O);
          break;
        case Message.RESET:
          reset();
          setIsDisabled(true);
          setMatrixData(getInitialMatrix());
          break;
      }
    },
  };

  const sendMessage = async (type: Message, message?: MessageDataType) => {
    try {
      await pubnub.publish({ channel: DEFAULT_CHANNEL, message: { type, data: { id, ...message } } });
    } catch (err: unknown) {
      console.error('Message sending failed!');
    }
  };

  const onResetGame = () => {
    setMatrixData(getInitialMatrix());
    reset();
    setIsDisabled(false);
    sendMessage(Message.RESET);
  };

  const getResultMessage = () => {
    if (!isEnded) return null;
    if (winPlayer) {
      return winPlayer === playerVariant ? 'You won!' : 'You lost!';
    }
  };

  if (isLoading) return <StyledLoader>Loading...</StyledLoader>;

  return (
    <Fade in={true}>
      <StyledContainer maxWidth="sm">
        <Box>
          {isEnded && <h1>Game over, {getResultMessage()}</h1>}
          <StyledParagraph>
            You are player <strong>{playerVariant}</strong>
          </StyledParagraph>
        </Box>
        <Box>
          <Grid
            matrixData={matrixData}
            winCombination={winCombination}
            isDisabled={isDisabled || isEnded}
            onSelect={onSelect}
          />
          {isEnded && (
            <Button sx={{ marginTop: 2 }} variant="contained" onClick={onResetGame}>
              New game
            </Button>
          )}
        </Box>
      </StyledContainer>
    </Fade>
  );
};

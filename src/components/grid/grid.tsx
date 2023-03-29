import { StyledButton } from '@/components/grid/styled-components';
import { Box, Grid as GridComponent } from '@mui/material';
import { CombinationType, MatrixType, MessageDataType, PlayOption } from '@/types';

type GridProps = {
  matrixData: MatrixType[][];
  isDisabled: boolean;
  winCombination: CombinationType[] | undefined;
  onSelect(updatedData: Partial<MessageDataType>): void;
};

type GridItemProps = {
  row: number;
  column: number;
  isSelected: boolean;
  isDisabled: boolean;
  value: PlayOption | null;
  onSelect(updatedData: Partial<MessageDataType>): void;
};

const GridItem = ({ row, column, value, isSelected, isDisabled, onSelect }: GridItemProps) => {
  return (
    <GridComponent item xs={4}>
      <StyledButton
        sx={{ height: 50, width: 50 }}
        variant={isSelected ? 'contained' : 'outlined'}
        disabled={isDisabled || !!value}
        onClick={() => onSelect({ row, column })}
      >
        {!!value && value.toString()}
      </StyledButton>
    </GridComponent>
  );
};

export const Grid = ({ matrixData, winCombination, isDisabled, onSelect }: GridProps) => {
  return (
    <Box sx={{ width: 230 }}>
      <GridComponent container spacing={2}>
        {matrixData.map((item, row) => (
          <GridComponent container item spacing={2} key={row}>
            {item.map((value, column) => {
              const isSelected = !!winCombination?.find((combo) => combo.row === row && combo.col === column);
              return (
                <GridItem
                  key={`${row}-${column}`}
                  row={row}
                  column={column}
                  value={value}
                  isSelected={isSelected}
                  isDisabled={isDisabled}
                  onSelect={onSelect}
                />
              );
            })}
          </GridComponent>
        ))}
      </GridComponent>
    </Box>
  );
};

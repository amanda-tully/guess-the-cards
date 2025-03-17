import { Modal } from "./Modal";
import styled from "styled-components";
import { Button } from "../Button.tsx";

interface ResetLeaderboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const ModalContent = styled.div`
  text-align: center;
`;

const Message = styled.p`
  margin-bottom: ${({ theme }) => theme.spacing.l};
  font-size: ${({ theme }) => theme.fontSizes.s};
  color: ${({ theme }) => theme.colors.text};
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.m};
  margin-top: ${({ theme }) => theme.spacing.l};
`;

export const ResetLeaderboardModal = ({
  isOpen,
  onClose,
  onConfirm,
}: ResetLeaderboardModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Reset Leaderboard">
      <ModalContent>
        <Message>
          Are you sure you want to reset the leaderboard? This action cannot be
          undone and all scores will be permanently deleted.
        </Message>

        <ButtonContainer>
          <Button buttonType="text" onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={() => {
              onConfirm();
              onClose();
            }}
          >
            Reset
          </Button>
        </ButtonContainer>
      </ModalContent>
    </Modal>
  );
};

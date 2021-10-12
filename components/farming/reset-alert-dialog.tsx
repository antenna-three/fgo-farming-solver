import {
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  Button,
} from '@chakra-ui/react'
import React, { useRef } from 'react'

export const ResetAlertDialog = ({
  isOpen,
  onClose,
  onReset,
}: {
  isOpen: boolean
  onClose: () => void
  onReset: () => void
}) => {
  const cancelRef = useRef(null)
  return (
    <AlertDialog
      isOpen={isOpen}
      onClose={onClose}
      leastDestructiveRef={cancelRef}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader>入力内容のリセット</AlertDialogHeader>
          <AlertDialogBody>
            本当にリセットしますか？「入力内容のエクスポート」を使えば入力内容をブックマークに保存することができます。
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              キャンセル
            </Button>
            <Button
              colorScheme="red"
              onClick={() => {
                onReset()
                onClose()
              }}
            >
              リセット
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  )
}

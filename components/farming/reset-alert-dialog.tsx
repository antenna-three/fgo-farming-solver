import {
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  Button,
  HStack,
  Text,
} from '@chakra-ui/react'
import React, { useRef } from 'react'
import { useTranslation } from 'react-i18next'

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
  const { t } = useTranslation('farming')
  return (
    <AlertDialog
      isOpen={isOpen}
      onClose={onClose}
      leastDestructiveRef={cancelRef}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader>{t('reset-form-values')}</AlertDialogHeader>
          <AlertDialogBody>
            <Text>{t('do-you-reset')}</Text>
            <Text>{t('you-can-use-export')}</Text>
          </AlertDialogBody>
          <AlertDialogFooter>
            <HStack>
              <Button ref={cancelRef} onClick={onClose}>
                {t('キャンセル')}
              </Button>
              <Button
                colorScheme="red"
                onClick={() => {
                  onReset()
                  onClose()
                }}
              >
                {t('リセット')}
              </Button>
            </HStack>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  )
}

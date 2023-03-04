// This component renders a confirmation dialog to delete an item.
import {
  Button,
  AlertDialog,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogBody,
  AlertDialogHeader,
  AlertDialogOverlay,
} from "@chakra-ui/react";
import { useDispatch } from "react-redux";

const ConfirmRemovalAlert = ({ isOpen, onClose, cancelRef, itemToDelete, deleteAction }) => {
  // Get the dispatch function to dispatch the delete action
  const dispatch = useDispatch();

  // Function to delete the item and close the dialog.
  const onDeleteItem = () => {
    dispatch(deleteAction(itemToDelete._id));
    onClose();
  };

  return (
    // Render the confirmation dialog with the passed props.
    <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize='lg' fontWeight='bold'>
            {/* Render the name of the item to be deleted in the header. */}
            Delete {itemToDelete.name}
          </AlertDialogHeader>

          {/* Render a warning message to confirm the action. */}
          <AlertDialogBody>Are you sure? You can't undo this action afterwards. </AlertDialogBody>
          <AlertDialogFooter>
            {/* Render a cancel button to close the dialog. */}
            <Button ref={cancelRef} onClick={onClose}>
              Cancel
            </Button>

            {/* Render a delete button to delete the item and close the dialog. */}
            <Button colorScheme='red' onClick={onDeleteItem} ml={3}>
              {/* Render the name of the item to be deleted in the button label. */}
              Delete {itemToDelete.name}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export default ConfirmRemovalAlert;

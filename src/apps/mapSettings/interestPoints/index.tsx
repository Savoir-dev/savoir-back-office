import { useState } from "react";
import { Box, Dialog, Flex } from "@radix-ui/themes";

import { InterestPointList } from "./interestPointList";
import { CreateInterestPointModal } from "./createInterestPointModal";
import { Button } from "../../../components/atoms/button";

export const InterestPointsApp = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const onOpenDialog = () => setIsDialogOpen(true);
  const onCloseDialog = () => setIsDialogOpen(false);

  return (
    <Dialog.Root open={isDialogOpen}>
      <Flex direction="column" gap="2">
        <Box>
          <Button color="orange" onClick={onOpenDialog}>
            Create an interest point
          </Button>
        </Box>
        <InterestPointList />
        <CreateInterestPointModal close={onCloseDialog} />
      </Flex>
    </Dialog.Root>
  );
};
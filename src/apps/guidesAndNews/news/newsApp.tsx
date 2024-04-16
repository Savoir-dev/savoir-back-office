import { Button, Dialog } from "@radix-ui/themes";
import { useState } from "react";
import { CreateNewsModal } from "./createNewsModal";
import { NewsList } from "./newsList";

export const NewsApp = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const onCloseModal = () => {
    setIsDialogOpen(false);
  };
  return (
    <Dialog.Root open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <Dialog.Trigger>
        <Button color="orange">Create news</Button>
      </Dialog.Trigger>
      <NewsList />
      {isDialogOpen && <CreateNewsModal close={onCloseModal} />}
    </Dialog.Root>
  );
};
